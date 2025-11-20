const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TikTok Downloader API is running' });
});

// Get video info using tikwm.com (FREE, no API key needed!)
app.post('/api/video-info', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log('Fetching video:', url);

    // Use tikwm.com API (free, no key needed)
    const response = await axios.post('https://www.tikwm.com/api/', {
      url: url,
      hd: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (response.data.code === 0) {
      const data = response.data.data;
      
      // Transform to our format
      const videoData = {
        videoId: data.id,
        author: {
          username: data.author.unique_id,
          nickname: data.author.nickname,
          avatar: data.author.avatar,
        },
        title: data.title,
        thumbnail: data.cover,
        cover: data.origin_cover,
        duration: data.duration,
        createTime: data.create_time,
        stats: {
          plays: data.play_count,
          likes: data.digg_count,
          comments: data.comment_count,
          shares: data.share_count,
        },
        music: {
          title: data.music_info?.title || data.music,
          author: data.music_info?.author || 'Unknown',
        },
        // TikWM mapping: play = no watermark, wmplay = with watermark, hdplay = no watermark HD
        downloadUrl: data.wmplay,
        downloadUrlNoWatermark: data.play,
        downloadUrlHD: data.hdplay,
      };

      console.log('✅ Video fetched successfully:', data.title);
      res.json(videoData);
    } else {
      console.error('❌ API error:', response.data.msg);
      res.status(400).json({ error: response.data.msg || 'Failed to fetch video' });
    }
  } catch (error) {
    console.error('❌ Server error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch video', 
      details: error.message 
    });
  }
});

// Batch download endpoint
app.post('/api/batch-download', async (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: 'URLs array is required' });
    }

    const results = [];
    
    for (const url of urls) {
      try {
        const response = await axios.post('https://www.tikwm.com/api/', {
          url: url,
          hd: 1
        });

        if (response.data.code === 0) {
          results.push({
            url,
            status: 'success',
            data: response.data.data,
          });
        } else {
          results.push({
            url,
            status: 'error',
            error: response.data.msg,
          });
        }
      } catch (error) {
        results.push({
          url,
          status: 'error',
          error: error.message,
        });
      }
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║  🚀 TikTok Downloader API Server         ║');
  console.log('╚═══════════════════════════════════════════╝\n');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/video-info`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log('\n💡 Using tikwm.com API (FREE, no key needed!)');
  console.log('🎉 Ready to download TikTok videos!\n');
});
