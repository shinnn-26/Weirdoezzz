# WEIRDOEZZZ Auditions — Full Stack Frontend

## Run locally

Open PowerShell in this `frontend` folder and run:

```powershell
npm install
npm run dev
```

Then open the Local URL shown by Vite (normally `http://localhost:5173/`).

## Build for production

```powershell
npm run build
npm run preview
```

The project includes `react-router-dom` in both `package.json` and `package-lock.json`, so the routing dependency is installed automatically by `npm install`.


### UI updates
- Removed Email Address, Instagram ID, Team / Group Name, and Dance Style from the public registration form.
- Added a subtle animated layer of floating dance/music emojis across the page.
- Preserved the existing visual theme while adding Framer Motion interactions.
