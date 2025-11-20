import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaLink, FaPaste } from 'react-icons/fa';
import api from '../services/api';
import useStore from '../store/useStore';
import './VideoDownloader.css';

const VideoDownloader = ({ setVideoData, inputRef }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToHistory, incrementDownloads, settings } = useStore();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        toast.success('URL pasted from clipboard');
      }
    } catch (err) {
      toast.error('Failed to paste from clipboard');
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    setVideoData(null);

    if (!url.trim()) {
      toast.error('Please enter a TikTok URL');
      return;
    }

    if (!api.isValidUrl(url)) {
      toast.error('Invalid TikTok URL. Please enter a valid share link.');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Processing video...');

    try {
      // Try real API first, fall back to demo if no API key
      const result = await api.getVideo(url);

      if (result.success) {
        setVideoData(result.data);
        addToHistory(result.data);
        incrementDownloads();
        
        if (result.data.isDemo) {
          toast.success('Demo mode - Add API key for real downloads', { id: loadingToast });
        } else {
          toast.success('Video loaded successfully!', { id: loadingToast });
        }
      } else {
        toast.error(result.error || 'Failed to load video', { id: loadingToast });
      }
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Failed to process video. Please try again.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="video-downloader"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="downloader-card">
        <h2>🎵 Download TikTok Video</h2>
        <p className="card-subtitle">Paste the video link below</p>
        
        <form onSubmit={handleDownload}>
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.tiktok.com/@username/video/..."
              className="url-input"
              disabled={loading}
            />
            <motion.button
              type="button"
              className="paste-button"
              onClick={handlePaste}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPaste />
            </motion.button>
          </div>
          
          <motion.button 
            type="submit" 
            className="download-button"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                <span>🚀</span>
                Get Video
              </>
            )}
          </motion.button>
        </form>

      </div>
    </motion.div>
  );
};

export default VideoDownloader;
