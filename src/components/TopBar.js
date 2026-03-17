import { getSelectedAvatar } from "../utils/selectors.js";
import { getAssetStateClass } from "../utils/assets.js";

export function renderTopBar(state, options = {}) {
  const { showAvatar = false } = options;
  const avatar = getSelectedAvatar(state);
  const logoImagePath = "./src/assets/logo-badge.png";
  const logoStateClass = getAssetStateClass(logoImagePath);

  return `
    <div class="topbar" data-component="top-bar">
      <div class="logo-badge ${logoStateClass}" data-asset-container="logo" aria-hidden="true">
        <img
          class="logo-badge__image"
          data-asset-image="logo"
          src="${logoImagePath}"
          alt="Career Ready logo"
          decoding="async"
          loading="eager"
          fetchpriority="high"
        >
      </div>
      <div class="avatar-chip ${showAvatar && avatar ? "" : "hidden"}">
        ${avatar ? `
          <div
            class="avatar-chip__face ${getAssetStateClass(avatar.assetPath)}"
            data-asset-container="avatar-chip"
            style="background:linear-gradient(145deg, ${avatar.colors[0]}, ${avatar.colors[1]});"
          >
            <img
              class="avatar-chip__image"
              data-asset-image="avatar-chip"
              src="${avatar.assetPath}"
              alt="${avatar.name} avatar"
              decoding="async"
              loading="eager"
            >
            <span class="avatar-chip__fallback">${avatar.icon}</span>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}
