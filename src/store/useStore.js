import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Download history
  history: [],
  addToHistory: (video) => {
    const history = get().history;
    const newHistory = [
      {
        ...video,
        downloadedAt: new Date().toISOString(),
        id: Date.now(),
      },
      ...history,
    ].slice(0, 50); // Keep only last 50
    set({ history: newHistory });
  },
  removeFromHistory: (id) => {
    set({ history: get().history.filter((item) => item.id !== id) });
  },
  clearHistory: () => set({ history: [] }),

  // Favorites
  favorites: [],
  addToFavorites: (video) => {
    const favorites = get().favorites;
    if (!favorites.find((fav) => fav.videoId === video.videoId)) {
      set({
        favorites: [
          { ...video, favoritedAt: new Date().toISOString() },
          ...favorites,
        ],
      });
    }
  },
  removeFromFavorites: (videoId) => {
    set({
      favorites: get().favorites.filter((fav) => fav.videoId !== videoId),
    });
  },

  // Settings
  settings: {
    theme: 'dark',
    quality: 'hd',
    autoDownload: false,
    showThumbnails: true,
    downloadWithWatermark: false,
  },
  updateSettings: (newSettings) => {
    set({ settings: { ...get().settings, ...newSettings } });
  },

  // Stats
  stats: {
    totalDownloads: 0,
    totalSize: 0,
  },
  incrementDownloads: (size = 0) => {
    const stats = get().stats;
    set({
      stats: {
        totalDownloads: stats.totalDownloads + 1,
        totalSize: stats.totalSize + size,
      },
    });
  },

  // Active downloads
  activeDownloads: [],
  addActiveDownload: (download) => {
    set({ activeDownloads: [...get().activeDownloads, download] });
  },
  updateActiveDownload: (id, updates) => {
    set({
      activeDownloads: get().activeDownloads.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    });
  },
  removeActiveDownload: (id) => {
    set({
      activeDownloads: get().activeDownloads.filter((d) => d.id !== id),
    });
  },
}));

// Add persistence manually using localStorage
if (typeof window !== 'undefined') {
  const savedState = localStorage.getItem('tiktok-downloader-storage');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      useStore.setState(parsed);
    } catch (e) {
      console.error('Failed to load state:', e);
    }
  }

  useStore.subscribe((state) => {
    localStorage.setItem('tiktok-downloader-storage', JSON.stringify(state));
  });
}

export default useStore;
