import { renderCoach } from "../components/Coach.js";
import { renderSegmentBar } from "../components/SegmentBar.js";
import { renderStageInfoModal } from "../components/StageInfoModal.js";
import { renderStageShape } from "../components/StageShape.js";
import { renderTopBar } from "../components/TopBar.js";
import { stageMeta } from "../data/stages.js";
import { getStageScore } from "../utils/selectors.js";

export function renderSummaryScreen(state) {
  return `
    <section class="screen screen--summary grid-bg bg-transition">
      ${renderTopBar(state, { showAvatar: true })}
      <div
        class="summary-panel"
        data-summary-board
        data-action="toggle-stage-info"
        role="button"
        tabindex="0"
        aria-label="Open stage overview"
      >
        <div class="summary-panel__header">
          ${renderSegmentBar(state)}
        </div>
        <button
          class="summary-panel__info icon-button"
          type="button"
          data-action="toggle-stage-info"
          aria-label="About the three stages"
        >
          i
        </button>
        <div class="summary-panel__click">
          <span>Click me!</span>
          <span class="summary-panel__arrow">↘</span>
        </div>
        <div class="summary-cluster" aria-hidden="true">
          ${renderStageShape({
            stageKey: "transition",
            meta: stageMeta.transition,
            score: getStageScore(state, "transition")
          })}
          ${renderStageShape({
            stageKey: "explore",
            meta: stageMeta.explore,
            score: getStageScore(state, "explore")
          })}
          ${renderStageShape({
            stageKey: "develop",
            meta: stageMeta.develop,
            score: getStageScore(state, "develop")
          })}
        </div>
      </div>
      <div class="summary-prompt-wrap">
        <div class="speech-strip summary-prompt">Ready to build your own career roadmap?</div>
      </div>
      <div class="summary-bottom">
        <div class="summary-coach-wrap">
          ${renderCoach()}
        </div>
        <div class="summary-action-stack">
          <button class="ribbon-btn summary-ribbon" data-action="open-stage-detail" data-stage="explore">Of course, LET'S GO!</button>
          <button class="ghost-btn summary-ghost" data-action="restart-flow">Ugh, no thanks..</button>
        </div>
      </div>
      ${state.showStageInfo ? renderStageInfoModal() : ""}
    </section>
  `;
}
