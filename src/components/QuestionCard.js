export function renderQuestionCard({ question, index, stage }) {
  const cardClasses = [
    "question-card",
    index === 1 ? "is-background" : "",
    index === 2 ? "is-secondary" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <article
      class="${cardClasses}"
      data-component="question-card"
      data-question-card="${index === 0 ? "front" : "stack"}"
      data-question-id="${question.id}"
      style="--question-stage-accent:${stage.color};"
    >
      <div class="question-card__banner">
        <span style="background:#f12c2c"></span>
        <span style="background:#57d9ee"></span>
        <span style="background:#fff"></span>
        <span style="background:#14266d"></span>
        <span style="background:#ef70da"></span>
        <span style="background:#ffde4c"></span>
      </div>
      <div class="question-card__body">
        <h2 class="question-card__title">${question.title}</h2>
        <div class="question-card__art asset-missing" data-asset-container="question-art">
          <img
            class="question-card__image"
            data-asset-image="question-art"
            src="${question.assetPath}"
            alt="${question.imageAlt}"
            draggable="false"
          >
          <div class="question-card__figure">${question.figure}</div>
        </div>
        <p class="question-card__caption">${question.note}</p>
      </div>
      <div class="question-card__drag-surface" aria-hidden="true"></div>
    </article>
  `;
}
