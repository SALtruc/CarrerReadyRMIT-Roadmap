export function renderAvatarCard({ avatar, isSelected }) {
  return `
    <button
      class="avatar-card ${isSelected ? "is-selected" : ""}"
      data-component="avatar-card"
      data-action="select-avatar"
      data-avatar-id="${avatar.id}"
      aria-label="Choose ${avatar.name} avatar"
      aria-pressed="${isSelected ? "true" : "false"}"
    >
      <div
        class="avatar-card__art asset-missing"
        data-asset-container="avatar"
        style="background: linear-gradient(145deg, ${avatar.colors[0]}, ${avatar.colors[1]});"
      >
        <img
          class="avatar-card__image"
          data-asset-image="avatar"
          src="${avatar.assetPath}"
          alt="${avatar.name} avatar"
        >
        <span class="avatar-card__fallback">${avatar.icon}</span>
        ${isSelected ? '<span class="avatar-card__status" aria-hidden="true">✓</span>' : ""}
      </div>
    </button>
  `;
}
