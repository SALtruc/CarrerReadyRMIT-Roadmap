const QUESTION_IDS_BY_STAGE = {
  explore: ["explore-1", "explore-2", "explore-3"],
  develop: ["develop-1", "develop-2", "develop-3"],
  transition: ["transition-1", "transition-2", "transition-3"]
};

const MAX_BODY_LENGTH = 20000;
const STUDENT_ID_PATTERN = /^[A-Za-z0-9]{6,12}$/;

function json(res, status, body) {
  return res.status(status).json(body);
}

async function parseRequestBody(req) {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "string") {
    return req.body ? JSON.parse(req.body) : {};
  }

  if (Buffer.isBuffer(req.body)) {
    return req.body.length > 0 ? JSON.parse(req.body.toString("utf8")) : {};
  }

  if (typeof req.body === "object") {
    return req.body;
  }

  return {};
}

function readRemoteIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const value = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;

  return typeof value === "string"
    ? value.split(",")[0].trim()
    : "";
}

function isValidStudentId(studentId) {
  return STUDENT_ID_PATTERN.test(studentId);
}

function sanitizeAnswers(answers) {
  if (!answers || typeof answers !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(answers).filter(
      ([questionId, answer]) =>
        typeof questionId === "string" &&
        Object.values(QUESTION_IDS_BY_STAGE).some((ids) => ids.includes(questionId)) &&
        typeof answer === "boolean"
    )
  );
}

function getStageScore(answers, stage) {
  return QUESTION_IDS_BY_STAGE[stage].reduce(
    (score, questionId) => score + (answers[questionId] === true ? 33 : 0),
    0
  );
}

async function verifyTurnstileToken(token, remoteIp) {
  const formData = new URLSearchParams();
  formData.set("secret", process.env.TURNSTILE_SECRET_KEY || "");
  formData.set("response", token);

  if (remoteIp) {
    formData.set("remoteip", remoteIp);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    }
  );

  const result = await response.json();

  return {
    ok: Boolean(response.ok && result.success),
    codes: Array.isArray(result["error-codes"]) ? result["error-codes"] : []
  };
}

async function appendUnlockRow(payload) {
  const response = await fetch(process.env.APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...payload,
      secret: process.env.APPS_SCRIPT_SECRET
    })
  });

  const rawText = await response.text();
  let result = {};

  try {
    result = rawText ? JSON.parse(rawText) : {};
  } catch (error) {
    result = {
      ok: false,
      error: "invalid_apps_script_response"
    };
  }

  return {
    ok: Boolean(response.ok && result.ok),
    error: result.error || null
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, {
      ok: false,
      error: "method_not_allowed",
      message: "Unsupported request method."
    });
  }

  if (!process.env.APPS_SCRIPT_URL || !process.env.APPS_SCRIPT_SECRET) {
    return json(res, 500, {
      ok: false,
      error: "missing_apps_script_config",
      message: "Missing Google Apps Script configuration."
    });
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    return json(res, 500, {
      ok: false,
      error: "missing_turnstile_secret",
      message: "Missing Turnstile configuration."
    });
  }

  try {
    const requestBody = await parseRequestBody(req);
    const serializedBody = JSON.stringify(requestBody);

    if (serializedBody.length > MAX_BODY_LENGTH) {
      return json(res, 413, {
        ok: false,
        error: "payload_too_large",
        message: "Submitted payload is too large."
      });
    }

    const studentId = String(requestBody.studentId || "").trim();
    const roadmapVariant = requestBody.roadmapVariant === "premade"
      ? "premade"
      : "custom";
    const turnstileToken = String(requestBody.turnstileToken || "").trim();
    const honeypot = String(requestBody.website || "").trim();
    const answers = sanitizeAnswers(requestBody.answers);

    if (honeypot) {
      return json(res, 400, {
        ok: false,
        error: "bot_detected",
        message: "Bot submission rejected."
      });
    }

    if (!isValidStudentId(studentId)) {
      return json(res, 400, {
        ok: false,
        error: "invalid_student_id",
        message: "Please enter a valid Student ID."
      });
    }

    if (!turnstileToken) {
      return json(res, 400, {
        ok: false,
        error: "missing_turnstile_token",
        message: "Please complete the security check."
      });
    }

    const verification = await verifyTurnstileToken(turnstileToken, readRemoteIp(req));

    if (!verification.ok) {
      return json(res, 400, {
        ok: false,
        error: "turnstile_verification_failed",
        message: "Security check failed. Please try again."
      });
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      studentId,
      roadmapVariant,
      hasUnlockedRoadmap: true,
      exploreScore: getStageScore(answers, "explore"),
      developScore: getStageScore(answers, "develop"),
      transitionScore: getStageScore(answers, "transition")
    };

    const appendResult = await appendUnlockRow(payload);

    if (!appendResult.ok) {
      return json(res, 502, {
        ok: false,
        error: appendResult.error || "apps_script_failed",
        message: "We couldn't save your roadmap right now. Please try again."
      });
    }

    return json(res, 200, {
      ok: true
    });
  } catch (error) {
    console.error("Unlock submission failed", error);

    return json(res, 500, {
      ok: false,
      error: "unlock_submission_failed",
      message: "We couldn't save your roadmap right now. Please try again."
    });
  }
};
