// api/strava-api.js
// Proxy vers l'API Strava — transmet le Bearer token du client.
// Usage : /api/strava-api?path=/athlete/activities

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path } = req.query;
  if (!path) {
    return res.status(400).json({ error: 'Paramètre path requis' });
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header manquant' });
  }

  try {
    const url = 'https://www.strava.com/api/v3' + path;
    const response = await fetch(url, {
      headers: { Authorization: authHeader },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
