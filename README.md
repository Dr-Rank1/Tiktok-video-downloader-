# TikTok Video Downloader Pro

A modern, full-featured React and Node.js application designed to download TikTok videos with or without watermarks. The application utilizes a robust backend (tikwm.com) alongside optional RapidAPI integration for a complete feature set. It includes batch download capabilities, download history, detailed statistics, customizable themes, and a highly polished user experience.

Developed by Ian Gicheha Mbae / Dr-Rank1.

## Key Features

- **High Definition Downloads:** Access HD videos without watermarks whenever available.
- **Cost-Free Backend Integration:** Works out of the box with a free backend, requiring no API key for core functionality.
- **RapidAPI Support:** Optional RapidAPI integration for advanced video metadata retrieval.
- **Batch Processing:** Download multiple videos concurrently by pasting a list of URLs.
- **History and Statistics:** Track your download history, mark favorites, and view usage statistics over time.
- **Responsive Design:** Fully responsive user interface featuring dark and light modes, along with convenient keyboard shortcuts.
- **Graceful Error Handling:** Provides clear user feedback and includes a demo mode for quick testing and exploration without backend dependency.

## System Architecture

- **Frontend:** Built with React 18 using Create React App. State management powered by Zustand. Animations handled by Framer Motion, and notifications by React Hot Toast.
- **Backend:** Node.js Express server utilizing Axios as a proxy to interact securely with tikwm.com.
- **Development Environment:** Client runs on port 3000, while the Server runs on port 5000 (Create React App proxy is pre-configured).

## System Requirements

- Node.js version 16 or higher (version 18 or higher is recommended)
- npm or yarn package manager

## Quick Start Guide

1. **Install Dependencies**

   Navigate to the project root and install the required packages:

   ```bash
   npm install
   ```

2. **Start the Application**

   Run both the client and server concurrently:

   ```bash
   npm run dev
   ```

   The application will be accessible at:
   - Frontend Client: http://localhost:3000
   - Backend API: http://localhost:5000

   Alternatively, you can run the services separately:

   ```bash
   npm start         # Starts the React development server
   npm run server    # Starts the Express backend
   ```

## Environment Configuration

Create a `.env` file in the root directory (you can copy from `.env.example`) to configure optional environment variables.

**Frontend Configuration (React):**
- `REACT_APP_API_URL`: Override the backend base URL. Defaults to `http://localhost:5000/api`.
- `REACT_APP_RAPIDAPI_KEY`: If configured, the application will prioritize RapidAPI for fetching video information.

**Backend Configuration:**
- `PORT`: Define the port for the Express server. Defaults to `5000`.

*Note: API keys are generally not required if you are relying on the built-in free backend.*

## Usage Instructions

1. Copy the share link of a TikTok video.
2. Paste the link into the application's input field.
3. Click the Download button.
4. Select your preferred format (No Watermark or HD) from the available options.

For **Batch Downloads**: Navigate to the Batch tab, paste multiple links (ensuring one link per line), and initiate the process.

## API Endpoints (Backend)

Base URL: `http://localhost:5000`

- **POST /api/video-info**
  - Payload: `{ "url": "string" }`
  - Response: Returns normalized video metadata and direct download URLs.
  - Detail: Proxies requests to tikwm.com.

- **POST /api/batch-download**
  - Payload: `{ "urls": ["string"] }`
  - Response: Returns an array of results for each URL, containing either video data or error details.

- **GET /api/health**
  - Response: Returns a simple health check status indicating backend availability.

## Download Mapping Mechanism

The backend intelligently maps fields from TikWM to provide accurate download links:
- `play` maps to the No Watermark version.
- `wmplay` maps to the Watermarked version.
- `hdplay` maps to the High Definition No Watermark version (when available).

The frontend utilizes these mapped fields to generate the correct download buttons.

## Demo Mode

If the backend server is unreachable, the application automatically transitions into a safe demo mode. This allows users to explore the interface, settings, and workflows without requiring any API keys or backend connectivity. Please note that actual video downloads require the backend to be active or a valid RapidAPI key.

## Troubleshooting Guide

- **Command `npm run dev` fails:**
  Ensure the development dependency `concurrently` is installed. Run `npm install` to ensure all packages are present.

- **CORS or Network Errors:**
  Ensure the backend server is running via `npm run server`. The Create React App proxy is already configured in `package.json`. If you are hosting the frontend separately, ensure `REACT_APP_API_URL` points to your backend URL.

- **No Watermark option downloads the wrong file:**
  This issue has been resolved internally. The server accurately maps TikWM fields (`play` = no watermark; `wmplay` = watermark; `hdplay` = HD).

- **RapidAPI Errors:**
  Verify that your `REACT_APP_RAPIDAPI_KEY` is correct and that you have not exceeded your plan limits. If issues persist, the application will fallback to the free backend.

## Production Deployment

To create an optimized production build:

```bash
npm run build
```

This command outputs optimized static assets to the `build/` directory. These assets can be deployed to Vercel, Netlify, static hosting providers, or any SPA-friendly web server.

Refer to `DEPLOYMENT.md` for comprehensive step-by-step guides covering Vercel/Netlify, service workers, caching strategies, and common deployment pitfalls.

## Legal, Privacy, and Security

- This tool is strictly intended for personal and educational use. Please respect the intellectual property rights of creators.
- Review TikTok's Terms of Service and applicable local copyright laws prior to downloading content.
- Avoid commercial use of downloaded content without explicit permission from the original creators. Always provide appropriate credit when utilizing content.

## Future Development Roadmap

- Implementation of advanced batch normalization featuring progress tracking.
- Improvements to offline functionality and the download queue system.
- Addition of an optional endpoint for listing user profile videos.

## Contributing

Contributions are welcome. For substantial modifications, please open an issue first to discuss your proposed changes before submitting a Pull Request.

## Authors and Acknowledgments

- **Ian Gicheha Mbae / Dr-Rank1** - Lead Developer and Maintainer

## License

This project is licensed under the MIT License. See the LICENSE file for details. For personal and educational use, treat this software as MIT-licensed.
