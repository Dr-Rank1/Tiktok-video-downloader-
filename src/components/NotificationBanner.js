import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaBell } from 'react-icons/fa';
import './NotificationBanner.css';

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('notification-dismissed');
    if (dismissed) {
      setIsVisible(false);
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('notification-dismissed', 'true');
    setTimeout(() => setIsDismissed(true), 300);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="notification-banner"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="banner-content">
            <div className="banner-icon">
              <FaBell />
            </div>
            <div className="banner-text">
              <strong>🎉 New Features!</strong>
              <span>Video player, trending videos, keyboard shortcuts & more!</span>
            </div>
            <button className="banner-dismiss" onClick={handleDismiss}>
              <FaTimes />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;
