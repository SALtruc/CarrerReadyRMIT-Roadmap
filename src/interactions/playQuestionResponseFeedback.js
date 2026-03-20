export function playQuestionResponseFeedback({ root, answer, sourceButton = null }) {
  const screen = root.querySelector(".screen--question-deck");
  if (!screen) {
    return;
  }

  const type = answer ? "accept" : "reject";
  const button = sourceButton || root.querySelector(
    answer ? ".deck-button.accept" : ".deck-button.reject"
  );
  const existingParty = screen.querySelector("[data-answer-party]");

  if (existingParty) {
    existingParty.remove();
  }

  screen.classList.remove("is-answer-accept", "is-answer-reject");

  const party = document.createElement("div");
  party.className = `answer-party answer-party--${type}`;
  party.dataset.answerParty = "true";

  const badge = document.createElement("span");
  badge.className = "answer-party__badge";
  badge.textContent = answer ? "Yay!" : "Next!";
  party.appendChild(badge);

  const pieces = answer
    ? [
        { shape: "star", color: "#fac800", angle: -96, distance: 66, size: 20, delay: 0, spin: -40 },
        { shape: "diamond", color: "#46dcea", angle: -48, distance: 80, size: 18, delay: 26, spin: 64 },
        { shape: "dot", color: "#ffffff", angle: -14, distance: 58, size: 13, delay: 44, spin: 0 },
        { shape: "dash", color: "#fd73ed", angle: 22, distance: 82, size: 20, delay: 12, spin: 32 },
        { shape: "diamond", color: "#ffffff", angle: 56, distance: 68, size: 16, delay: 52, spin: -48 },
        { shape: "star", color: "#fac800", angle: 96, distance: 58, size: 16, delay: 22, spin: 28 }
      ]
    : [
        { shape: "star", color: "#ffb36b", angle: -104, distance: 64, size: 18, delay: 0, spin: 32 },
        { shape: "dash", color: "#ffffff", angle: -52, distance: 76, size: 18, delay: 32, spin: -20 },
        { shape: "diamond", color: "#ff5d6d", angle: -14, distance: 56, size: 16, delay: 48, spin: 42 },
        { shape: "dot", color: "#ffd6db", angle: 18, distance: 74, size: 12, delay: 18, spin: 0 },
        { shape: "dash", color: "#fac800", angle: 52, distance: 66, size: 16, delay: 54, spin: 18 },
        { shape: "diamond", color: "#ffffff", angle: 98, distance: 56, size: 15, delay: 24, spin: -32 }
      ];

  pieces.forEach((piece) => {
    const particle = document.createElement("span");
    const radians = (piece.angle * Math.PI) / 180;
    const offsetX = Math.cos(radians) * piece.distance;
    const offsetY = Math.sin(radians) * piece.distance;

    particle.className = `answer-party__piece answer-party__piece--${piece.shape}`;
    particle.style.setProperty("--size", `${piece.size}px`);
    particle.style.setProperty("--delay", `${piece.delay}ms`);
    particle.style.setProperty("--offset-x", `${offsetX.toFixed(2)}px`);
    particle.style.setProperty("--offset-y", `${offsetY.toFixed(2)}px`);
    particle.style.setProperty("--spin", `${piece.spin}deg`);
    particle.style.setProperty("--piece-color", piece.color);
    party.appendChild(particle);
  });

  if (button) {
    const buttonRect = button.getBoundingClientRect();
    const screenRect = screen.getBoundingClientRect();
    party.style.setProperty("--party-x", `${buttonRect.left - screenRect.left + (buttonRect.width / 2)}px`);
    party.style.setProperty("--party-y", `${buttonRect.top - screenRect.top + (buttonRect.height / 2)}px`);
    button.classList.remove("is-fired");
    void button.offsetWidth;
    button.classList.add("is-fired");
    window.setTimeout(() => {
      button.classList.remove("is-fired");
    }, 360);
  } else {
    party.style.setProperty("--party-x", answer ? "78%" : "22%");
    party.style.setProperty("--party-y", "76%");
  }

  screen.appendChild(party);

  window.requestAnimationFrame(() => {
    party.classList.add("is-active");
  });

  window.setTimeout(() => {
    if (party.isConnected) {
      party.remove();
    }
  }, 620);
}
