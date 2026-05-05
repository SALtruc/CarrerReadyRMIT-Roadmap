import { renderTopBar } from "../components/TopBar.js";
import { renderRoadmapStage } from "../components/RoadmapStage.js";

const roadmapVideoPath = "src/assets/2880H.gif";
const desktopPromptImagePath = "./src/assets/question_char/transition_3.png";


export function renderRoadmapScreen(state) {
  const content = state.showRoadmapCheck
    ? `
      <div class="roadmap-complete" aria-live="polite">
        <div class="roadmap-complete__badge" aria-label="Roadmap completed">
          <svg class="roadmap-complete__check" viewBox="0 0 120 96" aria-hidden="true" focusable="false">
            <path d="M18 50L47 79L102 22" />
          </svg>
        </div>
      </div>
    `
    : `
      <div class="roadmap-journey">
        <div class="roadmap-video-shell">
          <img
            class="roadmap-video"
            src="${roadmapVideoPath}"
            aria-label="Career roadmap loading animation"
          ></img>
          <p class="roadmap-journey__note">It's never too late to start your Career Roadmap!</p>
        </div>
        <div class="roadmap-desktop-journey" aria-hidden="true">
          <aside class="roadmap-desktop-card">
            <div class="roadmap-desktop-card__paper">
              <p>
                I feel <span>ready to<br>start working!</span>
              </p>
              <img
                class="roadmap-desktop-card__image"
                src="${desktopPromptImagePath}"
                alt=""
                decoding="async"
                loading="eager"
                draggable="false"
              >
            </div>
          </aside>
          <div class="roadmap-desktop-path">
            <span class="roadmap-desktop-path__line"></span>
            ${renderRoadmapStage({ variant: "explore", number: "01", label: "Explore" })}
            ${renderRoadmapStage({ variant: "develop", number: "02", label: "Develop" })}
            ${renderRoadmapStage({ variant: "transition", number: "03", label: "Transition" })}
            <p class="roadmap-desktop-path__note">It's never too late to start your Career Roadmap!</p>
          </div>
        </div>
      </div>
    `;

  return `
    <section class="screen screen--roadmap grid-bg bg-transition ${state.showRoadmapCheck ? "is-complete" : ""}">
      ${renderTopBar(state, { showAvatar: true })}
      ${content}
    </section>
  `;
}
