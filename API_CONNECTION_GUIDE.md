# 🔌 API Connection Guide - Real Downloads

## 🎯 Current Status

Your app now supports **real API connections**! Choose one of the options below to enable actual video downloads.

---

## 🚀 Quick Setup (3 Minutes)

### **Option 1: RapidAPI (Easiest - Recommended)**

#### Step 1: Get API Key
1. Go to [RapidAPI](https://rapidapi.com/)
2. Sign up for free account
3. Search for "TikTok Downloader" or "TikTok Video"
4. Subscribe to one of these APIs (free tier available):
   - **TikTok Download Without Watermark**
   - **TikTok Scraper**
   - **TikTok Video Downloader**

#### Step 2: Get Your API Key
1. After subscribing, go to the API page
2. Click "Code Snippets"
3. Copy your **X-RapidAPI-Key**

#### Step 3: Add to Your App
1. Create `.env` file in root directory:
```bash
REACT_APP_RAPIDAPI_KEY=your_api_key_here
```

2. Restart the app:
```bash
npm start
```

#### Step 4: Test It!
- Paste a real TikTok URL
- Click "Get Video"
- **Real video will load!** 🎉

---

## 📦 Recommended APIs

### 1. **TikTok Download Without Watermark**
- **URL**: https://rapidapi.com/yi005/api/tiktok-download-without-watermark
- **Free Tier**: 100 requests/month
- **Features**: No watermark, HD support
- **Rating**: ⭐⭐⭐⭐⭐

### 2. **TikTok Scraper**
- **URL**: https://rapidapi.com/tikwm-tikwm-default/api/tiktok-scraper7
- **Free Tier**: 500 requests/month
- **Features**: Fast, reliable
- **Rating**: ⭐⭐⭐⭐

### 3. **TikTok Video Downloader**
- **URL**: https://rapidapi.com/maatootz/api/tiktok-video-no-watermark2
- **Free Tier**: 100 requests/month
- **Features**: Multiple quality options
- **Rating**: ⭐⭐⭐⭐

---

## 🛠️ Alternative Options

### **Option 2: Custom Backend (Free, Unlimited)**

I've included a backend server template. Set it up:

#### Step 1: Install Backend Dependencies
```bash
npm install express cors dotenv axios
```

#### Step 2: Update `server/index.js`

```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/video-info', async (req, res) => {
  try {
    const { url } = req.body;
    
    // Use TikTok scraping library or service
    // Example with tikwm.com API (free, no key needed)
    const response = await axios.post('https://www.tikwm.com/api/', {
      url: url,
      hd: 1
    });

    if (response.data.code === 0) {
      res.json({
        videoId: response.data.data.id,
        author: {
          username: response.data.data.author.unique_id,
          nickname: response.data.data.author.nickname,
          avatar: response.data.data.author.avatar,
        },
        title: response.data.data.title,
        thumbnail: response.data.data.cover,
        duration: response.data.data.duration,
        stats: response.data.data.statistics,
        downloadUrl: response.data.data.play,
        downloadUrlNoWatermark: response.data.data.wmplay,
        downloadUrlHD: response.data.data.hdplay,
      });
    } else {
      res.status(400).json({ error: 'Failed to fetch video' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('API server running on port 5000');
});
```

#### Step 3: Start Backend
```bash
node server/index.js
```

#### Step 4: Update Frontend
In `.env`:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

---

### **Option 3: Public Free APIs**

Use these free APIs (no key needed, but limited):

#### tikwm.com API
```javascript
// In src/services/api.js, add this method:
async getVideoFromTikwm(url) {
  try {
    const response = await axios.post('https://www.tikwm.com/api/', {
      url: url,
      hd: 1
    });
    
    if (response.data.code === 0) {
      return { success: true, data: response.data.data };
    }
    return { success: false, error: 'Failed to fetch video' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

#### Limitations:
- Rate limited
- May be blocked by CORS
- Less reliable than paid APIs

---

## ⚡ Testing Your Setup

### Test with Real URLs:
```
https://www.tiktok.com/@zachking/video/7153034074277694766
https://www.tiktok.com/@selenagomez/video/7064314129036496173
https://www.tiktok.com/@therock/video/7125629781170261291
```

### Expected Results:
✅ Video loads with real data
✅ Thumbnail displays
✅ Stats show actual numbers
✅ Download buttons work
✅ No "Demo mode" message

---

## 🔍 Troubleshooting

### "API Key Invalid"
- Check you copied the full key
- Verify subscription is active
- Try regenerating the key

### "CORS Error"
- Use backend proxy (Option 2)
- Or enable CORS in API settings

### "Rate Limit Exceeded"
- Upgrade plan
- Use backend caching
- Implement request throttling

### "Video Not Found"
- Check URL is valid
- Try different API
- Ensure video is public

---

## 💰 Cost Comparison

| Option | Cost | Requests/Month | Pros | Cons |
|--------|------|----------------|------|------|
| **RapidAPI Free** | $0 | 100-500 | Easy setup, Reliable | Limited requests |
| **RapidAPI Paid** | $10-50 | 10,000+ | High limits, Fast | Monthly cost |
| **Custom Backend** | $0 | Unlimited | Free, Full control | Setup required |
| **Public APIs** | $0 | ~100 | No key needed | Unreliable |

---

## 🎯 Recommended Path

### For Testing:
1. Use **Demo Mode** (current, no setup)
2. Or **RapidAPI Free Tier** (100 requests)

### For Personal Use:
1. **Custom Backend** with tikwm.com
2. Or **RapidAPI Basic Plan** ($10/month)

### For Production:
1. **RapidAPI Pro Plan** ($50/month)
2. With **Backend Caching**
3. And **Rate Limiting**

---

## 📝 Code Changes Made

I've updated your code to support real APIs:

✅ `src/services/api.js` - Added RapidAPI integration
✅ `src/services/api.js` - Added response transformation
✅ `src/services/api.js` - Added smart fallback (real API → demo)
✅ `src/components/VideoDownloader.js` - Updated to use new API
✅ `.env.example` - Added configuration template

---

## 🚀 Next Steps

### To Enable Real Downloads NOW:

1. **Get RapidAPI Key** (5 minutes)
   - Sign up at rapidapi.com
   - Subscribe to TikTok API
   - Copy your key

2. **Create .env file**
   ```bash
   REACT_APP_RAPIDAPI_KEY=your_key_here
   ```

3. **Restart app**
   ```bash
   npm start
   ```

4. **Test with real URL!**

---

## ✨ Features Once Connected

- ✅ Real video downloads
- ✅ HD quality support
- ✅ No watermark videos
- ✅ Actual stats (views, likes)
- ✅ Real author info
- ✅ Working music details
- ✅ Multiple quality options

---

## 🎉 You're Ready!

Your app is **fully configured** to work with real APIs. Just add an API key and start downloading! 

**Questions?** Check API_SETUP.md for more details!

---

**Happy Downloading!** 🚀
