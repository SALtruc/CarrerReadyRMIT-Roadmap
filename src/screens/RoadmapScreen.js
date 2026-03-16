import { renderRoadmapStage } from "../components/RoadmapStage.js";
import { renderTopBar } from "../components/TopBar.js";

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
        <div class="roadmap-journey__track" aria-hidden="true"></div>
        <div class="roadmap-journey__progress" aria-hidden="true"></div>
        ${renderRoadmapStage({ variant: "explore", number: "01", label: "Explore" })}
        ${renderRoadmapStage({ variant: "develop", number: "02", label: "Develop" })}
        ${renderRoadmapStage({ variant: "transition", number: "03", label: "Transition" })}
        <p class="roadmap-journey__note">It's never too late to start your Career Roadmap!</p>
      </div>
    `;

  return `
    <section class="screen screen--roadmap grid-bg bg-transition ${state.showRoadmapCheck ? "is-complete" : ""}">
      ${state.showRoadmapCheck ? "" : renderTopBar(state, { showAvatar: true })}
      ${content}
    </section>
  `;
}
