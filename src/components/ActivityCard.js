export function renderActivityCard({ stageKey, activity, selections }) {
  const isSelected = selections.includes(activity.id);
  const isDisabled = selections.length >= 3 && !isSelected;

  return `
    <button
      class="activity-card ${isSelected ? "is-selected" : ""} ${isDisabled ? "is-disabled" : ""}"
      data-component="activity-card"
      data-action="toggle-activity"
      data-stage="${stageKey}"
      data-activity-id="${activity.id}"
      ${isDisabled ? "disabled" : ""}
    >
      <div class="activity-card__icon" style="--icon-color:${activity.iconColor}">${activity.icon}</div>
      <div class="activity-card__copy">
        <h3>${activity.title}</h3>
        <p>${activity.description}</p>
      </div>
      <div class="activity-card__meta">
        <div class="activity-card__info" title="Info">i</div>
        <div class="activity-card__check">${isSelected ? "&#10003;" : ""}</div>
      </div>
    </button>
  `;
}
