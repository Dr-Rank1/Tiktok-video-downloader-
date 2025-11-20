import { useEffect } from 'react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const useKeyboardShortcuts = (setActiveTab, videoInputRef) => {
  const { settings, updateSettings } = useStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInputFocused = 
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA';

      // Ctrl/Cmd + K - Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        videoInputRef?.current?.focus();
        toast.success('Search focused');
      }

      // Ctrl/Cmd + B - Batch downloader
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setActiveTab('batch');
        toast.success('Batch downloader opened');
      }

      // Ctrl/Cmd + H - History
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        setActiveTab('history');
        toast.success('History opened');
      }

      // Ctrl/Cmd + S - Settings
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        setActiveTab('settings');
        toast.success('Settings opened');
      }

      // Ctrl/Cmd + D - Toggle dark mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
        updateSettings({ theme: newTheme });
        toast.success(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`);
      }

      // Ctrl/Cmd + 1-5 - Navigate tabs
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const tabs = ['home', 'batch', 'history', 'stats', 'settings'];
        setActiveTab(tabs[parseInt(e.key) - 1]);
      }

      // Arrow keys for navigation (when not in input)
      if (!isInputFocused) {
        if (e.key === 'ArrowLeft') {
          // Navigate to previous tab
          const tabs = ['home', 'batch', 'history', 'stats', 'settings'];
          const currentIndex = tabs.indexOf(window.location.hash.slice(1) || 'home');
          if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
          }
        }
        if (e.key === 'ArrowRight') {
          // Navigate to next tab
          const tabs = ['home', 'batch', 'history', 'stats', 'settings'];
          const currentIndex = tabs.indexOf(window.location.hash.slice(1) || 'home');
          if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings, updateSettings, setActiveTab, videoInputRef]);
};

export default useKeyboardShortcuts;
