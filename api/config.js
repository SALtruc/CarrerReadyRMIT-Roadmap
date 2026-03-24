module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      ok: false,
      error: "method_not_allowed"
    });
  }

  if (!process.env.TURNSTILE_SITE_KEY) {
    return res.status(500).json({
      ok: false,
      error: "missing_turnstile_site_key"
    });
  }

  res.setHeader("Cache-Control", "no-store");

  return res.status(200).json({
    ok: true,
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY
  });
};
