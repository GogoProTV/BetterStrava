// api/strava-config.js
module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const client_id = process.env.STRAVA_CLIENT_ID;
  if (!client_id) return res.status(500).json({ error: 'STRAVA_CLIENT_ID non defini' });

  return res.status(200).json({ client_id });
};
