import { renderCoach } from "../components/Coach.js";
import { renderStageInfoModal } from "../components/StageInfoModal.js";
import { renderTopBar } from "../components/TopBar.js";
import { getStageScore } from "../utils/selectors.js";

const summaryPromptAssetPath = "./src/assets/Portrait/Portrait-1.png";
const summarySkipAssetPath = "./src/assets/Portrait/Portrait-2.png";
const summaryPrimaryAssetPath = "./src/assets/Portrait/Portrait-3.png";
const summaryBoardAssetPath = "./src/assets/Portrait/Portrait-4.png";
const summaryClickAssetPath = "./src/assets/Portrait/Portrait-5.png";
const summaryExploreAssetPath = "./src/assets/Portrait/Portrait-6.png";
const summaryDevelopAssetPath = "./src/assets/Portrait/Portrait-7.png";
const summaryTransitionAssetPath = "./src/assets/Portrait/Portrait-8.png";

export function renderSummaryScreen(state) {
  const scores = {
    explore: getStageScore(state, "explore"),
    develop: getStageScore(state, "develop"),
    transition: getStageScore(state, "transition")
  };

  return `
    <section class="screen screen--summary grid-bg bg-transition">
      ${renderTopBar(state, { showAvatar: true })}
      <div class="summary-viewport">
        <div class="summary-shell">
          <button
            class="summary-board"
            type="button"
            data-summary-board="true"
            data-action="toggle-stage-info"
            aria-label="Open your career roadmap overview"
          >
            <img
              class="summary-board__base"
              data-asset-image="summary-board"
              src="${summaryBoardAssetPath}"
              alt=""
              decoding="async"
              loading="eager"
              draggable="false"
            >
            <img
              class="summary-board__click"
              data-asset-image="summary-click"
              src="${summaryClickAssetPath}"
              alt=""
              decoding="async"
              loading="eager"
              draggable="false"
              aria-hidden="true"
            >
            ${renderSummaryStageArt({
              className: "summary-stage-art--transition",
              label: "Transition",
              score: scores.transition,
              assetPath: summaryTransitionAssetPath
            })}
            ${renderSummaryStageArt({
              className: "summary-stage-art--explore",
              label: "Explore",
              score: scores.explore,
              assetPath: summaryExploreAssetPath
            })}
            ${renderSummaryStageArt({
              className: "summary-stage-art--develop",
              label: "Develop",
              score: scores.develop,
              assetPath: summaryDevelopAssetPath
            })}
          </button>
          <img
            class="summary-prompt-image"
            data-asset-image="summary-prompt"
            src="${summaryPromptAssetPath}"
            alt="Ready to build your own career roadmap?"
            decoding="async"
            loading="eager"
            draggable="false"
          >
          <div class="summary-bottom">
            <div class="summary-coach-wrap">
              ${renderCoach()}
            </div>
            <div class="summary-action-stack">
              <button
                class="summary-image-button summary-image-button--primary"
                type="button"
                data-action="open-student-unlock"
                aria-label="Of course, let's go"
              >
                <img
                  class="summary-image-button__art"
                  data-asset-image="summary-primary-cta"
                  src="${summaryPrimaryAssetPath}"
                  alt=""
                  decoding="async"
                  loading="eager"
                  draggable="false"
                >
              </button>
              <button
                class="summary-image-button summary-image-button--secondary"
                type="button"
                data-action="skip-student-unlock"
                aria-label="Ugh, no thanks"
              >
                <img
                  class="summary-image-button__art"
                  data-asset-image="summary-secondary-cta"
                  src="${summarySkipAssetPath}"
                  alt=""
                  decoding="async"
                  loading="eager"
                  draggable="false"
                >
              </button>
            </div>
          </div>
        </div>
      </div>
      ${state.showStageInfo ? renderStageInfoModal() : ""}
    </section>
  `;
}

function renderSummaryStageArt({ className, label, score, assetPath }) {
  return `
    <div class="summary-stage-art ${className}" role="img" aria-label="${label} ${score} percent">
      <img
        class="summary-stage-art__image"
        data-asset-image="${label.toLowerCase()}-summary-stage"
        src="${assetPath}"
        alt=""
        decoding="async"
        loading="eager"
        draggable="false"
      >
      <b class="summary-stage-art__score">${score}%</b>
    </div>
  `;
}
