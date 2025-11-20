import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaDownload, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import useStore from '../store/useStore';
import './BatchDownloader.css';

const BatchDownloader = () => {
  const [urls, setUrls] = useState(['']);
  const [downloading, setDownloading] = useState(false);
  const [results, setResults] = useState([]);
  const { addToHistory, incrementDownloads } = useStore();

  const addUrlField = () => {
    setUrls([...urls, '']);
  };

  const removeUrlField = (index) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleBatchDownload = async () => {
    const validUrls = urls.filter(url => url.trim() !== '' && api.isValidUrl(url));
    
    if (validUrls.length === 0) {
      toast.error('Please enter at least one valid TikTok URL');
      return;
    }

    setDownloading(true);
    setResults([]);
    
    const downloadResults = [];

    for (let i = 0; i < validUrls.length; i++) {
      const url = validUrls[i];
      toast.loading(`Processing video ${i + 1} of ${validUrls.length}...`, { id: 'batch' });

      try {
        const result = await api.getDemoData(url);
        
        if (result.success) {
          downloadResults.push({
            url,
            status: 'success',
            data: result.data,
          });
          addToHistory(result.data);
          incrementDownloads();
        } else {
          downloadResults.push({
            url,
            status: 'error',
            error: result.error,
          });
        }
      } catch (error) {
        downloadResults.push({
          url,
          status: 'error',
          error: 'Failed to download',
        });
      }
    }

    setResults(downloadResults);
    setDownloading(false);
    toast.dismiss('batch');
    
    const successCount = downloadResults.filter(r => r.status === 'success').length;
    toast.success(`Downloaded ${successCount} of ${validUrls.length} videos!`);
  };

  const clearAll = () => {
    setUrls(['']);
    setResults([]);
  };

  return (
    <div className="batch-downloader">
      <motion.div
        className="batch-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="batch-header">
          <h2>📦 Batch Download</h2>
          <p>Download multiple TikTok videos at once</p>
        </div>

        <div className="urls-container">
          <AnimatePresence>
            {urls.map((url, index) => (
              <motion.div
                key={index}
                className="url-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="url-number">{index + 1}</span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => updateUrl(index, e.target.value)}
                  placeholder="Paste TikTok URL here..."
                  disabled={downloading}
                />
                {urls.length > 1 && (
                  <button
                    className="remove-btn"
                    onClick={() => removeUrlField(index)}
                    disabled={downloading}
                  >
                    <FaTrash />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            className="add-url-btn"
            onClick={addUrlField}
            disabled={downloading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlus /> Add Another URL
          </motion.button>
        </div>

        <div className="batch-actions">
          <button
            className="batch-download-btn"
            onClick={handleBatchDownload}
            disabled={downloading}
          >
            <FaDownload />
            {downloading ? 'Downloading...' : 'Download All'}
          </button>
          <button
            className="clear-btn"
            onClick={clearAll}
            disabled={downloading}
          >
            Clear All
          </button>
        </div>
      </motion.div>

      {results.length > 0 && (
        <motion.div
          className="batch-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Download Results</h3>
          <div className="results-list">
            {results.map((result, index) => (
              <motion.div
                key={index}
                className={`result-item ${result.status}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="result-icon">
                  {result.status === 'success' ? <FaCheck /> : <FaTimes />}
                </div>
                <div className="result-info">
                  {result.status === 'success' ? (
                    <>
                      <strong>@{result.data.author.username}</strong>
                      <p>{result.data.title.substring(0, 50)}...</p>
                    </>
                  ) : (
                    <>
                      <strong>Failed</strong>
                      <p>{result.error}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BatchDownloader;
