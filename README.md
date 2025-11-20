# TikTok Video Downloader Pro

A modern, full‑featured React + Node app to download TikTok videos — with or without watermark — using a FREE backend (tikwm.com) or RapidAPI. Includes batch downloads, history, stats, themes, and a polished UX.


## Highlights
- No‑watermark and HD downloads (when available)
- Free backend out of the box (no API key required)
- Optional RapidAPI integration
- Batch downloads, history, favorites, and stats
- Responsive UI with dark/light theme and keyboard shortcuts
- Friendly error handling and demo mode for quick testing


## Architecture
- Frontend: React 18 (Create React App), Zustand store, Framer Motion, React Hot Toast
- Backend: Express + Axios proxy to tikwm.com
- Local Dev: Client on port 3000, Server on port 5000 (CRA proxy enabled)


## Prerequisites
- Node.js 16+ (18+ recommended)
- npm (or yarn)


## Quick Start
1) Install dependencies

```bash
npm install
```

2) Start everything (client + server)

```bash
npm run dev
```
- Client: http://localhost:3000
- API:    http://localhost:5000

Alternatively, run separately:

```bash
npm start         # React dev server
npm run server    # Express backend
```


## Environment Variables
Create a .env (copy from .env.example) to configure optional values.

Frontend (React):
- REACT_APP_API_URL: Override backend base URL. Defaults to http://localhost:5000/api
- REACT_APP_RAPIDAPI_KEY: If set, the app will prefer RapidAPI for video info.

Backend:
- PORT: Defaults to 5000

Note: You generally don’t need any API keys to use the built‑in FREE backend.


## Using the App
1) Copy a TikTok share link
2) Paste it into the input field
3) Click Download
4) Choose No Watermark or HD when available

Batch downloads: paste multiple links (one per line) into the Batch tab, then start.


## API Endpoints (Backend)
Base: http://localhost:5000

- POST /api/video-info
  - Body: { url: string }
  - Returns: normalized video metadata and download URLs
  - Notes: Uses tikwm.com behind the scenes

- POST /api/batch-download
  - Body: { urls: string[] }
  - Returns: list of results per URL with either data or error

- GET /api/health
  - Returns simple health status


## How Downloads Work
The backend maps TikWM fields as follows:
- play → No watermark
- wmplay → With watermark
- hdplay → HD (no watermark) when available

Client buttons use these fields to provide the correct link.


## Demo Mode
If the backend is not reachable, the app falls back to a safe demo mode. You can explore the UI and flows without any API keys. Real downloads require the backend to be running or a valid RapidAPI key.


## Troubleshooting
- npm run dev fails
  - Ensure dev dependency "concurrently" is installed (it is in this repo) and run `npm install` first.

- CORS or network errors
  - Start the backend (`npm run server`). CRA proxy is already configured in package.json.
  - If hosting frontend separately, set REACT_APP_API_URL to the backend URL.

- No Watermark returns the wrong file
  - Fixed: server maps tikwm fields correctly (play = no watermark; wmplay = watermark; hdplay = HD).

- RapidAPI errors
  - Verify REACT_APP_RAPIDAPI_KEY and plan limits; otherwise rely on the free backend.


## Production Build
```bash
npm run build
```
Outputs optimized assets to the build/ directory. Deploy to Vercel, Netlify, static hosts, or any SPA‑friendly hosting.

See DEPLOYMENT.md for step‑by‑step guides (Vercel/Netlify, service worker, caching, and common pitfalls).


## Security, Privacy, and Legal
- This tool is intended for personal use. Respect creators’ rights.
- Review TikTok’s Terms of Service and applicable local laws before downloading.
- Avoid commercial usage without permission. Always credit original creators where appropriate.


## Roadmap
- Enhanced batch normalization with progress status
- Offline/download queue improvements
- Add optional user profile video listing endpoint


## Contributing
PRs and issues are welcome! For larger changes, please open an issue to discuss the approach before submitting a PR.


## License
MIT — see LICENSE if present. If not, treat this as MIT for personal/educational use.
