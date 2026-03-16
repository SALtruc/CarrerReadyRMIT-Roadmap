import { renderQuestionCard } from "../components/QuestionCard.js";
import { renderSegmentBar } from "../components/SegmentBar.js";
import { renderTopBar } from "../components/TopBar.js";
import { questions } from "../data/questions.js";
import { stageMeta } from "../data/stages.js";
import { getCurrentQuestion } from "../utils/selectors.js";

export function renderQuestionDeckScreen(state) {
  const currentQuestion = getCurrentQuestion(state);
  if (!currentQuestion) {
    return "";
  }

  const currentStage = stageMeta[currentQuestion.stage];
  const stackedQuestions = questions.slice(state.questionIndex, state.questionIndex + 3);
  const swipeStateClass = state.swipeFeedback ? `is-swipe-${state.swipeFeedback.type}` : "";

  return `
    <section class="screen screen--question-deck grid-bg ${currentStage.background} ${swipeStateClass}">
      ${renderTopBar(state, { showAvatar: true })}
      <div class="question-deck__chrome">
        <div class="progress-line"></div>
        ${renderSegmentBar(state)}
      </div>
      <div class="deck-zone">
        <div class="question-stack">
          ${stackedQuestions
            .map((question, index) =>
              renderQuestionCard({
                question,
                index,
                stage: stageMeta[question.stage]
              })
            )
            .reverse()
            .join("")}
        </div>
        ${state.showQuestionIntro ? renderQuestionIntroOverlay() : ""}
      </div>
      <div class="deck-actions ${state.showQuestionIntro ? "is-hidden" : ""}">
        <button class="deck-button reject" data-action="answer-no" aria-label="Not yet">&times;</button>
        <button class="deck-button accept" data-action="answer-yes" aria-label="Yes">&#10003;</button>
      </div>
      <p class="question-deck__hint ${state.showQuestionIntro ? "is-hidden" : ""}">
        Swipe right for “yes”, swipe left for “not yet”.
      </p>
    </section>
  `;
}

function renderQuestionIntroOverlay() {
  return `
    <div class="question-intro" data-action="dismiss-question-intro">
      <button class="question-intro__bar" data-action="dismiss-question-intro" aria-label="Start swiping">
        <span class="question-intro__arrow">&larr;</span>
        <span>Swipe</span>
        <span class="question-intro__arrow">&rarr;</span>
      </button>
    </div>
  `;
}
