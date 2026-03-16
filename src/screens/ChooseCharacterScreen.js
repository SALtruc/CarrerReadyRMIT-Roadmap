import { avatars } from "../data/avatars.js";
import { renderAvatarCard } from "../components/AvatarCard.js";
import { renderTopBar } from "../components/TopBar.js";

export function renderChooseCharacterScreen(state) {
  return `
    <section class="screen screen--choose-character grid-bg bg-explore">
      <div class="choose-character__header">
        ${renderTopBar(state, { showAvatar: false })}
        <h1 class="choose-character__title">
          <span class="choose-character__title-line">Choose your</span>
          <span class="choose-character__title-line"><span class="accent">avatar</span></span>
        </h1>
      </div>
      <div class="avatar-grid" data-preserve-scroll="choose-avatar-grid">
        ${avatars
          .map((avatar) =>
            renderAvatarCard({
              avatar,
              isSelected: avatar.id === state.selectedAvatarId
            })
          )
          .join("")}
      </div>
      ${state.selectedAvatarId ? `
        <button class="choose-next-button" data-action="begin-questions">Next</button>
      ` : ""}
    </section>
  `;
}
