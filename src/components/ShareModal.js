import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaReddit,
  FaLinkedin,
  FaLink,
  FaQrcode
} from 'react-icons/fa';
import { copyToClipboard } from '../utils/helpers';
import './ShareModal.css';

const ShareModal = ({ isOpen, onClose, videoData }) => {
  if (!videoData) return null;

  const videoUrl = `https://www.tiktok.com/@${videoData.author?.username}/video/${videoData.videoId}`;
  const shareText = `Check out this TikTok video by @${videoData.author?.username}`;

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: '#1877f2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`,
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: '#1da1f2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(videoUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: '#25d366',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + videoUrl)}`,
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      color: '#0088cc',
      url: `https://t.me/share/url?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Reddit',
      icon: FaReddit,
      color: '#ff4500',
      url: `https://reddit.com/submit?url=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: '#0077b5',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(videoUrl)}`,
    },
  ];

  const handleShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(videoUrl);
    if (success) {
      toast.success('Link copied to clipboard!');
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleGenerateQR = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(videoUrl)}`;
    window.open(qrUrl, '_blank');
    toast.success('QR Code generated!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="share-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="modal-header">
              <h3>📤 Share Video</h3>
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="video-info-compact">
                <img src={videoData.thumbnail} alt="thumbnail" />
                <div>
                  <strong>@{videoData.author?.username}</strong>
                  <p>{videoData.title?.substring(0, 60)}...</p>
                </div>
              </div>

              <div className="share-platforms">
                {socialPlatforms.map((platform, index) => {
                  const Icon = platform.icon;
                  return (
                    <motion.button
                      key={platform.name}
                      className="platform-btn"
                      onClick={() => handleShare(platform.url)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ '--platform-color': platform.color }}
                    >
                      <Icon />
                      <span>{platform.name}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="share-actions">
                <motion.button
                  className="action-btn copy-btn"
                  onClick={handleCopyLink}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaLink />
                  Copy Link
                </motion.button>

                <motion.button
                  className="action-btn qr-btn"
                  onClick={handleGenerateQR}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaQrcode />
                  Generate QR Code
                </motion.button>
              </div>

              <div className="link-preview">
                <input
                  type="text"
                  value={videoUrl}
                  readOnly
                  onClick={(e) => e.target.select()}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
