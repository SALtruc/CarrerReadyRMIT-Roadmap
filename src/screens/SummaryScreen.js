import { renderCoach } from "../components/Coach.js";
import { renderTopBar } from "../components/TopBar.js";
import { getStageScore } from "../utils/selectors.js";

const bubbleChatAssetPath = "./src/assets/Summary/Bubble Chat.png";
const stage1AssetPath = "./src/assets/Summary/stage1.png";
const stage2AssetPath = "./src/assets/Summary/stage2.png";
const stage3AssetPath = "./src/assets/Summary/stage3.png";
const ofCourseAssetPath = "./src/assets/Of course.png";

export function renderSummaryScreen(state) {
  const scores = {
    explore: getStageScore(state, "explore"),
    develop: getStageScore(state, "develop"),
    transition: getStageScore(state, "transition")
  };

  return `
    <section class="screen screen--summary grid-bg bg-transition">
      ${renderTopBar(state, { showAvatar: true })}

      <div class="summary-v2-layout">
        <div class="summary-v2-spine" aria-hidden="true"></div>

        <div class="summary-v2-cards" data-summary-board>
          <div class="summary-v2-card summary-v2-card--explore">
            <img
              class="summary-v2-card__bg"
              src="${stage1AssetPath}"
              alt="Stage 01 - Explore"
              decoding="async"
              loading="eager"
              draggable="false"
            >
            <b class="summary-v2-card__score summary-v2-card__score--explore">${scores.explore}%</b>
          </div>

          <div class="summary-v2-card summary-v2-card--develop">
            <img
              class="summary-v2-card__bg"
              src="${stage2AssetPath}"
              alt="Stage 02 - Develop"
              decoding="async"
              loading="eager"
              draggable="false"
            >
            <b class="summary-v2-card__score summary-v2-card__score--develop">${scores.develop}%</b>
          </div>

          <div class="summary-v2-card summary-v2-card--transition">
            <img
              class="summary-v2-card__bg"
              src="${stage3AssetPath}"
              alt="Stage 03 - Transition"
              decoding="async"
              loading="eager"
              draggable="false"
            >
            <b class="summary-v2-card__score summary-v2-card__score--transition">${scores.transition}%</b>
          </div>
        </div>

        <div class="summary-v2-bubble-wrap">
          <img
            class="summary-v2-bubble"
            src="${bubbleChatAssetPath}"
            alt="Great! Based on your quiz results, wanna explore activities that can help you improve your career readiness for each stage?"
            decoding="async"
            loading="eager"
            draggable="false"
          >
        </div>

        <div class="summary-v2-coach-wrap">
          ${renderCoach()}
        </div>

        <div class="summary-v2-actions">
          <button
            class="summary-v2-cta"
            type="button"
            data-action="start-custom-roadmap-flow"
            aria-label="Explore activities to improve your score"
          >
            <span class="sr-only">Of course, LET'S GO!</span>
            <img
              class="summary-v2-cta__art"
              src="${ofCourseAssetPath}"
              alt=""
              aria-hidden="true"
              decoding="async"
              loading="eager"
              draggable="false"
            >
          </button>

          <button
            class="summary-v2-skip ghost-btn"
            type="button"
            data-action="start-premade-roadmap-flow"
            aria-label="Skip activity selection and open the premade roadmap"
          >
            Ugh, no thanks..
          </button>
        </div>
      </div>
    </section>
  `;
}
