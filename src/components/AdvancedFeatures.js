import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaVideo, 
  FaMusic, 
  FaImages, 
  FaFileDownload,
  FaCompressArrowsAlt,
  FaCut
} from 'react-icons/fa';
import './AdvancedFeatures.css';

const AdvancedFeatures = ({ videoData, onExtract }) => {
  const [activeTab, setActiveTab] = useState('video');

  const extractionOptions = [
    {
      id: 'video',
      icon: FaVideo,
      title: 'Video Only',
      description: 'Extract video without audio',
      color: '#667eea',
    },
    {
      id: 'audio',
      icon: FaMusic,
      title: 'Audio Only',
      description: 'Extract MP3 audio track',
      color: '#f093fb',
    },
    {
      id: 'frames',
      icon: FaImages,
      title: 'Key Frames',
      description: 'Extract thumbnail images',
      color: '#43e97b',
    },
    {
      id: 'compressed',
      icon: FaCompressArrowsAlt,
      title: 'Compressed',
      description: 'Smaller file size',
      color: '#feca57',
    },
    {
      id: 'trim',
      icon: FaCut,
      title: 'Trim Video',
      description: 'Select custom duration',
      color: '#ff6b6b',
    },
    {
      id: 'all',
      icon: FaFileDownload,
      title: 'Download All',
      description: 'Video + Audio + Frames',
      color: '#4834d4',
    },
  ];

  const handleExtract = (type) => {
    setActiveTab(type);
    onExtract?.(type);
  };

  return (
    <motion.div
      className="advanced-features"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="advanced-header">
        <h3>⚡ Advanced Options</h3>
        <p>Extract specific content from the video</p>
      </div>

      <div className="extraction-grid">
        {extractionOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.id}
              className={`extraction-card ${activeTab === option.id ? 'active' : ''}`}
              onClick={() => handleExtract(option.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="extraction-icon"
                style={{ background: option.color }}
              >
                <Icon />
              </div>
              <h4>{option.title}</h4>
              <p>{option.description}</p>
              {activeTab === option.id && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {activeTab === 'trim' && (
        <motion.div
          className="trim-controls"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <h4>🎬 Trim Video</h4>
          <div className="trim-slider">
            <input type="range" min="0" max="100" defaultValue="0" />
            <input type="range" min="0" max="100" defaultValue="100" />
          </div>
          <div className="trim-info">
            <span>Start: 0:00</span>
            <span>End: {videoData?.duration || 0}s</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdvancedFeatures;
