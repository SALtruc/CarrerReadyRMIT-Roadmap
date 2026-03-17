import { questions } from "../data/questions.js";
import { resetState, state } from "./store.js";

export function openChooseCharacterScreen() {
  state.screen = "choose-character";
  state.hasActivatedChooseNext = Boolean(state.selectedAvatarId);
  state.showRoadmapCheck = false;
}

export function selectAvatar(avatarId) {
  state.selectedAvatarId = avatarId;
  state.hasActivatedChooseNext = true;
}

export function openQuestionDeckScreen() {
  if (!state.selectedAvatarId) {
    return;
  }

  state.screen = "question-deck";
  state.showQuestionIntro = true;
  state.swipeFeedback = null;
  state.showRoadmapCheck = false;
}

export function dismissQuestionIntro() {
  state.showQuestionIntro = false;
}

export function openSummaryScreen() {
  state.screen = "summary";
  state.showRoadmapCheck = false;
}

export function openStageDetailScreen(stage) {
  state.activeStage = stage;
  state.screen = "stage-detail";
  state.showRoadmapCheck = false;
}

export function toggleStageInfo() {
  state.showStageInfo = !state.showStageInfo;
}

export function closeStageInfo() {
  state.showStageInfo = false;
}

export function answerCurrentQuestion(answer) {
  const question = questions[state.questionIndex];
  if (!question) {
    return;
  }

  state.answers[question.id] = answer;
  state.swipeFeedback = null;
  state.showQuestionIntro = false;

  if (state.questionIndex === questions.length - 1) {
    state.screen = "roadmap";
    state.showRoadmapCheck = false;
    return;
  }

  state.questionIndex += 1;
}

export function toggleActivitySelection(stage, activityId) {
  const selections = state.activitySelections[stage];
  const existingIndex = selections.indexOf(activityId);

  if (existingIndex >= 0) {
    selections.splice(existingIndex, 1);
    return;
  }

  if (selections.length < 3) {
    selections.push(activityId);
  }
}

export function restartFlow() {
  resetState();
}
