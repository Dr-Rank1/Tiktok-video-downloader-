import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  FaTrash, 
  FaDownload, 
  FaHeart, 
  FaRegHeart,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import useStore from '../store/useStore';
import { formatDate, formatNumber, downloadFile } from '../utils/helpers';
import './DownloadHistory.css';

const DownloadHistory = () => {
  const { history, removeFromHistory, clearHistory, favorites, addToFavorites, removeFromFavorites } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.author?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !filterFavorites || favorites.some(fav => fav.videoId === item.videoId);
    return matchesSearch && matchesFavorites;
  });

  const isFavorite = (videoId) => {
    return favorites.some(fav => fav.videoId === videoId);
  };

  const toggleFavorite = (video) => {
    if (isFavorite(video.videoId)) {
      removeFromFavorites(video.videoId);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(video);
      toast.success('Added to favorites');
    }
  };

  const handleDelete = (id) => {
    removeFromHistory(id);
    toast.success('Removed from history');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      toast.success('History cleared');
    }
  };

  return (
    <div className="download-history">
      <motion.div
        className="history-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>📚 Download History</h2>
        <p>{history.length} videos downloaded</p>
      </motion.div>

      <div className="history-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by username or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <button
            className={`filter-btn ${filterFavorites ? 'active' : ''}`}
            onClick={() => setFilterFavorites(!filterFavorites)}
          >
            <FaFilter /> Favorites Only
          </button>
          {history.length > 0 && (
            <button className="clear-all-btn" onClick={handleClearAll}>
              <FaTrash /> Clear All
            </button>
          )}
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="empty-icon">📭</div>
          <h3>No downloads yet</h3>
          <p>Your download history will appear here</p>
        </motion.div>
      ) : (
        <motion.div className="history-grid">
          <AnimatePresence>
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                className="history-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <div className="card-thumbnail">
                  <img src={item.thumbnail} alt="thumbnail" />
                  <div className="card-overlay">
                    <button
                      className="overlay-btn"
                      onClick={() => downloadFile(item.downloadUrl, `tiktok-${item.videoId}.mp4`)}
                      title="Download again"
                    >
                      <FaDownload />
                    </button>
                    <button
                      className={`overlay-btn favorite-btn ${isFavorite(item.videoId) ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite(item)}
                      title={isFavorite(item.videoId) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite(item.videoId) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-author">
                    <img src={item.author?.avatar} alt="avatar" />
                    <span>@{item.author?.username}</span>
                  </div>
                  
                  <p className="card-title">{item.title}</p>
                  
                  {item.stats && (
                    <div className="card-stats">
                      <span>👁️ {formatNumber(item.stats.plays)}</span>
                      <span>❤️ {formatNumber(item.stats.likes)}</span>
                      <span>💬 {formatNumber(item.stats.comments)}</span>
                    </div>
                  )}
                  
                  <div className="card-footer">
                    <span className="card-date">{formatDate(item.downloadedAt)}</span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                      title="Remove from history"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default DownloadHistory;
