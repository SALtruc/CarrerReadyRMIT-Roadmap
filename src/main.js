import { renderApp } from "./renderApp.js";
import { avatars } from "./data/avatars.js";
import { getStageActivityAssetPaths } from "./data/activities.js";
import { questions } from "./data/questions.js";
import { setupQuestionSwipe } from "./interactions/setupQuestionSwipe.js";
import { state } from "./state/store.js";
import {
  answerCurrentQuestion,
  closeStageInfo,
  dismissQuestionIntro,
  openChooseCharacterScreen,
  openExploreScreen,
  openQuestionDeckScreen,
  openStageDetailScreen,
  restartFlow,
  selectAvatar,
  showNextStage,
  showPreviousStage,
  toggleActivitySelection,
  toggleStageInfo
} from "./state/actions.js";
import { markAssetFailed, markAssetLoaded, warmAssetSources } from "./utils/assets.js";

const app = document.getElementById("app");
let roadmapCheckTimer = null;
let roadmapSummaryTimer = null;
let roadmapSequenceRunning = false;
let questionIntroTimer = null;
let previousQuestionDeckProgress = null;
const preloadAssetSources = [
  "./src/assets/logo-badge.png",
  "./src/assets/welcome-coach.png",
  "./src/assets/Map.png",
  "./src/assets/button/no.png",
  "./src/assets/button/yes.png",
  ...new Set(
    avatars.flatMap((avatar) => [
      avatar.assetPath,
      avatar.selectedAssetPath,
      avatar.nonSelectedAssetPath
    ].filter(Boolean))
  ),
  ...questions.map((question) => question.assetPath),
  ...getStageActivityAssetPaths()
];

warmAssetSources(preloadAssetSources);

function render() {
  const preservedScroll = capturePreservedScroll();
  app.innerHTML = renderApp(state);
  restorePreservedScroll(preservedScroll);
  bindAssetImages();
  bindSummaryBoardMotion();
  bindQuestionDeckProgress();
  syncRoadmapSequence();
  syncQuestionIntroOverlay();

  if (state.screen === "question-deck") {
    setupQuestionSwipe({
      root: app,
      state,
      onAnswer: (answer) => {
        answerCurrentQuestion(answer);
        render();
      }
    });
  }
}

function bindSummaryBoardMotion() {
  const board = app.querySelector("[data-summary-board]");

  if (!board || board.dataset.bound === "true") {
    return;
  }

  board.dataset.bound = "true";

  let startX = 0;
  let startY = 0;
  let hasDragged = false;

  const setBoardVars = (clientX, clientY) => {
    const rect = board.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    const nx = Math.max(-1, Math.min(1, (px - 0.5) * 2));
    const ny = Math.max(-1, Math.min(1, (py - 0.5) * 2));

    board.style.setProperty("--summary-rotate-x", `${(-ny * 4.5).toFixed(2)}deg`);
    board.style.setProperty("--summary-rotate-y", `${(nx * 5.5).toFixed(2)}deg`);
    board.style.setProperty("--explore-rotate", `${(-nx * 5 + ny * 1.6).toFixed(2)}deg`);
    board.style.setProperty("--develop-rotate", `${(nx * 6.4 - ny * 1.8).toFixed(2)}deg`);
    board.style.setProperty("--transition-rotate", `${(nx * 3.2 + ny * 1.2).toFixed(2)}deg`);
    board.style.setProperty("--explore-lift", `${(-Math.abs(ny) * 7).toFixed(2)}px`);
    board.style.setProperty("--develop-lift", `${(-Math.abs(nx) * 6.5).toFixed(2)}px`);
    board.style.setProperty("--transition-lift", `${(-Math.abs(nx) * 4.5).toFixed(2)}px`);
    board.classList.add("is-tilting");
  };

  const resetBoardVars = () => {
    board.style.setProperty("--summary-rotate-x", "0deg");
    board.style.setProperty("--summary-rotate-y", "0deg");
    board.style.setProperty("--explore-rotate", "0deg");
    board.style.setProperty("--develop-rotate", "0deg");
    board.style.setProperty("--transition-rotate", "0deg");
    board.style.setProperty("--explore-lift", "0px");
    board.style.setProperty("--develop-lift", "0px");
    board.style.setProperty("--transition-lift", "0px");
    board.classList.remove("is-tilting");
  };

  board.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
    hasDragged = false;
    setBoardVars(event.clientX, event.clientY);
  });

  board.addEventListener("pointermove", (event) => {
    if (Math.abs(event.clientX - startX) > 6 || Math.abs(event.clientY - startY) > 6) {
      hasDragged = true;
    }

    setBoardVars(event.clientX, event.clientY);
  });

  board.addEventListener("pointerleave", resetBoardVars);

  board.addEventListener("pointerup", () => {
    if (hasDragged) {
      board.dataset.suppressClick = "true";
    }

    window.setTimeout(resetBoardVars, 60);
  });

  board.addEventListener("pointercancel", resetBoardVars);
}

function bindQuestionDeckProgress() {
  const fill = app.querySelector(".progress-line__fill");
  if (!fill || state.screen !== "question-deck") {
    previousQuestionDeckProgress = null;
    return;
  }

  const nextProgress = Number.parseFloat(fill.dataset.progressValue || "0");
  const startProgress =
    previousQuestionDeckProgress === null ? Math.max(0, nextProgress - (100 / questions.length)) : previousQuestionDeckProgress;

  fill.style.width = `${startProgress}%`;

  window.requestAnimationFrame(() => {
    fill.style.width = `${nextProgress}%`;
  });

  previousQuestionDeckProgress = nextProgress;
}

function syncRoadmapSequence() {
  if (state.screen !== "roadmap") {
    clearRoadmapSequence();
    return;
  }

  if (state.roadmapAutoAdvanceDisabled) {
    clearRoadmapSequence();
    return;
  }

  if (roadmapSequenceRunning) {
    return;
  }

  roadmapSequenceRunning = true;

  roadmapCheckTimer = window.setTimeout(() => {
    if (state.screen !== "roadmap") {
      return;
    }

    state.showRoadmapCheck = true;
    render();
  }, 5000);

  roadmapSummaryTimer = window.setTimeout(() => {
    if (state.screen !== "roadmap") {
      return;
    }

    openExploreScreen("explore");
    render();
  }, 5900);
}

function clearRoadmapSequence() {
  if (roadmapCheckTimer) {
    window.clearTimeout(roadmapCheckTimer);
  }

  if (roadmapSummaryTimer) {
    window.clearTimeout(roadmapSummaryTimer);
  }

  roadmapCheckTimer = null;
  roadmapSummaryTimer = null;
  roadmapSequenceRunning = false;
}

function syncQuestionIntroOverlay() {
  clearQuestionIntroOverlaySync();

  if (state.screen !== "question-deck" || !state.showQuestionIntro) {
    return;
  }

  questionIntroTimer = window.setTimeout(() => {
    dismissQuestionIntroOverlayInPlace();
  }, 3000);

  app.addEventListener("pointerdown", handleQuestionIntroInteraction, true);
  app.addEventListener("keydown", handleQuestionIntroInteraction, true);
  app.addEventListener("wheel", handleQuestionIntroInteraction, true);
}

function clearQuestionIntroOverlaySync() {
  if (questionIntroTimer) {
    window.clearTimeout(questionIntroTimer);
  }

  questionIntroTimer = null;
  app.removeEventListener("pointerdown", handleQuestionIntroInteraction, true);
  app.removeEventListener("keydown", handleQuestionIntroInteraction, true);
  app.removeEventListener("wheel", handleQuestionIntroInteraction, true);
}

function handleQuestionIntroInteraction() {
  dismissQuestionIntroOverlayInPlace();
}

function dismissQuestionIntroOverlayInPlace() {
  if (!state.showQuestionIntro) {
    return;
  }

  dismissQuestionIntro();
  clearQuestionIntroOverlaySync();

  const overlay = app.querySelector(".question-intro");
  if (!overlay) {
    return;
  }

  overlay.classList.add("is-hiding");

  const removeOverlay = () => {
    if (overlay.isConnected) {
      overlay.remove();
    }
  };

  overlay.addEventListener("transitionend", removeOverlay, { once: true });
  window.setTimeout(removeOverlay, 220);
}

function capturePreservedScroll() {
  const entries = {};

  app.querySelectorAll("[data-preserve-scroll]").forEach((element) => {
    const key = element.dataset.preserveScroll;
    if (!key) {
      return;
    }

    entries[key] = {
      top: element.scrollTop,
      left: element.scrollLeft
    };
  });

  return entries;
}

function restorePreservedScroll(entries) {
  app.querySelectorAll("[data-preserve-scroll]").forEach((element) => {
    const key = element.dataset.preserveScroll;
    const snapshot = key ? entries[key] : null;

    if (!snapshot) {
      return;
    }

    element.scrollTop = snapshot.top;
    element.scrollLeft = snapshot.left;
  });
}

function bindAssetImages() {
  app.querySelectorAll("[data-asset-image]").forEach((image) => {
    if (image.dataset.bound === "true") {
      return;
    }

    image.dataset.bound = "true";

    const container = image.closest("[data-asset-container]");

    const applyLoaded = () => {
      if (!container) {
        return;
      }

      markAssetLoaded(image.getAttribute("src") || image.currentSrc);
      container.classList.add("has-asset");
      container.classList.remove("asset-missing");
    };

    const applyMissing = () => {
      if (!container) {
        return;
      }

      markAssetFailed(image.getAttribute("src") || image.currentSrc);
      container.classList.remove("has-asset");
      container.classList.add("asset-missing");
    };

    image.addEventListener("load", applyLoaded);
    image.addEventListener("error", applyMissing);

    if (image.complete) {
      if (image.naturalWidth > 0) {
        applyLoaded();
      } else {
        applyMissing();
      }
    }
  });
}

function handleAppClick(event) {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement || !app.contains(actionElement)) {
    return;
  }

  if (
    actionElement.dataset.action === "close-stage-info" &&
    actionElement.dataset.component === "stage-info-modal" &&
    event.target.closest(".stage-info-sheet, .modal-card")
  ) {
    return;
  }

  if (
    actionElement.dataset.action === "toggle-stage-info" &&
    actionElement.hasAttribute("data-summary-board") &&
    actionElement.dataset.suppressClick === "true"
  ) {
    actionElement.dataset.suppressClick = "false";
    return;
  }

  switch (actionElement.dataset.action) {
    case "start-flow":
      openChooseCharacterScreen();
      break;
    case "select-avatar":
      selectAvatar(actionElement.dataset.avatarId);
      break;
    case "begin-questions":
      openQuestionDeckScreen();
      break;
    case "dismiss-question-intro":
      dismissQuestionIntro();
      break;
    case "answer-no":
      answerCurrentQuestion(false);
      break;
    case "answer-yes":
      answerCurrentQuestion(true);
      break;
    case "show-summary":
      openExploreScreen("explore");
      break;
    case "open-stage-detail":
      openStageDetailScreen(actionElement.dataset.stage);
      break;
    case "stage-back":
      showPreviousStage();
      break;
    case "stage-next":
      showNextStage();
      break;
    case "toggle-stage-info":
      toggleStageInfo();
      break;
    case "close-stage-info":
      closeStageInfo();
      break;
    case "toggle-activity":
      toggleActivitySelection(
        actionElement.dataset.stage,
        actionElement.dataset.activityId
      );
      break;
    case "restart-flow":
      restartFlow();
      break;
    default:
      return;
  }

  render();
}

app.addEventListener("click", handleAppClick);
render();
