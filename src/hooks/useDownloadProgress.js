import { useState, useCallback } from 'react';
import useStore from '../store/useStore';

const useDownloadProgress = () => {
  const [downloads, setDownloads] = useState(new Map());
  const { addActiveDownload, updateActiveDownload, removeActiveDownload } = useStore();

  const startDownload = useCallback((videoData) => {
    const downloadId = Date.now();
    const download = {
      id: downloadId,
      thumbnail: videoData.thumbnail,
      title: videoData.title,
      status: 'downloading',
      progress: 0,
      downloaded: 0,
      total: 0,
    };

    addActiveDownload(download);
    setDownloads(prev => new Map(prev).set(downloadId, download));

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        updateActiveDownload(downloadId, {
          status: 'completed',
          progress: 100,
        });

        // Remove from active downloads after 3 seconds
        setTimeout(() => {
          removeActiveDownload(downloadId);
          setDownloads(prev => {
            const newMap = new Map(prev);
            newMap.delete(downloadId);
            return newMap;
          });
        }, 3000);
      } else {
        updateActiveDownload(downloadId, {
          progress: Math.min(progress, 100),
          downloaded: Math.random() * 10000000,
          total: 10000000,
        });
      }
    }, 500);

    return downloadId;
  }, [addActiveDownload, updateActiveDownload, removeActiveDownload]);

  const cancelDownload = useCallback((downloadId) => {
    updateActiveDownload(downloadId, {
      status: 'error',
      error: 'Download cancelled',
    });

    setTimeout(() => {
      removeActiveDownload(downloadId);
      setDownloads(prev => {
        const newMap = new Map(prev);
        newMap.delete(downloadId);
        return newMap;
      });
    }, 2000);
  }, [updateActiveDownload, removeActiveDownload]);

  return {
    downloads: Array.from(downloads.values()),
    startDownload,
    cancelDownload,
  };
};

export default useDownloadProgress;
