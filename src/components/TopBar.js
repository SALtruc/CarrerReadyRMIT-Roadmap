import { getSelectedAvatar } from "../utils/selectors.js";

export function renderTopBar(state, options = {}) {
  const { showAvatar = false } = options;
  const avatar = getSelectedAvatar(state);
  const logoImagePath = "./src/assets/logo-badge.png";

  return `
    <div class="topbar" data-component="top-bar">
      <div class="logo-badge asset-missing" data-asset-container="logo" aria-hidden="true">
        <img class="logo-badge__image" data-asset-image="logo" src="${logoImagePath}" alt="Career Ready logo">
      </div>
      <div class="avatar-chip ${showAvatar && avatar ? "" : "hidden"}">
        ${avatar ? `
          <div
            class="avatar-chip__face asset-missing"
            data-asset-container="avatar-chip"
            style="background:linear-gradient(145deg, ${avatar.colors[0]}, ${avatar.colors[1]});"
          >
            <img
              class="avatar-chip__image"
              data-asset-image="avatar-chip"
              src="${avatar.assetPath}"
              alt="${avatar.name} avatar"
            >
            <span class="avatar-chip__fallback">${avatar.icon}</span>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}
