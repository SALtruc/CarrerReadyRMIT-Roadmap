import { activities, stageSequence } from "./activities.js";
import { getStageScore } from "../utils/selectors.js";

const roadmapAssetFolder = "./src/assets/Roadmap";
const roadmapDetailAssetFolder = `${roadmapAssetFolder}/Roadmap_node_des`;

const ROADMAP_REFERENCE_SIZE = {
  width: 1980,
  height: 12017
};

const ROADMAP_CUSTOM_SIZE = {
  width: 1212,
  height: 10746
};

const ROADMAP_PREMADE_SIZE = {
  width: 1212,
  height: 10488
};

export const ROADMAP_BACKGROUND_SIZE = { ...ROADMAP_CUSTOM_SIZE };

export const ROADMAP_BACKGROUND_ASSET_PATH =
  `${roadmapAssetFolder}/Placeholder map.png`;

export const ROADMAP_PREMADE_ASSET_PATH =
  `${roadmapAssetFolder}/Already_put_Roadmap.png`;

export const ROADMAP_FACEBOOK_LINKS = {
  sgs: "https://www.facebook.com/RMITCareerReadySGS",
  hanoi: "https://www.facebook.com/RMITCareerReadyHN"
};

const roadmapReferenceStageScoreLayout = {
  explore: { x: 470, y: 1310, fontSize: 125 },
  develop: { x: 989, y: 1310, fontSize: 125 },
  transition: { x: 1520, y: 1310, fontSize: 125 }
};

const roadmapReferenceStageIconSlots = {
  explore: [
    { x: 480, y: 2820, maxWidth: 560, maxHeight: 560, rotate: -3.2, scale: 2 },
    { x: 1520, y: 3450, maxWidth: 560, maxHeight: 560, rotate: 3.2, scale: 2 },
    { x: 480, y: 3950, maxWidth: 560, maxHeight: 560, rotate: -3.2, scale: 2 }
  ],
  develop: [
    { x: 1520, y: 5780, maxWidth: 560, maxHeight: 560, rotate: 3.2, scale: 1.8 },
    { x: 460, y: 6250, maxWidth: 560, maxHeight: 560, rotate: -3.2, scale: 1.8},
    { x: 1520, y: 6830, maxWidth: 560, maxHeight: 560, rotate: 3.2, scale: 1.8 }
  ],
  transition: [
    { x: 480, y: 8700, maxWidth: 560, maxHeight: 560, rotate: -3.2, scale: 1.8},
    { x: 1550, y: 9350, maxWidth: 560, maxHeight: 560, rotate: 3.2, scale: 2 },
    { x: 460, y: 9890, maxWidth: 560, maxHeight: 560, rotate: -3.2, scale: 1.8 }
  ]
};

const roadmapReferenceStageDetailSlots = {
  explore: [
    { x: 1510, y: 2850, boxSize: 560, scale: 1.6, shiftYRatio: 0.04, direction: "right" },
    { x: 460, y: 3370, boxSize: 560, scale: 1.6, shiftYRatio: 0.04, direction: "left" },
    { x: 1510, y: 3915, boxSize: 560, scale: 1.6, shiftYRatio: 0.04, direction: "right" }
  ],
  develop: [
    { x: 460, y: 5700, boxSize: 580, scale: 1.5, shiftYRatio: 0.04, direction: "left" },
    { x: 1520, y: 6250, boxSize: 580, scale: 1.6, shiftYRatio: 0.04, direction: "right" },
    { x: 460, y: 6750, boxSize: 580, scale: 1.5, shiftYRatio: 0.04, direction: "left" }
  ],
  transition: [
    { x: 1520, y: 8680, boxSize: 580, scale: 1.6, shiftYRatio: 0.04, direction: "right" },
    { x: 460, y: 9300, boxSize: 580, scale: 1.6, shiftYRatio: 0.04, direction: "left" },
    { x: 1520, y: 9890, boxSize: 580, scale: 1.6, shiftYRatio: 0.04, direction: "right" }
  ]
};

function scaleRoadmapX(value, width) {
  return Math.round((value / ROADMAP_REFERENCE_SIZE.width) * width);
}

function scaleRoadmapY(value, height) {
  return Math.round((value / ROADMAP_REFERENCE_SIZE.height) * height);
}

function createRoadmapStageScoreLayout(size) {
  return Object.fromEntries(
    Object.entries(roadmapReferenceStageScoreLayout).map(([stage, layout]) => [
      stage,
      {
        x: scaleRoadmapX(layout.x, size.width),
        y: scaleRoadmapY(layout.y, size.height),
        fontSize: scaleRoadmapX(layout.fontSize, size.width)
      }
    ])
  );
}

function createRoadmapStageIconSlots(size) {
  return Object.fromEntries(
    Object.entries(roadmapReferenceStageIconSlots).map(([stage, slots]) => [
      stage,
      slots.map((slot) => ({
        ...slot,
        x: scaleRoadmapX(slot.x, size.width),
        y: scaleRoadmapY(slot.y, size.height),
        maxWidth: scaleRoadmapX(slot.maxWidth, size.width),
        maxHeight: scaleRoadmapY(slot.maxHeight, size.height)
      }))
    ])
  );
}

function createRoadmapStageDetailSlots(size) {
  return Object.fromEntries(
    Object.entries(roadmapReferenceStageDetailSlots).map(([stage, slots]) => [
      stage,
      slots.map((slot) => ({
        ...slot,
        x: scaleRoadmapX(slot.x, size.width),
        y: scaleRoadmapY(slot.y, size.height),
        boxSize: scaleRoadmapX(slot.boxSize, size.width),
        shiftY: Math.round(scaleRoadmapX(slot.boxSize, size.width) * slot.shiftYRatio)
      }))
    ])
  );
}

export const roadmapStageScoreLayout = createRoadmapStageScoreLayout(ROADMAP_CUSTOM_SIZE);
export const roadmapStageIconSlots = createRoadmapStageIconSlots(ROADMAP_CUSTOM_SIZE);
export const roadmapStageDetailSlots = createRoadmapStageDetailSlots(ROADMAP_CUSTOM_SIZE);

const roadmapPosterConfigByVariant = {
  custom: {
    assetPath: ROADMAP_BACKGROUND_ASSET_PATH,
    size: ROADMAP_CUSTOM_SIZE,
    stageScoreLayout: roadmapStageScoreLayout,
    stageIconSlots: roadmapStageIconSlots,
    stageDetailSlots: roadmapStageDetailSlots
  },
  premade: {
    assetPath: ROADMAP_PREMADE_ASSET_PATH,
    size: ROADMAP_PREMADE_SIZE,
    stageScoreLayout: roadmapStageScoreLayout,
    stageIconSlots: createRoadmapStageIconSlots(ROADMAP_PREMADE_SIZE),
    stageDetailSlots: createRoadmapStageDetailSlots(ROADMAP_PREMADE_SIZE)
  }
};

export function getRoadmapPosterConfig(variant = "custom") {
  return roadmapPosterConfigByVariant[variant === "premade" ? "premade" : "custom"];
}

const roadmapAssetFileByActivityId = {
  "career-assessment": "Career Assessment.png",
  consultation: "1_1 Consultations.png",
  "cv-consults": "CV Consults.png",
  "career-online-portal": "Careers Online Portal.png",
  "career-starter-pack": "Career Starter Pack Workshop.png",
  "volunteer-program": "Volunteer Program.png",
  "career-ready-award": "Career Ready Award.png",
  "job-search-strategy": `Job Search Strategy Workshop\u00A0.png`,
  "internship-preparation": `Internship Preparation  Workshop\u00A0.png`,
  "internship-enhancement": "Internship Enhancement  Workshop.png",
  "linkedin-leap": "LinkedIn Leap.png",
  "become-club-leader": "Become Club Leader.png",
  "join-competition": "Join Competition.png",
  "employer-group-mentoring": "Employer Group Mentoring.png",
  "career-ready-hub-drop-in": `Career Ready Hub Drop-in\u00A0.png`,
  "company-visit": "Company Visit.png",
  "wil-industry-challenge-projects": "In-class projects.png",
  "global-experience-virtual-internships": "Virtual Internships.png",
  "application-101": "Application 101.png",
  cv360: "CV360.png",
  interview360: "Interview360.png",
  "meet-your-employer": "Meet your employer.png",
  "careers-festival": "Careers Festival.png",
  "skillboost-101": "Skillboost 101.png",
  "employability-skills-workshop": `Employability Skills Workshop\u00A0.png`,
  "alumni-mentoring": "Alumni Mentoring.png",
  "personal-branding-workshops": `Personal Branding Workshops\u00A0.png`,
  "future-ready-workshops": "Future Ready Workshops.png"
};

const roadmapDetailAssetFileByActivityId = {
  "career-assessment": "Career Assessment.png",
  consultation: "1_1 Consultations.png",
  "cv-consults": "CV Consults.png",
  "career-online-portal": "Career Online Portal (COP).png",
  "career-starter-pack": "How 2 get career ready.png",
  "volunteer-program": "Volunteer Program.png",
  "career-ready-award": "Career Ready Award.png",
  "job-search-strategy": `Job Search Strategy Workshop\u00A0.png`,
  "internship-preparation": `Internship Preparation  Workshop\u00A0.png`,
  "internship-enhancement": "Internship Enhancement Workshop.png",
  "linkedin-leap": "LinkedIn Leap.png",
  "become-club-leader": "Become A Club Leader.png",
  "join-competition": "Join Competition.png",
  "employer-group-mentoring": "Employer Group Mentoring.png",
  "career-ready-hub-drop-in": "Career Ready Hub Drop-in.png",
  "company-visit": "Company Visit.png",
  "wil-industry-challenge-projects": "WIL-Industry  Challenge Projects.png",
  "global-experience-virtual-internships": "Global experience-Virtual Internships.png",
  "application-101": "APPLICATION 102.png",
  cv360: "CV360.png",
  interview360: "INTERVIEW360.png",
  "meet-your-employer": "MEET YOUR EMPLOYER.png",
  "careers-festival": "CAREERS FESTIVAL.png",
  "skillboost-101": "SKILLBOOST 102.png",
  "employability-skills-workshop": "EMPLOYABILITY SKILLS WS.png",
  "alumni-mentoring": "ALUMINI MENTORING.png",
  "personal-branding-workshops": "PERSONAL BRANDING WS.png",
  "future-ready-workshops": "FUTURE READY WS.png"
};

const activityById = Object.fromEntries(
  Object.values(activities)
    .flat()
    .map((activity) => [activity.id, activity])
);

export const roadmapActivityAssetPathById = Object.fromEntries(
  Object.entries(roadmapAssetFileByActivityId).map(([activityId, filename]) => [
    activityId,
    `${roadmapAssetFolder}/${filename}`
  ])
);

export const roadmapActivityDetailAssetPathById = Object.fromEntries(
  Object.entries(roadmapDetailAssetFileByActivityId).map(([activityId, filename]) => [
    activityId,
    `${roadmapDetailAssetFolder}/${filename}`
  ])
);

export function getRoadmapScores(state) {
  return Object.fromEntries(
    stageSequence.map((stage) => [stage, getStageScore(state, stage)])
  );
}

export function getRoadmapSelections(state) {
  const { stageIconSlots, stageDetailSlots } = getRoadmapPosterConfig(state?.roadmapVariant);

  return stageSequence.flatMap((stage) =>
    (state.activitySelections[stage] || [])
      .slice(0, 3)
      .map((activityId, index) => {
        const slot = stageIconSlots[stage][index];
        const detailSlot = stageDetailSlots[stage][index];
        const assetPath = roadmapActivityAssetPathById[activityId];
        const detailAssetPath = roadmapActivityDetailAssetPathById[activityId];
        const activity = activityById[activityId];

        if (!slot || !detailSlot || !assetPath || !activity) {
          return null;
        }

        return {
          activityId,
          stage,
          title: activity.title,
          assetPath,
          detailAssetPath,
          detailSlot,
          slot
        };
      })
      .filter(Boolean)
  );
}

export function getRoadmapAssetPaths(activityIds = null) {
  const resolvedActivityIds = Array.isArray(activityIds)
    ? activityIds
    : Object.keys(roadmapActivityAssetPathById);

  return [
    ROADMAP_BACKGROUND_ASSET_PATH,
    ...new Set(
      resolvedActivityIds
        .flatMap((activityId) => [
          roadmapActivityAssetPathById[activityId],
          roadmapActivityDetailAssetPathById[activityId]
        ])
        .filter(Boolean)
    )
  ];
}

export function getRoadmapDetailAssetPaths(activityIds = null) {
  const resolvedActivityIds = Array.isArray(activityIds)
    ? activityIds
    : Object.keys(roadmapActivityDetailAssetPathById);

  return resolvedActivityIds
    .map((activityId) => roadmapActivityDetailAssetPathById[activityId])
    .filter(Boolean);
}
