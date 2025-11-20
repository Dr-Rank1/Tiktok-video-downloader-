import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaHeart, FaChartLine, FaClock } from 'react-icons/fa';
import useStore from '../store/useStore';
import { formatFileSize, formatNumber } from '../utils/helpers';
import './Stats.css';

const Stats = () => {
  const { stats, history, favorites } = useStore();

  const statsData = [
    {
      icon: FaDownload,
      title: 'Total Downloads',
      value: stats.totalDownloads,
      color: '#667eea',
      suffix: '',
    },
    {
      icon: FaHeart,
      title: 'Favorites',
      value: favorites.length,
      color: '#ff4757',
      suffix: '',
    },
    {
      icon: FaChartLine,
      title: 'Total Size',
      value: formatFileSize(stats.totalSize),
      color: '#43e97b',
      suffix: '',
    },
    {
      icon: FaClock,
      title: 'This Week',
      value: getWeeklyDownloads(),
      color: '#f093fb',
      suffix: '',
    },
  ];

  function getWeeklyDownloads() {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return history.filter(item => 
      new Date(item.downloadedAt).getTime() > oneWeekAgo
    ).length;
  }

  const topCreators = getTopCreators();

  function getTopCreators() {
    const creatorMap = {};
    history.forEach(item => {
      if (item.author?.username) {
        if (!creatorMap[item.author.username]) {
          creatorMap[item.author.username] = {
            username: item.author.username,
            avatar: item.author.avatar,
            count: 0,
          };
        }
        creatorMap[item.author.username].count++;
      }
    });

    return Object.values(creatorMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  return (
    <div className="stats-page">
      <motion.div
        className="stats-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>📊 Statistics</h2>
        <p>Your download analytics and insights</p>
      </motion.div>

      <div className="stats-grid">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div 
                className="stat-icon"
                style={{ background: stat.color }}
              >
                <Icon />
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <p className="stat-value">
                  {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
                  {stat.suffix}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {topCreators.length > 0 && (
        <motion.div
          className="top-creators-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>🏆 Top Creators</h3>
          <p className="section-subtitle">Most downloaded creators</p>
          
          <div className="creators-list">
            {topCreators.map((creator, index) => (
              <motion.div
                key={creator.username}
                className="creator-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="creator-rank">{index + 1}</div>
                <img 
                  src={creator.avatar || 'https://via.placeholder.com/50'} 
                  alt={creator.username}
                  className="creator-avatar"
                />
                <div className="creator-info">
                  <strong>@{creator.username}</strong>
                  <span>{creator.count} downloads</span>
                </div>
                <div className="creator-badge">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {history.length === 0 && (
        <motion.div
          className="empty-stats"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="empty-icon">📈</div>
          <h3>No statistics yet</h3>
          <p>Start downloading videos to see your stats!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Stats;
