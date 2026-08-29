module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { code, refresh_token } = req.query;

  const CLIENT_ID     = process.env.STRAVA_CLIENT_ID || '274766';
  const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET
                     || process.env.STRAVA_SECRET_CLIENT_ID
                     || null;

  if (!CLIENT_SECRET) {
    return res.status(500).json({ error: 'CLIENT_SECRET introuvable' });
  }

  let params;
  if (refresh_token) {
    params = { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'refresh_token', refresh_token };
  } else if (code) {
    params = { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'authorization_code', code };
  } else {
    return res.status(400).json({ error: 'code ou refresh_token requis' });
  }

  try {
    const r = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params).toString(),
    });
    const data = await r.json();
    return res.status(r.ok ? 200 : r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
