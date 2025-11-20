import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class TikTokAPI {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
    });
  }

  // Extract video ID from URL
  extractVideoId(url) {
    const patterns = [
      /tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
      /tiktok\.com\/v\/(\d+)/,
      /vm\.tiktok\.com\/([\w\d]+)/,
      /vt\.tiktok\.com\/([\w\d]+)/,
      /tiktok\.com\/t\/([\w\d]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  // Validate TikTok URL
  isValidUrl(url) {
    return /tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com/.test(url);
  }

  // Get video information
  async getVideoInfo(url) {
    try {
      // Option 1: Using RapidAPI (if you have API key)
      if (process.env.REACT_APP_RAPIDAPI_KEY) {
        const options = {
          method: 'GET',
          url: 'https://tiktok-download-without-watermark.p.rapidapi.com/analysis',
          params: { url, hd: '1' },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'tiktok-download-without-watermark.p.rapidapi.com'
          }
        };
        
        const response = await this.client.request(options);
        return { success: true, data: this.transformRapidAPIResponse(response.data) };
      }
      
      // Option 2: Using FREE backend (no API key needed!)
      const response = await this.client.post('/video-info', { url });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.response?.data?.message || error.message,
      };
    }
  }

  // Transform RapidAPI response to our format
  transformRapidAPIResponse(data) {
    return {
      videoId: data.aweme_id || data.id,
      author: {
        username: data.author?.unique_id || data.author?.nickname,
        nickname: data.author?.nickname || data.author?.unique_id,
        avatar: data.author?.avatar || data.author?.avatar_thumb?.url_list?.[0],
      },
      title: data.desc || data.title,
      thumbnail: data.video?.cover || data.video?.origin_cover?.url_list?.[0],
      cover: data.video?.dynamic_cover?.url_list?.[0],
      duration: data.video?.duration || data.duration,
      createTime: data.create_time,
      stats: {
        plays: data.statistics?.play_count || 0,
        likes: data.statistics?.digg_count || 0,
        comments: data.statistics?.comment_count || 0,
        shares: data.statistics?.share_count || 0,
      },
      music: {
        title: data.music?.title,
        author: data.music?.author,
      },
      downloadUrl: data.video?.play_addr?.url_list?.[0] || data.video?.download_addr?.url_list?.[0],
      downloadUrlNoWatermark: data.video?.download_addr?.url_list?.[0],
      downloadUrlHD: data.video?.bit_rate?.[0]?.play_addr?.url_list?.[0],
    };
  }

  // Download video
  async downloadVideo(url, quality = 'hd') {
    try {
      const videoInfo = await this.getVideoInfo(url);
      if (!videoInfo.success) {
        return videoInfo;
      }
      
      return { 
        success: true, 
        data: {
          downloadUrl: quality === 'hd' ? videoInfo.data.downloadUrlHD : videoInfo.data.downloadUrl,
          quality,
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  // Batch download
  async batchDownload(urls) {
    try {
      const response = await this.client.post('/batch-download', { urls });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  // Get user profile videos
  async getUserVideos(username) {
    try {
      const response = await this.client.get(`/user/${username}/videos`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  // Demo mode - for testing UI without backend
  async getDemoData(url) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    return {
      success: true,
      data: {
        videoId: '7123456789',
        author: {
          username: 'demo_user',
          nickname: 'Demo User',
          avatar: 'https://via.placeholder.com/100',
        },
        title: 'This is a demo video 🎉 The actual video would be downloaded with a real API connection.',
        thumbnail: 'https://via.placeholder.com/300x400?text=Demo+Video',
        cover: 'https://via.placeholder.com/300x400?text=Demo+Cover',
        duration: 15,
        createTime: Date.now() - 86400000,
        stats: {
          plays: 125000,
          likes: 15000,
          comments: 234,
          shares: 567,
        },
        music: {
          title: 'Demo Music',
          author: 'Demo Artist',
        },
        downloadUrl: '#demo',
        downloadUrlNoWatermark: '#demo-no-watermark',
        downloadUrlHD: '#demo-hd',
        isDemo: true,
      },
    };
  }

  // Use real API or demo based on configuration
  async getVideo(url) {
    // Try to use backend API first (free, no key needed)
    try {
      console.log('Attempting to fetch from backend:', API_BASE_URL);
      const result = await this.getVideoInfo(url);
      console.log('Backend response:', result);
      
      if (result.success && !result.data.isDemo) {
        console.log('✅ Using real backend API!');
        return result;
      }
    } catch (error) {
      console.error('Backend error:', error);
      console.log('Backend not available, using demo mode');
    }
    
    // Fall back to demo mode if backend is not running
    console.log('⚠️ Using demo mode');
    return this.getDemoData(url);
  }
}

export default new TikTokAPI();
