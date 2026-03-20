import { renderTopBar } from "../components/TopBar.js";
import {
  ROADMAP_BACKGROUND_ASSET_PATH,
  ROADMAP_BACKGROUND_SIZE,
  ROADMAP_FACEBOOK_LINKS,
  getRoadmapScores,
  getRoadmapSelections,
  roadmapStageScoreLayout
} from "../data/roadmap.js";

export function renderCareerRoadmapScreen(state) {
  const scores = getRoadmapScores(state);
  const selections = getRoadmapSelections(state);

  return `
    <section class="screen screen--career-roadmap grid-bg bg-transition" data-preserve-scroll="career-roadmap">
      ${renderTopBar(state, { showAvatar: true })}
      <div class="career-roadmap-shell">
        <div class="career-roadmap-poster" data-roadmap-poster="true">
          <img
            class="career-roadmap-poster__base"
            data-asset-image="career-roadmap-poster"
            src="${ROADMAP_BACKGROUND_ASSET_PATH}"
            alt="Career roadmap poster"
            decoding="async"
            loading="eager"
            draggable="false"
          >
          ${renderRoadmapScore("explore", scores.explore)}
          ${renderRoadmapScore("develop", scores.develop)}
          ${renderRoadmapScore("transition", scores.transition)}
          ${selections.map(renderRoadmapSelection).join("")}
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

function renderRoadmapScore(stage, score) {
  const layout = roadmapStageScoreLayout[stage];

  return `
    <div
      class="career-roadmap-score career-roadmap-score--${stage}"
      style="${formatRoadmapStyle({
        left: `${toPercent(layout.x, ROADMAP_BACKGROUND_SIZE.width)}%`,
        top: `${toPercent(layout.y, ROADMAP_BACKGROUND_SIZE.height)}%`,
        "--roadmap-score-font": `${toPercent(layout.fontSize, ROADMAP_BACKGROUND_SIZE.width)}cqw`
      })}"
      aria-label="${stage} score ${score} percent"
    >
      <span class="career-roadmap-score__value">${score}%</span>
    </div>
  `;
}

function renderRoadmapSelection(selection) {
  const { slot } = selection;
  const scale = slot.scale || 1;

  return `
    <div
      class="career-roadmap-selection career-roadmap-selection--${selection.stage}"
      style="${formatRoadmapStyle({
        left: `${toPercent(slot.x, ROADMAP_BACKGROUND_SIZE.width)}%`,
        top: `${toPercent(slot.y, ROADMAP_BACKGROUND_SIZE.height)}%`,
        width: `${toPercent(slot.maxWidth * scale, ROADMAP_BACKGROUND_SIZE.width)}%`,
        height: `${toPercent(slot.maxHeight * scale, ROADMAP_BACKGROUND_SIZE.height)}%`,
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
        loading="eager"
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
