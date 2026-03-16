import { renderChooseCharacterScreen } from "./screens/ChooseCharacterScreen.js";
import { renderQuestionDeckScreen } from "./screens/QuestionDeckScreen.js";
import { renderRoadmapScreen } from "./screens/RoadmapScreen.js";
import { renderStageDetailScreen } from "./screens/StageDetailScreen.js";
import { renderSummaryScreen } from "./screens/SummaryScreen.js";
import { renderWelcomeScreen } from "./screens/WelcomeScreen.js";

export function renderApp(state) {
  switch (state.screen) {
    case "welcome":
      return renderWelcomeScreen(state);
    case "choose-character":
      return renderChooseCharacterScreen(state);
    case "question-deck":
      return renderQuestionDeckScreen(state);
    case "roadmap":
      return renderRoadmapScreen(state);
    case "summary":
      return renderSummaryScreen(state);
    case "stage-detail":
      return renderStageDetailScreen(state);
    default:
      return renderWelcomeScreen(state);
  }
}
