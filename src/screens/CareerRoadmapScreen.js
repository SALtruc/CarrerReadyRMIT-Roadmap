import { renderTopBar } from "../components/TopBar.js";
import {
  ROADMAP_FACEBOOK_LINKS,
  getRoadmapPosterConfig,
  getRoadmapScores,
  getRoadmapSelections
} from "../data/roadmap.js";

export function renderCareerRoadmapScreen(state) {
  const isPremadeRoadmap = state.roadmapVariant === "premade";
  const posterConfig = getRoadmapPosterConfig(state.roadmapVariant);
  const posterAssetPath = posterConfig.assetPath;
  const scores = getRoadmapScores(state);
  const selections = isPremadeRoadmap ? [] : getRoadmapSelections(state);

  return `
    <section class="screen screen--career-roadmap grid-bg bg-transition" data-preserve-scroll="career-roadmap">
      ${renderTopBar(state, { showAvatar: true })}
      <div class="career-roadmap-toolbar" role="group" aria-label="Roadmap actions">
        <button
          class="career-roadmap-toolbar__button career-roadmap-toolbar__button--back"
          type="button"
          data-action="roadmap-back"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back</span>
        </button>
        <button
          class="career-roadmap-toolbar__button career-roadmap-toolbar__button--restart"
          type="button"
          data-action="restart-flow"
        >
          <span>Reset</span>
        </button>
      </div>
      <div class="career-roadmap-shell">
        <div class="career-roadmap-poster" data-roadmap-poster="true">
          <img
            class="career-roadmap-poster__base"
            data-asset-image="career-roadmap-poster"
            src="${posterAssetPath}"
            alt="${isPremadeRoadmap ? "Pre-made career roadmap poster" : "Career roadmap poster"}"
            decoding="async"
            loading="eager"
            draggable="false"
          >
          ${renderRoadmapScore("explore", scores.explore, posterConfig)}
          ${renderRoadmapScore("develop", scores.develop, posterConfig)}
          ${renderRoadmapScore("transition", scores.transition, posterConfig)}
          ${selections
            .map((selection) => renderRoadmapSelection(selection, posterConfig))
            .join("")}
          <button
            class="career-roadmap-download-hotspot"
            type="button"
            data-action="download-career-roadmap"
            aria-label="Download your roadmap as a PNG image"
          >
            <span class="sr-only">Download your roadmap</span>
          </button>
          <a
            class="career-roadmap-social-link career-roadmap-social-link--sgs"
            href="${ROADMAP_FACEBOOK_LINKS.sgs}"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open Career Ready SGS Facebook page"
          >
            <span class="sr-only">Career Ready SGS Facebook</span>
          </a>
          <a
            class="career-roadmap-social-link career-roadmap-social-link--hanoi"
            href="${ROADMAP_FACEBOOK_LINKS.hanoi}"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open Career Ready Hanoi Facebook page"
          >
            <span class="sr-only">Career Ready Hanoi Facebook</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

function renderRoadmapScore(stage, score, posterConfig) {
  const layout = posterConfig.stageScoreLayout[stage];
  const { width, height } = posterConfig.size;

  return `
    <div
      class="career-roadmap-score career-roadmap-score--${stage}"
      style="${formatRoadmapStyle({
        left: `${toPercent(layout.x, width)}%`,
        top: `${toPercent(layout.y, height)}%`,
        "--roadmap-score-font": `${toPercent(layout.fontSize, width)}cqw`
      })}"
      aria-label="${stage} score ${score} percent"
    >
      <span class="career-roadmap-score__value">${score}%</span>
    </div>
  `;
}

function renderRoadmapSelection(selection, posterConfig) {
  const { slot } = selection;
  const scale = slot.scale || 1;
  const { width, height } = posterConfig.size;
  const detailSlot = selection.detailAssetPath ? selection.detailSlot : null;

  return `
    ${detailSlot ? renderRoadmapSelectionDetail(selection, detailSlot, posterConfig) : ""}
    <div
      class="career-roadmap-selection career-roadmap-selection--${selection.stage}"
      style="${formatRoadmapStyle({
        left: `${toPercent(slot.x, width)}%`,
        top: `${toPercent(slot.y, height)}%`,
        width: `${toPercent(slot.maxWidth * scale, width)}%`,
        height: `${toPercent(slot.maxHeight * scale, height)}%`,
        "--roadmap-item-rotate": `${slot.rotate}deg`
      })}"
      aria-hidden="true"
    >
      <img
        class="career-roadmap-selection__image"
        data-asset-image="career-roadmap-${selection.activityId}"
        src="${selection.assetPath}"
        alt="${selection.title}"
        decoding="async"
        loading="lazy"
        draggable="false"
      >
    </div>
  `;
}

function renderRoadmapSelectionDetail(selection, detailSlot, posterConfig) {
  const { width, height } = posterConfig.size;

  return `
    <div
      class="career-roadmap-selection-detail career-roadmap-selection-detail--${detailSlot.direction || ""}"
      style="${formatRoadmapStyle({
        left: `${toPercent(detailSlot.x, width)}%`,
        top: `${toPercent(detailSlot.y, height)}%`,
        width: `${toPercent(detailSlot.boxSize, width)}%`,
        height: `${toPercent(detailSlot.boxSize, height)}%`,
        "--roadmap-detail-scale": detailSlot.scale,
        "--roadmap-detail-shift-y": `${detailSlot.shiftY}px`
      })}"
      aria-hidden="true"
    >
      <img
        class="career-roadmap-selection-detail__image"
        data-asset-image="career-roadmap-detail-${selection.activityId}"
        src="${selection.detailAssetPath}"
        alt=""
        decoding="async"
        loading="lazy"
        draggable="false"
      >
    </div>
  `;
}

function formatRoadmapStyle(styleMap) {
  return Object.entries(styleMap)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
}

function toPercent(value, total) {
  return ((value / total) * 100).toFixed(4);
}
