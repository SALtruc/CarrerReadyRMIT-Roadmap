const unlockAnimationAssetPath = "./src/assets/Unclock_animation.gif";

export function renderUnlockTransitionScreen() {
  return `
    <section class="screen screen--unlock-transition grid-bg bg-transition" aria-label="Preparing your roadmap">
      <div class="unlock-transition__media-wrap" aria-live="polite">
        <img
          class="unlock-transition__media"
          src="${unlockAnimationAssetPath}"
          alt="Unlock animation for your career roadmap"
          decoding="async"
          loading="eager"
          draggable="false"
        >
      </div>
    </section>
  `;
}
