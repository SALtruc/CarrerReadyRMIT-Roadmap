export const state = {
  screen: "welcome",
  selectedAvatarId: null,
  hasActivatedChooseNext: false,
  questionIndex: 0,
  answers: {},
  activitySelections: {
    explore: [],
    develop: [],
    transition: []
  },
  activeStage: "explore",
  showStageInfo: false,
  swipeFeedback: null,
  showQuestionIntro: false,
  showRoadmapCheck: false,
  roadmapAutoAdvanceDisabled: false
};

export function resetState() {
  state.screen = "welcome";
  state.selectedAvatarId = null;
  state.hasActivatedChooseNext = false;
  state.questionIndex = 0;
  state.answers = {};
  state.activitySelections = {
    explore: [],
    develop: [],
    transition: []
  };
  state.activeStage = "explore";
  state.showStageInfo = false;
  state.swipeFeedback = null;
  state.showQuestionIntro = false;
  state.showRoadmapCheck = false;
  state.roadmapAutoAdvanceDisabled = false;
}
