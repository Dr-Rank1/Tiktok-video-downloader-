import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaPlay, FaDownload } from 'react-icons/fa';
import { formatNumber } from '../utils/helpers';
import './TrendingVideos.css';

const TrendingVideos = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock trending videos - replace with real API
    const mockVideos = [
      {
        id: '1',
        thumbnail: 'https://via.placeholder.com/300x400?text=Trending+1',
        author: 'creator1',
        avatar: 'https://via.placeholder.com/50',
        title: 'Amazing dance performance! 💃',
        views: 2500000,
        likes: 350000,
        category: 'dance',
      },
      {
        id: '2',
        thumbnail: 'https://via.placeholder.com/300x400?text=Trending+2',
        author: 'creator2',
        avatar: 'https://via.placeholder.com/50',
        title: 'Cooking hack you need to know! 🍳',
        views: 1800000,
        likes: 220000,
        category: 'food',
      },
      {
        id: '3',
        thumbnail: 'https://via.placeholder.com/300x400?text=Trending+3',
        author: 'creator3',
        avatar: 'https://via.placeholder.com/50',
        title: 'Funny pet compilation 😂',
        views: 3200000,
        likes: 480000,
        category: 'comedy',
      },
      {
        id: '4',
        thumbnail: 'https://via.placeholder.com/300x400?text=Trending+4',
        author: 'creator4',
        avatar: 'https://via.placeholder.com/50',
        title: 'Life changing fitness tip 💪',
        views: 1500000,
        likes: 180000,
        category: 'fitness',
      },
      {
        id: '5',
        thumbnail: 'https://via.placeholder.com/300x400?text=Trending+5',
        author: 'creator5',
        avatar: 'https://via.placeholder.com/50',
        title: 'Beautiful travel destination 🌴',
        views: 2100000,
        likes: 290000,
        category: 'travel',
      },
      {
        id: '6',
        thumbnail: 'https://via.placeholder.com/300x400?text=Trending+6',
        author: 'creator6',
        avatar: 'https://via.placeholder.com/50',
        title: 'DIY home decor ideas ✨',
        views: 950000,
        likes: 125000,
        category: 'diy',
      },
    ];
    setTrendingVideos(mockVideos);
  }, []);

  const categories = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'dance', label: 'Dance', icon: '💃' },
    { id: 'food', label: 'Food', icon: '🍳' },
    { id: 'comedy', label: 'Comedy', icon: '😂' },
    { id: 'fitness', label: 'Fitness', icon: '💪' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'diy', label: 'DIY', icon: '🛠️' },
  ];

  const filteredVideos = selectedCategory === 'all'
    ? trendingVideos
    : trendingVideos.filter(v => v.category === selectedCategory);

  return (
    <div className="trending-videos">
      <motion.div
        className="trending-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>
          <FaFire className="fire-icon" />
          Trending Now
        </h2>
        <p>Most popular TikTok videos today</p>
      </motion.div>

      <div className="category-filters">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="trending-grid">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            className="trending-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="trending-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <div className="thumbnail-overlay">
                <button className="play-btn">
                  <FaPlay />
                </button>
                <button className="quick-download-btn">
                  <FaDownload />
                </button>
              </div>
              <div className="trending-badge">
                <FaFire /> Trending
              </div>
            </div>

            <div className="trending-info">
              <div className="author-row">
                <img src={video.avatar} alt={video.author} className="author-avatar" />
                <span className="author-name">@{video.author}</span>
              </div>
              <p className="video-title">{video.title}</p>
              <div className="video-stats">
                <span>👁️ {formatNumber(video.views)}</span>
                <span>❤️ {formatNumber(video.likes)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingVideos;
