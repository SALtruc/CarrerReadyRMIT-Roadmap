import { renderActivityCard } from "../components/ActivityCard.js";
import { renderSectionRibbon } from "../components/SectionRibbon.js";
import { renderSegmentBar } from "../components/SegmentBar.js";
import {
  activities,
  exploreScoreAssetPath,
  stageActivityScreens
} from "../data/activities.js";
import { stageMeta } from "../data/stages.js";
import { getAssetStateClass } from "../utils/assets.js";
import { getSelectedAvatar, getStageScore } from "../utils/selectors.js";

const badgeClassByStage = {
  explore: "stage-badge--explore",
  develop: "stage-badge--develop",
  transition: "stage-badge--transition"
};

function renderStageStatusBar() {
  return `
    <div class="stage-mobile-status" aria-hidden="true">
      <span class="stage-mobile-status__time">9:41</span>
      <div class="stage-mobile-status__right">
        <span class="stage-mobile-status__signal">
          <i></i><i></i><i></i><i></i>
        </span>
        <span class="stage-mobile-status__wifi"></span>
        <span class="stage-mobile-status__battery"><b></b></span>
      </div>
    </div>
  `;
}

function renderAvatarChip(state) {
  const avatar = getSelectedAvatar(state);

  return `
    <div class="avatar-chip ${avatar ? "" : "hidden"}">
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
  `;
}

function renderStageTopBar(state, stageKey) {
  return `
    <div class="stage-activities__topbar" data-component="stage-top-bar">
      <div class="logo-badge stage-badge ${badgeClassByStage[stageKey] || badgeClassByStage.explore}" aria-hidden="true"></div>
      ${renderAvatarChip(state)}
    </div>
  `;
}

function renderStageScore(score, scoreShape) {
  if (scoreShape === "triangle") {
    return `
      <div class="stage-activities__score stage-activities__score--triangle">
        <img
          class="stage-activities__score-figure"
          src="${exploreScoreAssetPath}"
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="eager"
        >
        <span class="stage-activities__score-value">${score}%</span>
      </div>
    `;
  }

  return `
    <div class="stage-activities__score stage-activities__score--${scoreShape}">
      <span class="stage-activities__score-value">${score}%</span>
    </div>
  `;
}

export function renderExploreScreen(state) {
  const stageKey = stageMeta[state.activeStage] ? state.activeStage : "explore";
  const stage = stageMeta[stageKey];
  const screenConfig = stageActivityScreens[stageKey];
  const stageActivities = activities[stageKey] || [];
  const activityMap = Object.fromEntries(
    stageActivities.map((activity) => [activity.id, activity])
  );
  const selections = state.activitySelections[stageKey] || [];
  const score = getStageScore(state, stageKey);

  return `
    <section
      class="screen screen--stage-activities grid-bg ${stage.background} stage-activities--${stageKey}"
      style="--stage-content-width:${screenConfig.contentWidth}px;"
    >
      ${renderStageStatusBar()}
      <div class="stage-activities__scroll" data-preserve-scroll="stage-activities-${stageKey}">
        <div class="stage-activities__content">
          ${renderStageTopBar(state, stageKey)}
          <button class="back-link stage-activities__back" type="button" data-action="stage-back">
            ${screenConfig.backLabel}
          </button>
          <header class="stage-activities__hero stage-activities__hero--${screenConfig.titleTone}">
            <div class="stage-activities__hero-copy">
              <h1 class="stage-activities__title">${screenConfig.label}</h1>
              <p class="stage-activities__subtitle">
                You can choose <strong>${selections.length}/3 activities</strong><br>to improve your score
              </p>
            </div>
            ${renderStageScore(score, screenConfig.scoreShape)}
          </header>
          <div class="stage-activities__segments">
            ${renderSegmentBar(state)}
          </div>
          <div class="stage-activities__sections">
            ${screenConfig.sections
              .map((section) => {
                const cards = section.activityIds
                  .map((activityId) => activityMap[activityId])
                  .filter(Boolean);

                return `
                  <section class="stage-activities__section" data-stage-section="${section.id}">
                    ${renderSectionRibbon({
                      label: section.title,
                      tone: section.tone || screenConfig.ribbonTone
                    })}
                    <div class="stage-activities__cards">
                      ${cards
                        .map((activity) =>
                          renderActivityCard({
                            stageKey,
                            activity,
                            selections
                          })
                        )
                        .join("")}
                    </div>
                  </section>
                `;
              })
              .join("")}
          </div>
        </div>
      </div>
      <button class="stage-activities__next" type="button" data-action="stage-next">
        Next
      </button>
    </section>
  `;
}
