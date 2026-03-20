import { renderCoach } from "../components/Coach.js";
import { renderSegmentBar } from "../components/SegmentBar.js";
import { renderTopBar } from "../components/TopBar.js";

function escapeAttribute(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function renderStudentUnlockScreen(state) {
  return `
    <section class="screen screen--student-unlock grid-bg bg-transition">
      ${renderTopBar(state, { showAvatar: true })}
      <div class="student-unlock">
        <form class="student-unlock__stage" data-form="student-unlock">
          <div class="student-unlock__card">
            <div class="student-unlock__card-header">
              ${renderSegmentBar(state)}
            </div>
            <div class="student-unlock__clip" aria-hidden="true">
              <span></span>
            </div>
            <h1 class="student-unlock__title">
              <span class="student-unlock__title-line">Unlock Your</span>
              <span class="student-unlock__title-line accent">Career Roadmap</span>
            </h1>
            <div class="student-unlock__field">
              <label class="sr-only" for="student-id-input">Student ID</label>
              <input
                id="student-id-input"
                class="student-unlock__input"
                type="text"
                inputmode="numeric"
                autocomplete="off"
                placeholder="Enter your Student ID"
                value="${escapeAttribute(state.studentIdDraft)}"
                data-input="student-id"
              >
              <span class="student-unlock__input-line" aria-hidden="true"></span>
            </div>
            <div class="student-unlock__sparkles" aria-hidden="true">
              <span class="student-unlock__spark student-unlock__spark--large"></span>
              <span class="student-unlock__spark student-unlock__spark--dot"></span>
              <span class="student-unlock__spark student-unlock__spark--diamond"></span>
            </div>
          </div>
          <button class="student-unlock__bubble" type="submit">
            Please enter your Student ID to see your career roadmap.
          </button>
        </form>
        <div class="student-unlock__hearts" aria-hidden="true">
          <span class="student-unlock__heart"></span>
          <span class="student-unlock__heart"></span>
          <span class="student-unlock__heart"></span>
        </div>
        <div class="student-unlock__stars" aria-hidden="true">
          <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        </div>
        <div class="student-unlock__figure">
          ${renderCoach()}
        </div>
      </div>
    </section>
  `;
}
