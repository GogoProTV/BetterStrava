# Strava Analytics

Dashboard d'analyse de tes activités Strava avec IA intégrée.

---

## 🚀 Mise en route (10 minutes)

### 1. Créer ton app Strava

1. Va sur **https://www.strava.com/settings/api**
2. Remplis le formulaire :
   - **Application Name** : Strava Analytics (ou ce que tu veux)
   - **Category** : Data Importer
   - **Club** : (laisse vide)
   - **Website** : `https://ton-projet.netlify.app` (tu le sauras après le déploiement)
   - **Authorization Callback Domain** : `ton-projet.netlify.app`
3. Note ton **Client ID** et ton **Client Secret**

---

### 2. Déployer sur Netlify (gratuit)

1. Va sur **https://app.netlify.com** → "Add new site" → "Import an existing project"
2. Connecte ton GitHub et pousse ce projet, ou glisse-dépose le dossier
3. Dans **Site configuration → Environment variables**, ajoute :
   ```
   STRAVA_CLIENT_ID     = ton_client_id
   STRAVA_CLIENT_SECRET = ton_client_secret
   ```
4. Note l'URL de ton site (ex: `https://random-name-123.netlify.app`)

---

### 3. Configurer l'app dans le code

Dans `public/index.html`, ligne ~130, remplace :
```js
const CLIENT_ID = 'TON_CLIENT_ID';
```
par ton vrai Client ID (juste l'ID, pas le secret).

Et mets à jour l'URL dans ton app Strava :
- **Website** : ton URL Netlify
- **Authorization Callback Domain** : `ton-projet.netlify.app`

---

### 4. Tester en local (optionnel)

```bash
npm install
# Crée un fichier .env à la racine :
# STRAVA_CLIENT_ID=xxxxx
# STRAVA_CLIENT_SECRET=xxxxx
npm run dev
# → http://localhost:8888
```

---

## 📁 Structure

```
strava-app/
├── public/
│   └── index.html          ← Frontend complet (HTML/CSS/JS)
├── netlify/
│   └── functions/
│       ├── exchange-token.js  ← Échange code OAuth → token (sécurisé)
│       └── strava-api.js      ← Proxy API Strava (évite les CORS)
├── netlify.toml            ← Config Netlify
└── package.json
```

## 🔒 Sécurité

Le `client_secret` n'est **jamais** exposé côté navigateur.
Il ne vit que dans les variables d'environnement Netlify et dans les fonctions serverless.
