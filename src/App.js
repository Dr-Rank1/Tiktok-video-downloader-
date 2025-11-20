import React, { useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import VideoDownloader from './components/VideoDownloader';
import VideoPreview from './components/VideoPreview';
import DownloadHistory from './components/DownloadHistory';
import Stats from './components/Stats';
import BatchDownloader from './components/BatchDownloader';
import Settings from './components/Settings';
import ShareModal from './components/ShareModal';
import DownloadQueue from './components/DownloadQueue';
import useStore from './store/useStore';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [videoData, setVideoData] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const videoInputRef = useRef(null);
  const { settings } = useStore();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts(setActiveTab, videoInputRef);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <VideoDownloader 
              setVideoData={setVideoData} 
              inputRef={videoInputRef}
            />
            {videoData && (
              <VideoPreview 
                videoData={videoData}
                onShare={() => setShowShareModal(true)}
              />
            )}
          </>
        );
      case 'batch':
        return <BatchDownloader />;
      case 'history':
        return <DownloadHistory />;
      case 'stats':
        return <Stats />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className={`App ${settings.theme}`}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: settings.theme === 'dark' ? '#333' : '#fff',
            color: settings.theme === 'dark' ? '#fff' : '#333',
          },
        }}
      />
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="App-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="App-footer">
        <div className="footer-bottom">
          <p>⚠️ Use responsibly - Respect creators' rights • For personal use only</p>
        </div>
      </footer>

      {/* Global Components */}
      <DownloadQueue />
      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        videoData={videoData}
      />
    </div>
  );
}

export default App;
