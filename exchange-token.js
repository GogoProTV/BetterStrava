// api/exchange-token.js
// Gère deux cas :
//   ?code=xxx          → échange initial du code OAuth
//   ?refresh_token=xxx → renouvellement du token expiré

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { code, refresh_token } = req.query;

  const CLIENT_ID     = process.env.STRAVA_CLIENT_ID;
  const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ error: 'Variables d\'environnement manquantes (STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET)' });
  }

  try {
    let body;

    if (refresh_token) {
      // Renouvellement du token
      body = new URLSearchParams({
        client_id:     CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type:    'refresh_token',
        refresh_token,
      });
    } else if (code) {
      // Échange initial
      body = new URLSearchParams({
        client_id:     CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type:    'authorization_code',
      });
    } else {
      return res.status(400).json({ error: 'Paramètre code ou refresh_token requis' });
    }

    const response = await fetch('https://www.strava.com/oauth/token', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    body.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
