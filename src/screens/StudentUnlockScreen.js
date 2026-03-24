import { renderSegmentBar } from "../components/SegmentBar.js";
import { renderTopBar } from "../components/TopBar.js";

const studentCoachAssetPath = "./src/assets/student/Student-coach.png";
const studentStarsAssetPath = "./src/assets/student/Student-1.png";
const studentSparklesAssetPath = "./src/assets/student/Student-2.png";
const studentClipAssetPath = "./src/assets/student/Student-3.png";

function escapeAttribute(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function renderStudentUnlockScreen(state) {
  const hasCompleteStudentId = state.studentIdDraft.length === 7;

  return `
    <section class="screen screen--student-unlock grid-bg bg-transition">
      ${renderTopBar(state, { showAvatar: true })}
      <div class="student-unlock-viewport">
        <div class="student-unlock">
          <form class="student-unlock__stage" data-form="student-unlock">
            <div class="student-unlock__card">
              <div class="student-unlock__card-header">
                ${renderSegmentBar(state)}
              </div>
              <div class="student-unlock__clip" aria-hidden="true">
                <img
                  class="student-unlock__clip-image"
                  src="${studentClipAssetPath}"
                  alt=""
                  decoding="async"
                  loading="eager"
                  draggable="false"
                >
              </div>
              <h1 class="student-unlock__title">
                <span class="student-unlock__title-line">Unlock Your</span>
                <span class="student-unlock__title-line accent">Career Roadmap</span>
              </h1>
              <p class="student-unlock__prompt">Please enter your student number</p>
              <div class="student-unlock__field">
                <label class="sr-only" for="student-id-input">Student number</label>
                <div class="student-unlock__input-wrap">
                  <span class="student-unlock__prefix" aria-hidden="true">S</span>
                  <input
                    id="student-id-input"
                    class="student-unlock__input"
                    type="text"
                    inputmode="numeric"
                    autocomplete="off"
                    placeholder="1234567"
                    value="${escapeAttribute(state.studentIdDraft)}"
                    maxlength="7"
                    data-input="student-id"
                    aria-describedby="student-id-hint"
                  >
                </div>
                <span class="student-unlock__input-line" aria-hidden="true"></span>
              </div>
              <p class="student-unlock__hint" id="student-id-hint">Numbers only, 7 digits after S.</p>
              <p
                class="student-unlock__status"
                data-student-unlock-status
                role="status"
                aria-live="polite"
              ></p>
              <input
                class="student-unlock__trap"
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
                data-student-unlock-trap
                aria-hidden="true"
              >
              <div class="student-unlock__sparkles" aria-hidden="true">
                <img
                  class="student-unlock__sparkles-image"
                  src="${studentSparklesAssetPath}"
                  alt=""
                  decoding="async"
                  loading="eager"
                  draggable="false"
                >
              </div>
            </div>
            <button
              class="student-unlock__bubble ${hasCompleteStudentId ? "" : "is-hidden"}"
              type="submit"
              ${hasCompleteStudentId ? "" : "disabled"}
              aria-hidden="${hasCompleteStudentId ? "false" : "true"}"
            >
              <span>Let's see you</span>
            </button>
          </form>
          <div class="student-unlock__stars" aria-hidden="true">
            <img
              class="student-unlock__stars-image"
              src="${studentStarsAssetPath}"
              alt=""
              decoding="async"
              loading="eager"
              draggable="false"
            >
          </div>
          <div class="student-unlock__figure" aria-hidden="true">
            <img
              class="student-unlock__coach-image"
              src="${studentCoachAssetPath}"
              alt=""
              decoding="async"
              loading="eager"
              draggable="false"
            >
          </div>
        </div>
      </div>
    </section>
  `;
}
