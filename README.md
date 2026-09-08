# Strava Analytics

Strava but better

## Onglet Coach — configuration Vercel

L'onglet **Coach** fonctionne en deux temps :

1. **Planificateur déterministe** — génère la semaine à partir de la CTL/ATL/TSB,
   des semaines restantes avant la course et de la disponibilité saisie. Aucune
   configuration requise, fonctionne hors-ligne.
2. **Coach IA** (`/api/coach`) — un LLM (Google Gemini) qui discute avec l'athlète
   et peut réécrire le plan. Le plan renvoyé par l'IA écrase celui du déterministe.

### Variables d'environnement (Project Settings → Environment Variables)

| Variable | Requis | Rôle |
|---|---|---|
| `GEMINI_API_KEY` | oui | Clé [Google AI Studio](https://aistudio.google.com/apikey) — tier gratuit, sans carte |
| `COACH_DAILY_LIMIT` | non | Nombre d'analyses/jour par profil (défaut : 100) |
| `KV_REST_API_URL` + `KV_REST_API_TOKEN` | non | Vercel KV — quota réellement imposé côté serveur |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | non | alternative à Vercel KV |

Sans store KV, la limite retombe sur un compteur en mémoire (remis à zéro à
chaque démarrage à froid) doublé d'un compteur `localStorage` côté navigateur.
Pour une limite stricte par jour et par profil, ajouter un store **Vercel KV**
(onglet Storage du projet) : les variables `KV_REST_API_*` sont injectées
automatiquement.

Le « profil » est identifié par l'ID athlète Strava (ou un identifiant aléatoire
stocké en local si l'athlète n'est pas connecté).
