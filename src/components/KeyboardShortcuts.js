import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaKeyboard, FaTimes } from 'react-icons/fa';
import './KeyboardShortcuts.css';

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Ctrl + V', description: 'Paste URL', mac: '⌘ + V' },
    { key: 'Enter', description: 'Download video', mac: 'Enter' },
    { key: 'Ctrl + K', description: 'Focus search', mac: '⌘ + K' },
    { key: 'Ctrl + B', description: 'Open batch downloader', mac: '⌘ + B' },
    { key: 'Ctrl + H', description: 'View history', mac: '⌘ + H' },
    { key: 'Ctrl + S', description: 'Open settings', mac: '⌘ + S' },
    { key: 'Ctrl + D', description: 'Toggle dark mode', mac: '⌘ + D' },
    { key: 'Escape', description: 'Close modals', mac: 'Esc' },
    { key: '?', description: 'Show shortcuts', mac: '?' },
    { key: 'Space', description: 'Play/Pause video', mac: 'Space' },
  ];

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Show shortcuts with ?
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      
      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  return (
    <>
      <motion.button
        className="shortcuts-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Keyboard Shortcuts (?)"
      >
        <FaKeyboard />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="shortcuts-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="shortcuts-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="shortcuts-header">
                <h3>
                  <FaKeyboard /> Keyboard Shortcuts
                </h3>
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="shortcuts-body">
                <div className="shortcuts-grid">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={index}
                      className="shortcut-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <kbd className="shortcut-key">
                        {isMac ? shortcut.mac : shortcut.key}
                      </kbd>
                      <span className="shortcut-desc">{shortcut.description}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="shortcuts-footer">
                  <p>Press <kbd>?</kbd> anytime to toggle this menu</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
