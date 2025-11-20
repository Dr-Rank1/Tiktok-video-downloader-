# API Setup Guide 🔧

This guide explains how to set up a real API backend for downloading TikTok videos.

## Current Status

The app is currently running in **DEMO MODE**, which means:
- ✅ All UI features work perfectly
- ✅ You can test all functionality
- ❌ Actual video downloads are simulated

To enable real downloads, you need to set up an API backend.

---

## Option 1: RapidAPI (Easiest - Recommended for Beginners)

### Steps:

1. **Sign up for RapidAPI:**
   - Go to [https://rapidapi.com/](https://rapidapi.com/)
   - Create a free account

2. **Subscribe to a TikTok API:**
   - Search for "TikTok Downloader" in the marketplace
   - Popular options:
     - TikTok Download Without Watermark
     - TikTok Scraper
     - TikTok Data API
   - Subscribe to the free tier

3. **Get your API key:**
   - Copy your RapidAPI key from the dashboard

4. **Update the code:**
   
   In `src/services/api.js`, replace the `getDemoData` method with:

   ```javascript
   async getVideoInfo(url) {
     try {
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
       return { success: true, data: this.transformResponse(response.data) };
     } catch (error) {
       return {
         success: false,
         error: error.response?.data?.message || error.message
       };
     }
   }
   ```

5. **Add API key to .env:**
   ```
   REACT_APP_RAPIDAPI_KEY=your_key_here
   ```

---

## Option 2: Custom Backend (Node.js)

### Using the Included Server

1. **Install backend dependencies:**
   ```bash
   npm install express cors dotenv
   ```

2. **Choose a TikTok scraping library:**
   
   **Option A: @tobyg74/tiktok-api-dl**
   ```bash
   npm install @tobyg74/tiktok-api-dl
   ```
   
   **Option B: tiktok-scraper**
   ```bash
   npm install tiktok-scraper
   ```

3. **Update `server/index.js`:**

   ```javascript
   // Example using @tobyg74/tiktok-api-dl
   const { TiktokDL } = require('@tobyg74/tiktok-api-dl');

   app.post('/api/video-info', async (req, res) => {
     try {
       const { url } = req.body;
       const result = await TiktokDL(url);
       
       if (result.status === 'success') {
         res.json({
           videoId: result.result.id,
           author: {
             username: result.result.author.username,
             nickname: result.result.author.nickname,
             avatar: result.result.author.avatar,
           },
           title: result.result.description,
           thumbnail: result.result.thumbnail,
           duration: result.result.duration,
           stats: result.result.statistics,
           downloadUrl: result.result.video,
           downloadUrlNoWatermark: result.result.video_no_watermark,
           downloadUrlHD: result.result.video_hd,
         });
       } else {
         res.status(400).json({ error: 'Failed to fetch video' });
       }
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });
   ```

4. **Update frontend API calls:**
   
   In `src/services/api.js`, change `getDemoData` to `getVideoInfo`:
   
   ```javascript
   // In VideoDownloader component
   const result = await api.getVideoInfo(url);
   ```

5. **Start the backend:**
   ```bash
   npm run server
   ```

---

## Option 3: Serverless Functions (Vercel/Netlify)

### Vercel Functions

1. **Create `api/video-info.js`:**
   ```javascript
   const { TiktokDL } = require('@tobyg74/tiktok-api-dl');

   module.exports = async (req, res) => {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' });
     }

     const { url } = req.body;
     const result = await TiktokDL(url);
     
     return res.json(result);
   };
   ```

2. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Update `.env`:**
   ```
   REACT_APP_API_URL=https://your-app.vercel.app/api
   ```

---

## Option 4: Puppeteer/Playwright (Advanced)

For more control, you can scrape TikTok directly using headless browsers:

```javascript
const puppeteer = require('puppeteer');

async function getTikTokVideo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url);
  
  // Extract video data from the page
  const videoData = await page.evaluate(() => {
    // Custom extraction logic
    return {
      // Video details
    };
  });
  
  await browser.close();
  return videoData;
}
```

---

## Important Notes

### Rate Limiting
- Most APIs have rate limits (e.g., 100 requests/month for free tier)
- Implement caching to reduce API calls
- Consider upgrading to paid plans for heavy usage

### Legal Considerations
- ⚠️ **Always respect TikTok's Terms of Service**
- Only download videos for personal use
- Never redistribute or commercialize downloaded content
- Respect creators' rights and copyright

### Error Handling
- Always implement proper error handling
- Provide user-friendly error messages
- Log errors for debugging

### Security
- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement rate limiting on your backend
- Validate and sanitize user inputs

---

## Testing Your Setup

1. **Test the API endpoint:**
   ```bash
   curl -X POST http://localhost:5000/api/video-info \
     -H "Content-Type: application/json" \
     -d '{"url":"https://www.tiktok.com/@user/video/123456789"}'
   ```

2. **Test in the app:**
   - Paste a real TikTok URL
   - Click "Get Video"
   - Check browser console for errors
   - Verify the video preview loads correctly

3. **Common Issues:**
   - **CORS errors:** Make sure your backend has CORS enabled
   - **API key errors:** Verify your API key is correct and active
   - **Network errors:** Check if the API endpoint is accessible
   - **Invalid URL:** Ensure you're using a valid TikTok video URL

---

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check the server logs
3. Verify your API key is active
4. Test the API endpoint directly with curl/Postman
5. Review the API documentation

---

## Production Deployment

When deploying to production:

1. **Environment Variables:**
   - Set all API keys in your hosting platform
   - Never use demo mode in production

2. **Backend Hosting:**
   - Deploy backend separately (Heroku, Railway, Render)
   - Or use serverless functions (Vercel, Netlify)

3. **Security:**
   - Enable HTTPS
   - Implement rate limiting
   - Add authentication if needed
   - Monitor API usage

4. **Optimization:**
   - Enable caching
   - Use CDN for static assets
   - Compress responses
   - Implement lazy loading
