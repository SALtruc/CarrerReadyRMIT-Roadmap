# Career Ready Roadmap Draft

This is a lightweight mobile-web prototype built with plain HTML, CSS, and JavaScript.

## Run

Open `index.html` in a browser.

## Local Unlock Bypass

- Frontend automatically bypasses student ID submission when the app runs on `file://`, `localhost`, `127.0.0.1`, or `[::1]`.
- In that local mode, the roadmap can be opened without entering `S` ID, no `/api/unlock` request is sent, and `studentIdDraft` is not persisted in local storage.
- If you run the API locally as well, set `BYPASS_UNLOCK_STORAGE=true` in your env so `/api/unlock` returns `ok` without calling Google Sheets.
- See `.env.example` for the supported API env keys.

## Static WordPress Hosting + Vercel API

When the app is uploaded as static files under WordPress, `/api/unlock` does not exist on the WordPress domain. The frontend uses `https://career-ready-rmit-roadmap.vercel.app/api/unlock` by default, so the static host does not need extra configuration.

Set `ALLOWED_ORIGINS=https://industryhub.rmit.edu.vn` in the Vercel project env so the WordPress page can call the API.

## Files

- `index.html`: app shell that loads the modular app
- `src/main.js`: entry point and action/event wiring
- `src/screens/`: one file per screen
- `src/components/`: one file per reusable UI element
- `src/data/`: avatars, stages, questions, and activity data
- `src/state/`: app state and state-changing actions
- `src/interactions/`: swipe behavior for the question deck
- `src/styles/`: split CSS for base, components, and screen layout
- `src/assets/`: drop real image assets here

## Current Flow

1. Start screen
2. Choose 1 of 8 avatars
3. Answer 9 question cards across 3 stages
4. See the 3-stage roadmap path screen
5. See stage scores on the roadmap overview
6. Open each stage detail screen and pick up to 3 activities

## Logic

- Each stage has 3 questions
- Each "yes" answer adds 33%
- "No" adds 0%
- Users can answer by swipe or by tapping the two round buttons

## Where To Update Later

- Replace question copy in [questions.js](/f:/2026_CarrerReadyRoadmap/src/data/questions.js)
- Replace activities in [activities.js](/f:/2026_CarrerReadyRoadmap/src/data/activities.js)
- Adjust welcome screen in [WelcomeScreen.js](/f:/2026_CarrerReadyRoadmap/src/screens/WelcomeScreen.js)
- Adjust choose-character screen in [ChooseCharacterScreen.js](/f:/2026_CarrerReadyRoadmap/src/screens/ChooseCharacterScreen.js)
- Adjust avatar card UI in [AvatarCard.js](/f:/2026_CarrerReadyRoadmap/src/components/AvatarCard.js)
- Adjust swipe question card UI in [QuestionCard.js](/f:/2026_CarrerReadyRoadmap/src/components/QuestionCard.js) and [setupQuestionSwipe.js](/f:/2026_CarrerReadyRoadmap/src/interactions/setupQuestionSwipe.js)
- To use the real images you sent, place them at:
- `src/assets/welcome-coach.png`
- `src/assets/logo-badge.png`
