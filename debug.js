// api/debug.js — A SUPPRIMER après diagnostic
module.exports = function handler(req, res) {
  res.status(200).json({
    has_client_id:     !!process.env.STRAVA_CLIENT_ID,
    has_client_secret: !!process.env.STRAVA_CLIENT_SECRET,
    client_id_value:   process.env.STRAVA_CLIENT_ID || 'NON DEFINI',
    node_env:          process.env.NODE_ENV || 'non défini',
    all_keys:          Object.keys(process.env).filter(k => k.startsWith('STRAVA')),
  });
};
