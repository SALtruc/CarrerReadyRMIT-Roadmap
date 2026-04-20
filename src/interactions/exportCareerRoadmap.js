import {
  getRoadmapPosterConfig,
  getRoadmapScores,
  getRoadmapSelections
} from "../data/roadmap.js";

const ROADMAP_EXPORT_WIDTH = 1080;
const ROADMAP_MAX_CANVAS_DIMENSION = 8192;
const ROADMAP_MAX_CANVAS_AREA = 16777216;

export async function exportCareerRoadmap(state) {
  const isPremadeRoadmap = state.roadmapVariant === "premade";
  const posterConfig = getRoadmapPosterConfig(state.roadmapVariant);
  const backgroundAssetPath = posterConfig.assetPath;
  const canvas = document.createElement("canvas");
  const exportSize = getRoadmapExportSize(posterConfig.size);
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context unavailable");
  }

  canvas.width = exportSize.width;
  canvas.height = exportSize.height;

  const [backgroundImage, selectionImages] = await Promise.all([
    loadImage(backgroundAssetPath),
    isPremadeRoadmap
      ? Promise.resolve([])
      : Promise.all(
          getRoadmapSelections(state).map(async (selection) => ({
            selection,
            image: await loadImage(selection.assetPath),
            detailImage: selection.detailAssetPath
              ? await loadImage(selection.detailAssetPath)
              : null
          }))
        )
  ]);

  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => {});
  }

  context.save();
  context.scale(exportSize.scale, exportSize.scale);
  context.drawImage(
    backgroundImage,
    0,
    0,
    posterConfig.size.width,
    posterConfig.size.height
  );

  drawRoadmapScores(context, getRoadmapScores(state), posterConfig.stageScoreLayout);

  if (!isPremadeRoadmap) {
    drawRoadmapSelectionDetails(context, selectionImages, posterConfig);
    drawRoadmapSelections(context, selectionImages);
  }

  context.restore();

  const blob = await canvasToBlob(canvas);
  const filename = `${isPremadeRoadmap ? "career-roadmap-premade" : "career-roadmap"}-${new Date().toISOString().slice(0, 10)}.png`;
  await saveRoadmapBlob(blob, filename);
}

function getRoadmapExportSize(posterSize) {
  const targetScale = ROADMAP_EXPORT_WIDTH / posterSize.width;
  const dimensionScale = Math.min(
    ROADMAP_MAX_CANVAS_DIMENSION / posterSize.width,
    ROADMAP_MAX_CANVAS_DIMENSION / posterSize.height
  );
  const areaScale = Math.sqrt(
    ROADMAP_MAX_CANVAS_AREA / (posterSize.width * posterSize.height)
  );
  const safeScale = Math.min(targetScale, dimensionScale, areaScale);
  const scale = Number.isFinite(safeScale) && safeScale > 0 ? safeScale : targetScale;

  return {
    scale,
    width: Math.max(1, Math.round(posterSize.width * scale)),
    height: Math.max(1, Math.round(posterSize.height * scale))
  };
}

function drawRoadmapScores(context, scores, stageScoreLayout) {
  Object.entries(scores).forEach(([stage, score]) => {
    const layout = stageScoreLayout[stage];

    context.save();
    context.fillStyle = "#000000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `500 ${layout.fontSize}px "Museo", "Helvetica Neue", Arial, sans-serif`;
    context.fillText(`${score}%`, layout.x, layout.y);
    context.restore();
  });
}

function drawRoadmapSelections(context, selectionImages) {
  selectionImages.forEach(({ selection, image }) => {
    const { slot } = selection;
    const fitted = fitContain(
      image.naturalWidth || image.width,
      image.naturalHeight || image.height,
      slot.maxWidth,
      slot.maxHeight
    );
    const scale = slot.scale || 1;
    const drawWidth = fitted.width * scale;
    const drawHeight = fitted.height * scale;

    context.save();
    context.translate(slot.x, slot.y);
    context.rotate((slot.rotate * Math.PI) / 180);
    context.shadowColor = "rgba(0, 0, 0, 0.28)";
    context.shadowBlur = 0;
    context.shadowOffsetX = 22;
    context.shadowOffsetY = 26;
    context.drawImage(
      image,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );
    context.restore();
  });
}

function drawRoadmapSelectionDetails(context, selectionImages, posterConfig) {
  selectionImages.forEach(({ selection, detailImage }) => {
    if (!detailImage) {
      return;
    }

    const detailSlot = selection.detailSlot;
    const drawSize = Math.round(detailSlot.boxSize * detailSlot.scale);

    context.save();
    context.translate(detailSlot.x, detailSlot.y + detailSlot.shiftY);
    context.drawImage(
      detailImage,
      -drawSize / 2,
      -drawSize / 2,
      drawSize,
      drawSize
    );
    context.restore();
  });
}

function fitContain(sourceWidth, sourceHeight, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight);

  return {
    width: Math.round(sourceWidth * ratio),
    height: Math.round(sourceHeight * ratio)
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

function canvasToBlob(canvas) {
  if (typeof canvas.toBlob !== "function") {
    return Promise.resolve(dataUrlToBlob(canvas.toDataURL("image/png")));
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      try {
        resolve(dataUrlToBlob(canvas.toDataURL("image/png")));
      } catch (error) {
        reject(error instanceof Error ? error : new Error("Failed to export roadmap image"));
      }
    }, "image/png");
  });
}

function dataUrlToBlob(dataUrl) {
  const [meta, base64] = String(dataUrl).split(",", 2);

  if (!meta || !base64) {
    throw new Error("Failed to export roadmap image");
  }

  const mimeMatch = meta.match(/^data:(.*?);base64$/);
  const mimeType = mimeMatch?.[1] || "image/png";
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mimeType });
}

async function saveRoadmapBlob(blob, filename) {
  const file =
    typeof File === "function"
      ? new File([blob], filename, { type: blob.type || "image/png" })
      : null;

  if (
    file &&
    navigator.share &&
    (!navigator.canShare || navigator.canShare({ files: [file] }))
  ) {
    try {
      await navigator.share({
        files: [file],
        title: "Career Roadmap"
      });
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
    }
  }

  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  link.rel = "noopener";
  document.body.append(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1500);
}
