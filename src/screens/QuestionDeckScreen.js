import { renderQuestionCard } from "../components/QuestionCard.js";
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
  const nextQuestion = questions[state.questionIndex + 1];
  const swipeStateClass = state.swipeFeedback ? `is-swipe-${state.swipeFeedback.type}` : "";
  const progressPercent = `${((state.questionIndex + 1) / questions.length) * 100}%`;

  return `
    <section class="screen screen--question-deck grid-bg ${currentStage.background} ${swipeStateClass}">
      ${renderTopBar(state, { showAvatar: true })}
      <div class="question-deck__chrome">
        <div class="progress-line" aria-hidden="true">
          <span
            class="progress-line__fill"
            data-progress-value="${((state.questionIndex + 1) / questions.length) * 100}"
            style="width:${progressPercent};"
          ></span>
        </div>
      </div>
      <div class="deck-zone">
        <div class="question-stack">
          ${nextQuestion
            ? renderQuestionCard({
                question: nextQuestion,
                index: 1,
                stage: stageMeta[nextQuestion.stage]
              })
            : ""}
          ${renderQuestionCard({
            question: currentQuestion,
            index: 0,
            stage: currentStage
          })}
        </div>
      </div>
      <div class="deck-actions ${!state.showQuestionIntro ? "" : ""}">
        <button class="deck-button reject" data-action="answer-no" aria-label="Not yet">
          <img class="deck-button__image" src="./src/assets/button/no.png" alt="" draggable="false">
        </button>
        <button class="deck-button accept" data-action="answer-yes" aria-label="Yes">
          <img class="deck-button__image" src="./src/assets/button/yes.png" alt="" draggable="false">
        </button>
      </div>
      ${state.showQuestionIntro ? renderQuestionIntroOverlay() : ""}
    </section>  
  `;
}

function renderQuestionIntroOverlay() {
  return `
    <div class="question-intro" aria-hidden="true">
      <div class="question-intro__bar">
        <span class="question-intro__arrow">&larr;</span>
        <span>Swipe</span>
        <span class="question-intro__arrow">&rarr;</span>
      </div>
    </div>
  `;
}
