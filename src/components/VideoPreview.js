import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  FaDownload, 
  FaHeart, 
  FaRegHeart, 
  FaShare, 
  FaPlay,
  FaEye,
  FaComment 
} from 'react-icons/fa';
import useStore from '../store/useStore';
import { formatNumber, formatDuration, downloadFile, copyToClipboard } from '../utils/helpers';
import './VideoPreview.css';

const VideoPreview = ({ videoData, onShare, onPlay }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useStore();
  
  const isFavorite = favorites.some(fav => fav.videoId === videoData.videoId);

  const handleDownloadClick = async (url, quality = '') => {
    if (videoData.isDemo) {
      toast.error('Demo mode: Connect a real API to download videos');
      return;
    }
    
    if (url && url !== '#') {
      toast.loading('Preparing download...', { id: 'download' });
      try {
        await downloadFile(url, `tiktok-${videoData.videoId}${quality}.mp4`);
        toast.success('Download started! Check your downloads folder.', { id: 'download' });
      } catch (error) {
        toast.error('Download failed. Video opened in new tab.', { id: 'download' });
      }
    }
  };

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(videoData.videoId);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(videoData);
      toast.success('Added to favorites');
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      const url = `https://www.tiktok.com/@${videoData.author.username}/video/${videoData.videoId}`;
      copyToClipboard(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <motion.div 
      className="video-preview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="preview-card">
        <div className="preview-header">
          <h2>✨ Video Ready!</h2>
          {videoData.isDemo && (
            <span className="demo-badge">DEMO MODE</span>
          )}
        </div>

        <div className="preview-content">
          <div className="video-section">
            {videoData.thumbnail && (
              <div className="thumbnail-container" onClick={handlePlay}>
                <img 
                  src={videoData.thumbnail} 
                  alt="Video thumbnail" 
                  className="video-thumbnail"
                />
                <div className="thumbnail-overlay">
                  <FaPlay className="play-icon" />
                  {videoData.duration && (
                    <span className="duration-badge">
                      {formatDuration(videoData.duration)}
                    </span>
                  )}
                </div>
              </div>
            )}

            {videoData.stats && (
              <div className="video-stats">
                <div className="stat-item">
                  <FaEye />
                  <span>{formatNumber(videoData.stats.plays)}</span>
                </div>
                <div className="stat-item">
                  <FaHeart />
                  <span>{formatNumber(videoData.stats.likes)}</span>
                </div>
                <div className="stat-item">
                  <FaComment />
                  <span>{formatNumber(videoData.stats.comments)}</span>
                </div>
                <div className="stat-item">
                  <FaShare />
                  <span>{formatNumber(videoData.stats.shares)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="info-section">
            {videoData.author && (
              <div className="author-info">
                <img 
                  src={videoData.author.avatar} 
                  alt={videoData.author.username}
                  className="author-avatar"
                />
                <div className="author-details">
                  <strong>{videoData.author.nickname}</strong>
                  <span>@{videoData.author.username}</span>
                </div>
              </div>
            )}
            
            {videoData.title && (
              <p className="video-description">{videoData.title}</p>
            )}

            {videoData.music && (
              <div className="music-info">
                <span className="music-icon">🎵</span>
                <div className="music-details">
                  <strong>{videoData.music.title}</strong>
                  <span>{videoData.music.author}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="action-buttons">
          <motion.button
            className="action-btn primary"
            onClick={() => handleDownloadClick(videoData.downloadUrlNoWatermark || videoData.downloadUrl)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaDownload />
            Download (No Watermark)
          </motion.button>

          {videoData.downloadUrlHD && (
            <motion.button
              className="action-btn hd"
              onClick={() => handleDownloadClick(videoData.downloadUrlHD, '-hd')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              HD Quality
            </motion.button>
          )}
        </div>

        <div className="secondary-actions">
          <motion.button
            className={`icon-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={handleFavorite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </motion.button>

          <motion.button
            className="icon-btn"
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Copy link"
          >
            <FaShare />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPreview;
