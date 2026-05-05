const PRODUCTION_UNLOCK_API_ENDPOINT =
  "https://career-ready-rmit-roadmap.vercel.app/api/unlock";

function parseBooleanFlag(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (["1", "true", "yes", "on"].includes(normalizedValue)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(normalizedValue)) {
    return false;
  }

  return null;
}

function detectLocalRuntime() {
  if (typeof window === "undefined") {
    return false;
  }

  const { protocol, hostname } = window.location;

  return (
    protocol === "file:" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  );
}

function readRuntimeOverrides() {
  if (typeof window === "undefined") {
    return {};
  }

  const metaUnlockApiEndpoint = window.document
    ?.querySelector?.('meta[name="career-ready-unlock-api"]')
    ?.getAttribute("content");

  return {
    ...(window.__CAREER_READY_ENV__ || {}),
    ...(metaUnlockApiEndpoint ? { unlockApiEndpoint: metaUnlockApiEndpoint } : {})
  };
}

function normalizeEndpoint(value, fallback) {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmedValue = value.trim();

  return trimmedValue || fallback;
}

export const isLocalRuntime = detectLocalRuntime();

export const isUnlockSubmissionBypassed = (() => {
  const override = parseBooleanFlag(readRuntimeOverrides().bypassUnlockSubmission);

  return override ?? isLocalRuntime;
})();

export const unlockApiEndpoint = normalizeEndpoint(
  readRuntimeOverrides().unlockApiEndpoint,
  isLocalRuntime ? "/api/unlock" : PRODUCTION_UNLOCK_API_ENDPOINT
);
