const exploreIconFolder = "./src/assets/icon/explore";
const developIconFolder = "./src/assets/icon/develop";
const transitionIconFolder = "./src/assets/icon/transition";
export const exploreScoreAssetPath = "./src/assets/Tamgiac.png";

export const stageSequence = ["explore", "develop", "transition"];

export const activities = {
  explore: [
    {
      id: "career-assessment",
      title: "Career Assessment",
      descriptionHtml:
        "Understand your <strong>personality</strong>, <strong>interests</strong>, and <strong>strengths</strong> through <strong>self-assessments</strong> to explore careers that may suit you.",
      iconAssetPath: `${exploreIconFolder}/explore_icon_1.png`,
      iconAlt: "Career Assessment icon"
    },
    {
      id: "consultation",
      title: "1:1 Consultations",
      descriptionHtml:
        "Meet with a <strong>Career Consultant</strong> to discuss your <strong>interests</strong>, <strong>goals</strong>, and possible <strong>career pathways</strong>.",
      iconAssetPath: `${exploreIconFolder}/explore_icon_2.png`,
      iconAlt: "1:1 Consultations icon"
    },
    {
      id: "cv-consults",
      title: "CV Consults",
      descriptionHtml:
        "Get support to <strong>create</strong> or <strong>improve</strong> your CV for future opportunities.",
      iconAssetPath: `${exploreIconFolder}/explore_icon_3.png`,
      iconAlt: "CV Consults icon"
    },
    {
      id: "career-online-portal",
      title: "Career Online Portal",
      descriptionHtml:
        "Explore <strong>job opportunities</strong> &amp; <strong>AI Career Development tools</strong> through RMIT's online career platform.",
      iconAssetPath: `${exploreIconFolder}/explore_icon_4.png`,
      iconAlt: "Career Online Portal icon"
    },
    {
      id: "career-starter-pack",
      title: "How to get Career Ready",
      descriptionHtml:
        "Learn the <strong>fundamentals</strong> of career <strong>planning</strong>, developing <strong>skills</strong> and <strong>experience</strong> to <strong>get ready</strong> for <strong>future opportunities</strong>.",
      iconAssetPath: `${exploreIconFolder}/explore_icon_5.png`,
      iconAlt: "How to get Career Ready icon"
    },
    {
      id: "volunteer-program",
      title: "Volunteer Program",
      descriptionHtml:
        "Build <strong>experience</strong> and <strong>transferable skills</strong> while contributing to meaningful community and school projects.",
      iconAssetPath: `${exploreIconFolder}/explore_icon_6.png`,
      iconAlt: "Volunteer Program icon"
    },
    {
      id: "career-ready-award",
      title: "Career Ready Award",
      descriptionHtml:
        "A <strong>guided program</strong> designed by the Careers team to help you build <strong>essential skills</strong>, <strong>gain experience</strong>, and <strong>become career ready</strong>.",
      iconAssetPath: `${exploreIconFolder}/explore_icon_7.png`,
      iconAlt: "Career Ready Award icon",
      ctaLabel: "Join now >",
      featured: true
    }
  ],
  develop: [
    {
      id: "job-search-strategy",
      title: "Job Search Strategy Workshop",
      descriptionHtml:
        "Learn <strong>strategies</strong> to search for jobs, find opportunities, and improve your applications.",
      iconAssetPath: `${developIconFolder}/develop_icon_1.png`,
      iconAlt: "Job Search Strategy Workshop icon"
    },
    {
      id: "internship-preparation",
      title: "Internship Preparation Workshop",
      descriptionHtml:
        "Get ready for internships by <strong>learning important expectations</strong>, <strong>practical application tips</strong>, and the <strong>workplace skills</strong> you'll need to succeed.",
      iconAssetPath: `${developIconFolder}/develop_icon_2.png`,
      iconAlt: "Internship Preparation Workshop icon"
    },
    {
      id: "internship-enhancement",
      title: "Internship Enhancement Workshop",
      descriptionHtml:
        "Develop <strong>interns' employability skills</strong> to support <strong>workplace adaptation</strong> and <strong>effective contribution</strong>.",
      iconAssetPath: `${developIconFolder}/develop_icon_3.png`,
      iconAlt: "Internship Enhancement Workshop icon"
    },
    {
      id: "linkedin-leap",
      title: "LinkedIn Leap",
      descriptionHtml:
        "A <strong>video series produced</strong> by the <strong>Careers team</strong> guiding you to <strong>build a professional LinkedIn profile</strong>.",
      iconAssetPath: `${developIconFolder}/develop_icon_4.png`,
      iconAlt: "LinkedIn Leap icon",
      iconScale: 1.36
    },
    {
      id: "become-club-leader",
      title: "Become A Club Leader",
      descriptionHtml:
        "Develop <strong>leadership</strong>, <strong>teamwork</strong>, and <strong>communication skills</strong> by <strong>leading</strong> or <strong>managing</strong> student club activities.",
      iconAssetPath: `${developIconFolder}/develop_icon_5.png`,
      iconAlt: "Become A Club Leader icon",
      iconScale: 1.34
    },
    {
      id: "join-competition",
      title: "Join Competition",
      descriptionHtml:
        "Apply your knowledge in <strong>real-world challenges</strong> and competitions while building <strong>teamwork</strong> and <strong>problem-solving skills</strong>.",
      iconAssetPath: `${developIconFolder}/develop_icon_6.png`,
      iconAlt: "Join Competition icon",
      iconScale: 1.34
    },
    {
      id: "employer-group-mentoring",
      title: "Employer Group Mentoring",
      descriptionHtml:
        "Connect with <strong>industry professionals</strong> for <strong>career advice</strong>, <strong>insights</strong>, and <strong>guidance</strong> on your career journey.",
      iconAssetPath: `${developIconFolder}/develop_icon_7.png`,
      iconAlt: "Employer Group Mentoring icon",
      iconScale: 1.36
    },
    {
      id: "career-ready-hub-drop-in",
      title: "Career Ready Hub Drop-in",
      descriptionHtml:
        "Drop in to get <strong>quick support</strong> from <strong>Career Ready Assistants</strong> on <strong>CVs</strong>, <strong>job applications</strong>, or <strong>career-related questions</strong>.",
      iconAssetPath: `${developIconFolder}/develop_icon_8.png`,
      iconAlt: "Career Ready Hub Drop-in icon",
      iconScale: 1.38
    },
    {
      id: "company-visit",
      title: "Company Visit",
      descriptionHtml:
        "Visit companies to learn about <strong>workplace environments</strong>, <strong>industry practices</strong>, and potential <strong>career opportunities</strong>.",
      iconAssetPath: `${developIconFolder}/develop_icon_9.png`,
      iconAlt: "Company Visit icon",
      iconScale: 1.34
    },
    {
      id: "wil-industry-challenge-projects",
      title: "In-Class Projects",
      descriptionHtml:
        "Develop <strong>skills</strong> through <strong>practical projects</strong> or <strong>course assignments</strong>.",
      iconAssetPath: `${developIconFolder}/develop_icon_10.png`,
      iconAlt: "In-Class Projects icon",
      iconScale: 1.42
    },
    {
      id: "global-experience-virtual-internships",
      title: "Global Experience / Virtual Internships",
      descriptionHtml:
        "Gain <strong>international exposure</strong> through <strong>virtual internships</strong>, <strong>study abroad</strong> or <strong>projects</strong> with <strong>global organizations</strong>.",
      iconAssetPath: `${developIconFolder}/develop_icon_11.png`,
      iconAlt: "Global Experience / Virtual Internships icon",
      iconScale: 1.4
    }
  ],
  transition: [
    {
      id: "application-101",
      title: "Application 101",
      descriptionHtml:
        "This <strong>video series</strong>, created with <strong>Synthesia</strong>, an <strong>AI-powered video platform</strong>, guides you through <strong>CV writing</strong>, <strong>cover letters</strong>, and <strong>confident interviewing</strong>.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_1.png`,
      iconAlt: "Application 101 icon",
      iconScale: 1.42
    },
    {
      id: "cv360",
      title: "CV360",
      descriptionHtml:
        "Receive <strong>automated feedback</strong> on your CV to <strong>improve structure</strong>, <strong>clarity</strong>, and impact on job applications.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_2.png`,
      iconAlt: "CV360 icon",
      iconScale: 1.42
    },
    {
      id: "interview360",
      title: "Interview360",
      descriptionHtml:
        "Practice interviews and receive feedback to improve your responses, confidence, and readiness for employers.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_3.png`,
      iconAlt: "Interview360 icon"
    },
    {
      id: "meet-your-employer",
      title: "Meet your Employer",
      descriptionHtml:
        "Engage directly with <strong>employers</strong> to <strong>discover</strong> their <strong>company culture</strong>, <strong>understand expectations</strong>, and <strong>explore exciting career opportunities</strong>.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_4.png`,
      iconAlt: "Meet your Employer icon"
    },
    {
      id: "careers-festival",
      title: "Careers Festival",
      descriptionHtml:
        "Connect with a <strong>variety of employers</strong>, <strong>uncover new career opportunities</strong>, and <strong>grow</strong> your <strong>professional network</strong> at this <strong>dynamic career event</strong>.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_5.png`,
      iconAlt: "Careers Festival icon",
      iconScale: 1.42
    },
    {
      id: "skillboost-101",
      title: "Skillboost 101",
      descriptionHtml:
        "This <strong>video series</strong>, created using <strong>Synthesia</strong>, an <strong>AI-powered tool</strong>, helps you <strong>level up essential skills</strong>: <strong>teamwork</strong>, <strong>leadership</strong>, <strong>presentation</strong>, and more.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_6.png`,
      iconAlt: "Skillboost 101 icon",
      iconScale: 1.42
    },
    {
      id: "employability-skills-workshop",
      title: "Employability Skills Workshop",
      descriptionHtml:
        "Learn <strong>skills</strong> like <strong>communication</strong>, <strong>teamwork</strong>, <strong>problem-solving</strong> that employers value.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_7.png`,
      iconAlt: "Employability Skills Workshop icon",
      iconScale: 1.42
    },
    {
      id: "alumni-mentoring",
      title: "Alumni Mentoring",
      descriptionHtml:
        "Connect with <strong>RMIT alumni</strong> to gain <strong>career advice</strong>, <strong>industry insights</strong>, and guidance for your professional journey.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_8.png`,
      iconAlt: "Alumni Mentoring icon",
      iconScale: 1.42
    },
    {
      id: "personal-branding-workshops",
      title: "Personal Branding Workshops",
      descriptionHtml:
        "Figure out <strong>your unique value</strong>, turn it into a <strong>clear personal brand</strong>, present it confidently on your <strong>CV</strong>, <strong>LinkedIn</strong>, and when <strong>networking</strong>.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_9.png`,
      iconAlt: "Personal Branding Workshops icon",
      iconScale: 1.42
    },
    {
      id: "future-ready-workshops",
      title: "Future Ready Workshops",
      descriptionHtml:
        "Prepare for the <strong>future workplace</strong> by developing <strong>adaptability</strong>, <strong>career planning</strong>, and <strong>professional growth strategies</strong>.",
      iconAssetPath: `${transitionIconFolder}/transition_icon_10.png`,
      iconAlt: "Future Ready Workshops icon"
    }
  ]
};

export const stageActivityScreens = {
  explore: {
    label: "Explore",
    backLabel: "Back",
    scoreShape: "triangle",
    titleTone: "dark",
    ribbonTone: "red",
    contentWidth: 346,
    nextStage: "develop",
    sections: [
      {
        id: "understand-yourself",
        title: "\"I want to understand myself better\"",
        tone: "red",
        activityIds: ["career-assessment", "consultation", "cv-consults"]
      },
      {
        id: "explore-options",
        title: "\"I want to explore career options\"",
        tone: "red",
        activityIds: ["career-online-portal", "career-starter-pack", "volunteer-program"]
      },
      {
        id: "course-level-up",
        title: "\"I want to level up with this course!\"",
        tone: "red",
        activityIds: ["career-ready-award"]
      }
    ]
  },
  develop: {
    label: "Develop",
    backLabel: "Back",
    scoreShape: "pill",
    titleTone: "light",
    ribbonTone: "yellow",
    contentWidth: 347,
    nextStage: "transition",
    sections: [
      {
        id: "internships",
        title: "\"I want to prepare for my internships\"",
        tone: "yellow",
        activityIds: [
          "job-search-strategy",
          "internship-preparation",
          "internship-enhancement"
        ]
      },
      {
        id: "profile",
        title: "\"I want to boost my profile\"",
        tone: "yellow",
        activityIds: ["linkedin-leap", "become-club-leader", "join-competition"]
      },
      {
        id: "guidance",
        title: "\"I want expert guidance\"",
        tone: "yellow",
        activityIds: [
          "employer-group-mentoring",
          "career-ready-hub-drop-in",
          "company-visit"
        ]
      },
      {
        id: "experience",
        title: "\"I want real experience\"",
        tone: "yellow",
        activityIds: [
          "wil-industry-challenge-projects",
          "global-experience-virtual-internships"
        ]
      }
    ]
  },
  transition: {
    label: "Transition",
    backLabel: "Back",
    scoreShape: "circle",
    titleTone: "light",
    ribbonTone: "red",
    contentWidth: 368,
    nextStage: null,
    sections: [
      {
        id: "applications",
        title: "\"I want to prepare for job applications\"",
        tone: "red",
        activityIds: ["application-101", "cv360", "interview360"]
      },
      {
        id: "employers",
        title: "\"I want to connect with employers\"",
        tone: "red",
        activityIds: ["meet-your-employer", "careers-festival"]
      },
      {
        id: "skills",
        title: "\"I want to grow skills\"",
        tone: "red",
        activityIds: ["skillboost-101", "employability-skills-workshop"]
      },
      {
        id: "support",
        title: "\"I want support before I start my career\"",
        tone: "red",
        activityIds: [
          "alumni-mentoring",
          "personal-branding-workshops",
          "future-ready-workshops"
        ]
      }
    ]
  }
};

export function getStageActivityAssetPaths(stageKeys = null) {
  const resolvedStageKeys = Array.isArray(stageKeys)
    ? stageKeys.filter((stageKey) => activities[stageKey])
    : (typeof stageKeys === "string" && activities[stageKeys]
      ? [stageKeys]
      : Object.keys(activities));
  const includeExploreScore = resolvedStageKeys.includes("explore");

  return [
    ...new Set(
      [
        ...(includeExploreScore ? [exploreScoreAssetPath] : []),
        ...resolvedStageKeys.flatMap((stageKey) =>
          activities[stageKey]
            .map((activity) => activity.iconAssetPath)
            .filter(Boolean)
        )
      ]
    )
  ];
}
