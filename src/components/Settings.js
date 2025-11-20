import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaMoon, FaSun, FaVideo, FaDownload, FaImage } from 'react-icons/fa';
import useStore from '../store/useStore';
import './Settings.css';

const Settings = () => {
  const { settings, updateSettings } = useStore();

  const handleToggle = (key) => {
    const newValue = !settings[key];
    updateSettings({ [key]: newValue });
    toast.success(`${key} ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleQualityChange = (quality) => {
    updateSettings({ quality });
    toast.success(`Quality set to ${quality.toUpperCase()}`);
  };

  const handleThemeChange = (theme) => {
    updateSettings({ theme });
    toast.success(`Theme changed to ${theme}`);
  };

  return (
    <div className="settings-page">
      <motion.div
        className="settings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>⚙️ Settings</h2>
        <p>Customize your download experience</p>
      </motion.div>

      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3>🎨 Appearance</h3>
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-icon">
              {settings.theme === 'dark' ? <FaMoon /> : <FaSun />}
            </div>
            <div>
              <h4>Theme</h4>
              <p>Choose your preferred color scheme</p>
            </div>
          </div>
          <div className="theme-toggle">
            <button
              className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              <FaSun /> Light
            </button>
            <button
              className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              <FaMoon /> Dark
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3>📥 Download Settings</h3>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-icon">
              <FaVideo />
            </div>
            <div>
              <h4>Video Quality</h4>
              <p>Select default download quality</p>
            </div>
          </div>
          <div className="quality-selector">
            <button
              className={`quality-btn ${settings.quality === 'hd' ? 'active' : ''}`}
              onClick={() => handleQualityChange('hd')}
            >
              HD
            </button>
            <button
              className={`quality-btn ${settings.quality === 'sd' ? 'active' : ''}`}
              onClick={() => handleQualityChange('sd')}
            >
              SD
            </button>
            <button
              className={`quality-btn ${settings.quality === 'low' ? 'active' : ''}`}
              onClick={() => handleQualityChange('low')}
            >
              Low
            </button>
          </div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-icon">
              <FaDownload />
            </div>
            <div>
              <h4>Auto Download</h4>
              <p>Automatically download after processing</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.autoDownload}
              onChange={() => handleToggle('autoDownload')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-icon">
              <FaImage />
            </div>
            <div>
              <h4>Show Thumbnails</h4>
              <p>Display video thumbnails in history</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.showThumbnails}
              onChange={() => handleToggle('showThumbnails')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </motion.div>

      <motion.div
        className="settings-section info-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3>ℹ️ About</h3>
        <div className="info-content">
          <p><strong>Version:</strong> 2.0.0</p>
          <p><strong>Made with:</strong> React, Framer Motion, Zustand</p>
          <p><strong>License:</strong> MIT</p>
          <p className="disclaimer">
            ⚠️ <strong>Important:</strong> This tool is for personal use only. 
            Please respect content creators' rights and follow TikTok's Terms of Service.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="settings-section danger-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3>🗑️ Data Management</h3>
        <div className="danger-actions">
          <button
            className="danger-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
                toast.success('All data cleared');
              }
            }}
          >
            Clear All Data
          </button>
          <p className="danger-warning">
            This will delete all your download history, favorites, and settings.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
