const loadedAssetPaths = new Set();
const failedAssetPaths = new Set();
const warmedAssetPaths = new Set();

export function getAssetStateClass(assetPath) {
  return loadedAssetPaths.has(assetPath) ? "has-asset" : "asset-missing";
}

export function markAssetLoaded(assetPath) {
  if (!assetPath) {
    return;
  }

  loadedAssetPaths.add(assetPath);
  failedAssetPaths.delete(assetPath);
}

export function markAssetFailed(assetPath) {
  if (!assetPath) {
    return;
  }

  failedAssetPaths.add(assetPath);
  loadedAssetPaths.delete(assetPath);
}

export function warmAssetSources(assetPaths) {
  assetPaths.forEach((assetPath) => {
    if (!assetPath || warmedAssetPaths.has(assetPath) || failedAssetPaths.has(assetPath)) {
      return;
    }

    warmedAssetPaths.add(assetPath);

    const image = new Image();

    image.addEventListener("load", () => {
      markAssetLoaded(assetPath);
    });

    image.addEventListener("error", () => {
      markAssetFailed(assetPath);
    });

    image.src = assetPath;

    if (image.complete) {
      if (image.naturalWidth > 0) {
        markAssetLoaded(assetPath);
      } else {
        markAssetFailed(assetPath);
      }
    }
  });
}
