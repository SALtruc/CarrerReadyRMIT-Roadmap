import { playQuestionResponseFeedback } from "./playQuestionResponseFeedback.js";

export function setupQuestionSwipe({ root, state, onAnswer }) {
  const card = root.querySelector("[data-question-card='front']");
  const stack = root.querySelector(".question-stack");
  if (!card || card.dataset.swipeBound === "true") {
    return;
  }

  card.dataset.swipeBound = "true";

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let dragging = false;
  let hasMoved = false;
  let holdTimer = null;

  card.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  const onPointerMove = (event) => {
    if (!dragging) {
      return;
    }

    if (!hasMoved) {
      hasMoved = true;
      card.style.transition = "none";
    }

    currentX = (event.clientX - startX) * 0.94;
    currentY = (event.clientY - startY) * 0.56;
    const lift = Math.min(Math.abs(currentX) / 160, 1);
    const rotate = currentX / 22;
    const travelY = (currentY * 0.14) - (lift * 8);
    const scale = 1 + (lift * 0.018);

    card.style.transform = `translate(${currentX}px, ${travelY}px) rotate(${rotate}deg) scale(${scale})`;
    card.style.boxShadow = `${4 + Math.round(lift * 8)}px ${6 + Math.round(lift * 7)}px 0 rgba(0, 0, 0, 0.92)`;
    updateStackMotion(stack, lift, currentX);

    if (currentX > 64) {
      state.swipeFeedback = { type: "accept" };
    } else if (currentX < -64) {
      state.swipeFeedback = { type: "reject" };
    } else {
      state.swipeFeedback = null;
    }

    updateSwipePreview(root, state.swipeFeedback);
  };

  const onPointerUp = () => {
    if (!dragging) {
      return;
    }

    dragging = false;
    hasMoved = false;
    clearTimeout(holdTimer);
    card.classList.remove("is-pressing");
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);

    if (currentX > 126) {
      commitSwipe(true);
      return;
    }

    if (currentX < -126) {
      commitSwipe(false);
      return;
    }

    state.swipeFeedback = null;
    card.style.transition = "transform 340ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease";
    card.style.transform = "";
    card.style.boxShadow = "";
    updateStackMotion(stack, 0, 0);
    clearSwipePreview(root);
  };

  card.addEventListener("pointerdown", (event) => {
    dragging = true;
    hasMoved = false;
    startX = event.clientX;
    startY = event.clientY;
    currentX = 0;
    currentY = 0;
    card.style.animation = "none";
    card.classList.add("is-pressing");
    card.style.transition = "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease";
    card.style.transform = "translateY(-6px) scale(1.012)";
    card.style.boxShadow = "8px 12px 0 rgba(0, 0, 0, 0.92)";
    updateStackMotion(stack, 0.14, 0);
    clearTimeout(holdTimer);
    holdTimer = window.setTimeout(() => {
      if (!dragging || hasMoved) {
        return;
      }

      card.style.transform = "translateY(-8px) scale(1.016)";
      updateStackMotion(stack, 0.2, 0);
    }, 90);
    card.setPointerCapture(event.pointerId);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  });

  function commitSwipe(answer) {
    const direction = answer ? 1 : -1;
    const targetX = direction * Math.max(window.innerWidth, 520);
    updateStackMotion(stack, 1, currentX);
    card.style.transition = "transform 220ms cubic-bezier(0.22, 0.85, 0.32, 1), opacity 180ms ease, box-shadow 180ms ease";
    card.style.opacity = "0.92";
    card.style.boxShadow = `${12 + (direction > 0 ? 2 : 0)}px 15px 0 rgba(0, 0, 0, 0.92)`;
    card.style.transform = `translate(${targetX}px, ${(currentY * 0.18) - 16}px) rotate(${direction * 12}deg) scale(1.02)`;
    updateSwipePreview(root, { type: answer ? "accept" : "reject" });
    playQuestionResponseFeedback({ root, answer });

    window.setTimeout(() => {
      onAnswer(answer);
    }, 260);
  }
}

function updateSwipePreview(root, feedback) {
  const screen = root.querySelector(".screen--question-deck");
  if (!screen) {
    return;
  }

  screen.classList.remove("is-swipe-accept", "is-swipe-reject");

  if (!feedback) {
    return;
  }

  screen.classList.add(`is-swipe-${feedback.type}`);
}

function clearSwipePreview(root) {
  updateSwipePreview(root, null);
  updateStackMotion(root.querySelector(".question-stack"), 0, 0);
}

function updateStackMotion(stack, pull, drift) {
  if (!stack) {
    return;
  }

  stack.style.setProperty("--stack-back-x", `${drift * 0.18}px`);
  stack.style.setProperty("--stack-back-y", `${34 - (pull * 22)}px`);
  stack.style.setProperty("--stack-back-scale", `${0.94 + (pull * 0.06)}`);
  stack.style.setProperty("--stack-back-opacity", `${0.04 + (pull * 0.64)}`);
}
