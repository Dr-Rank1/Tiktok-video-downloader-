import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaLayerGroup, 
  FaHistory, 
  FaChartBar, 
  FaCog 
} from 'react-icons/fa';
import './Header.css';

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'batch', label: 'Batch', icon: FaLayerGroup },
    { id: 'history', label: 'History', icon: FaHistory },
    { id: 'stats', label: 'Stats', icon: FaChartBar },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="logo-icon">🎵</span>
          <h1>TikTok Downloader</h1>
        </motion.div>

        <nav className="nav-tabs">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="tab-icon" />
                <span className="tab-label">{tab.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
