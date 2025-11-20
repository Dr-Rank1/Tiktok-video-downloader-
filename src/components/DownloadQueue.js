import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import useStore from '../store/useStore';
import { formatFileSize } from '../utils/helpers';
import './DownloadQueue.css';

const DownloadQueue = () => {
  const { activeDownloads, removeActiveDownload } = useStore();

  if (activeDownloads.length === 0) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'downloading':
        return <FaSpinner className="spinning" />;
      case 'completed':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationCircle />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'downloading':
        return '#667eea';
      case 'completed':
        return '#43e97b';
      case 'error':
        return '#ff4757';
      default:
        return '#999';
    }
  };

  return (
    <div className="download-queue">
      <div className="queue-header">
        <h4>
          <FaSpinner className="spinning" />
          Active Downloads ({activeDownloads.length})
        </h4>
      </div>

      <AnimatePresence>
        {activeDownloads.map((download) => (
          <motion.div
            key={download.id}
            className="queue-item"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            layout
          >
            <div className="queue-item-content">
              <div className="queue-thumbnail">
                <img src={download.thumbnail} alt="thumbnail" />
              </div>

              <div className="queue-info">
                <div className="queue-title">{download.title}</div>
                <div className="queue-meta">
                  {download.status === 'downloading' && (
                    <span>
                      {download.progress || 0}% • {formatFileSize(download.downloaded || 0)} / {formatFileSize(download.total || 0)}
                    </span>
                  )}
                  {download.status === 'completed' && (
                    <span>Completed • {formatFileSize(download.size || 0)}</span>
                  )}
                  {download.status === 'error' && (
                    <span className="error-text">{download.error || 'Download failed'}</span>
                  )}
                </div>

                {download.status === 'downloading' && (
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${download.progress || 0}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>

              <div 
                className="queue-status"
                style={{ color: getStatusColor(download.status) }}
              >
                {getStatusIcon(download.status)}
              </div>

              <button
                className="queue-remove"
                onClick={() => removeActiveDownload(download.id)}
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DownloadQueue;
