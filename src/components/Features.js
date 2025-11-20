import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaDownload, 
  FaVideo, 
  FaBolt, 
  FaShieldAlt, 
  FaLayerGroup,
  FaHistory 
} from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: FaDownload,
      title: 'No Watermark',
      description: 'Download videos without TikTok watermark',
      color: '#667eea',
    },
    {
      icon: FaVideo,
      title: 'HD Quality',
      description: 'Get videos in highest quality available',
      color: '#764ba2',
    },
    {
      icon: FaBolt,
      title: 'Fast Download',
      description: 'Lightning-fast processing and downloads',
      color: '#f093fb',
    },
    {
      icon: FaShieldAlt,
      title: 'Safe & Secure',
      description: 'No data collection, privacy-focused',
      color: '#4facfe',
    },
    {
      icon: FaLayerGroup,
      title: 'Batch Download',
      description: 'Download multiple videos at once',
      color: '#43e97b',
    },
    {
      icon: FaHistory,
      title: 'Download History',
      description: 'Keep track of all your downloads',
      color: '#fa709a',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="features-section">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="features-title"
      >
        Why Choose TikTok Downloader Pro?
      </motion.h2>
      
      <motion.div
        className="features-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="feature-card"
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div 
                className="feature-icon"
                style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` }}
              >
                <Icon />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Features;
