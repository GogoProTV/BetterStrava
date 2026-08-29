// api/strava-api.js
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'Parametre path requis' });

  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Authorization header manquant' });

  try {
    const r = await fetch('https://www.strava.com/api/v3' + path, {
      headers: { Authorization: auth },
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
