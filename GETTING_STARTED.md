# Getting Started 🚀

Welcome to **TikTok Downloader Pro**! This guide will help you get up and running quickly.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Available Scripts](#available-scripts)
4. [Features Overview](#features-overview)
5. [Configuration](#configuration)
6. [Next Steps](#next-steps)

---

## 🎯 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React 18
- Framer Motion (animations)
- Zustand (state management)
- React Hot Toast (notifications)
- React Icons (UI icons)
- Axios (HTTP client)

### 2. Start the Development Server

```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000)

### 3. Explore Demo Mode

The app starts in **demo mode** - you can:
- ✅ Paste any TikTok URL
- ✅ See the complete UI in action
- ✅ Test all features (history, favorites, stats, settings)
- ✅ Switch between light/dark themes
- ✅ Try batch downloads

**Note:** Actual video downloads require API setup (see [API_SETUP.md](./API_SETUP.md))

---

## 📁 Project Structure

```
tiktok-downloader-pro/
├── public/
│   └── index.html              # HTML template
├── server/
│   └── index.js                # Optional backend server
├── src/
│   ├── components/
│   │   ├── Header.js           # Navigation header
│   │   ├── Header.css
│   │   ├── VideoDownloader.js  # Main download form
│   │   ├── VideoDownloader.css
│   │   ├── VideoPreview.js     # Video preview card
│   │   ├── VideoPreview.css
│   │   ├── BatchDownloader.js  # Batch download interface
│   │   ├── BatchDownloader.css
│   │   ├── DownloadHistory.js  # History page
│   │   ├── DownloadHistory.css
│   │   ├── Stats.js            # Statistics dashboard
│   │   ├── Stats.css
│   │   ├── Settings.js         # Settings panel
│   │   ├── Settings.css
│   │   ├── Features.js         # Features showcase
│   │   └── Features.css
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── store/
│   │   └── useStore.js         # Zustand global state
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.js                  # Main app component
│   ├── App.css                 # App styles
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── README.md                   # Main documentation
├── API_SETUP.md               # API configuration guide
├── FEATURES.md                # Complete features list
└── GETTING_STARTED.md         # This file
```

---

## 🎮 Available Scripts

### Development

```bash
npm start
```
Runs the app in development mode with hot reload.

### Backend Server

```bash
npm run server
```
Starts the optional Node.js backend (requires configuration).

### Build

```bash
npm run build
```
Creates an optimized production build in the `build/` folder.

### Test

```bash
npm test
```
Runs the test suite (if configured).

---

## ✨ Features Overview

### 🏠 Home Tab
- **Video Downloader**: Paste TikTok URLs and download videos
- **Video Preview**: See video details, stats, and download options
- **Features Showcase**: Highlights of main features

### 📦 Batch Tab
- **Batch Downloader**: Add multiple URLs and download them all at once
- **Progress Tracking**: See status of each download in the batch
- **Results Summary**: View successful and failed downloads

### 📚 History Tab
- **Download History**: View all previously downloaded videos (last 50)
- **Search & Filter**: Find videos by username or title
- **Favorites Filter**: Show only favorited videos
- **Re-download**: Download videos again from history

### 📊 Stats Tab
- **Statistics Dashboard**: Total downloads, favorites, size, weekly stats
- **Top Creators**: Leaderboard of most downloaded creators
- **Visual Metrics**: Beautiful stat cards with icons

### ⚙️ Settings Tab
- **Theme Toggle**: Switch between light and dark mode
- **Quality Settings**: Choose default download quality (HD/SD/Low)
- **Auto Download**: Enable automatic downloads
- **Data Management**: Clear all history and settings

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# API Configuration (optional)
RAPIDAPI_KEY=your_key_here
REACT_APP_API_URL=http://localhost:5000/api
```

### Theme Configuration

The app includes two themes that are automatically applied:

**Light Theme:**
- Purple gradient background
- White cards with shadows
- High contrast for readability

**Dark Theme:**
- Dark blue/navy gradient
- Glassmorphism effects
- Soft white text

Change theme in Settings tab or by updating the default in `src/store/useStore.js`:

```javascript
settings: {
  theme: 'dark', // or 'light'
  // ...
}
```

### Quality Settings

Default quality options:
- `hd`: 1080p (best quality)
- `sd`: 720p (balanced)
- `low`: 480p (smaller file size)

---

## 🎨 Customization

### Change Colors

Edit the CSS variables in component files:

**Primary Gradient:**
```css
background: linear-gradient(135deg, #667eea, #764ba2);
```

**Accent Colors:**
- Purple: `#667eea`
- Pink: `#764ba2`
- Green: `#43e97b`
- Red: `#ff4757`

### Modify Animations

All animations use Framer Motion. Adjust in component files:

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

### Update Feature Cards

Edit `src/components/Features.js` to add/modify features:

```javascript
const features = [
  {
    icon: FaYourIcon,
    title: 'Your Feature',
    description: 'Description here',
    color: '#yourcolor',
  },
  // ...
];
```

---

## 📱 Responsive Design

The app is fully responsive with breakpoints at:

- **Mobile**: `< 768px`
  - Single column layouts
  - Simplified navigation
  - Touch-optimized buttons

- **Tablet**: `768px - 1024px`
  - 2-column grids
  - Adjusted spacing

- **Desktop**: `> 1024px`
  - Multi-column layouts
  - Full features enabled
  - Hover effects

---

## 🔄 State Management

### Global State (Zustand)

The app uses Zustand for state management with persistence:

```javascript
import useStore from './store/useStore';

function Component() {
  const { history, addToHistory } = useStore();
  
  // Use state and actions
}
```

### Available State:
- `history` - Download history (array)
- `favorites` - Favorited videos (array)
- `settings` - User settings (object)
- `stats` - Download statistics (object)
- `activeDownloads` - Current downloads (array)

### Available Actions:
- `addToHistory(video)` - Add to history
- `removeFromHistory(id)` - Remove from history
- `clearHistory()` - Clear all history
- `addToFavorites(video)` - Add to favorites
- `removeFromFavorites(videoId)` - Remove from favorites
- `updateSettings(settings)` - Update settings
- `incrementDownloads()` - Increment download count

---

## 🎭 Component Hierarchy

```
App
├── Header (navigation)
│   └── Navigation tabs
├── Main Content (changes based on active tab)
│   ├── Home Tab
│   │   ├── VideoDownloader
│   │   ├── VideoPreview (conditional)
│   │   └── Features
│   ├── Batch Tab
│   │   └── BatchDownloader
│   ├── History Tab
│   │   └── DownloadHistory
│   ├── Stats Tab
│   │   └── Stats
│   └── Settings Tab
│       └── Settings
└── Footer
```

---

## 🚀 Next Steps

### For Development:

1. **Explore the Code**: Browse through components to understand the structure
2. **Customize Styling**: Adjust colors, fonts, and animations
3. **Add Features**: Extend functionality as needed
4. **Set Up API**: Follow [API_SETUP.md](./API_SETUP.md) for real downloads

### For Production:

1. **Configure API**: Set up a real backend (see API_SETUP.md)
2. **Add Analytics**: Integrate Google Analytics or similar
3. **Enable PWA**: Make it installable on mobile devices
4. **Optimize Build**: Run `npm run build` and deploy
5. **Set Up CDN**: Use CloudFlare or similar for assets

### Deployment Options:

**Frontend:**
- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- AWS S3 + CloudFront

**Backend:**
- [Railway](https://railway.app)
- [Render](https://render.com)
- [Heroku](https://heroku.com)
- [DigitalOcean](https://digitalocean.com)

---

## 📚 Additional Resources

- **Main README**: [README.md](./README.md) - Full documentation
- **API Setup**: [API_SETUP.md](./API_SETUP.md) - Configure real downloads
- **Features List**: [FEATURES.md](./FEATURES.md) - Complete feature documentation
- **React Docs**: [https://react.dev](https://react.dev)
- **Framer Motion**: [https://www.framer.com/motion/](https://www.framer.com/motion/)
- **Zustand**: [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)

---

## 🐛 Troubleshooting

### App won't start
- Delete `node_modules` and run `npm install` again
- Check Node.js version (requires v14+)
- Clear npm cache: `npm cache clean --force`

### Styling issues
- Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Check for CSS conflicts

### State not persisting
- Check browser's localStorage is enabled
- Check console for errors
- Clear localStorage and restart: `localStorage.clear()`

### API errors
- Verify backend is running (if using local server)
- Check network tab in browser DevTools
- Verify API endpoints in `.env`

---

## 💡 Tips

1. **Use Demo Mode First**: Get familiar with all features before setting up API
2. **Check Console**: Browser console shows helpful debugging info
3. **Mobile Testing**: Use Chrome DevTools device emulator
4. **Theme Testing**: Switch themes frequently during development
5. **State Inspection**: Install Redux DevTools to inspect Zustand state

---

## 🤝 Contributing

Want to improve the app? Here are some ideas:

- Add Instagram Reels support
- Add YouTube Shorts support
- Implement video player preview
- Add download progress bars
- Create user accounts system
- Add cloud sync for history
- Implement video editing tools
- Add subtitle download support

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

## 🎉 You're Ready!

Everything is set up and ready to go. Start exploring the app and have fun! 🚀

For questions or issues, check the documentation files or the code comments.

**Happy Coding!** 💻✨
