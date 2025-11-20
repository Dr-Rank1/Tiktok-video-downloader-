# 🔑 RapidAPI Setup Guide

## 🎯 Why Add RapidAPI Key?

**Current Setup (Free Backend):**
✅ Works great
✅ No cost
✅ Unlimited downloads

**With RapidAPI (Optional Upgrade):**
✅ Even more reliable
✅ Faster response times
✅ Official TikTok data
✅ Automatic fallback to free backend if limit reached

---

## 🚀 Quick Setup (5 Minutes)

### **Step 1: Get RapidAPI Account**

1. Go to [RapidAPI.com](https://rapidapi.com/)
2. Click "Sign Up" (top right)
3. Sign up with:
   - Email
   - Google
   - GitHub

---

### **Step 2: Find TikTok API**

1. In the search bar, type: **"TikTok Download"**
2. Look for these recommended APIs:

#### **Option A: TikTok Download Without Watermark** (Recommended)
- **URL**: https://rapidapi.com/yi005/api/tiktok-download-without-watermark
- **Free Tier**: 100 requests/month
- **Price**: $0/month (free tier)
- **Features**: HD, No watermark, Fast

#### **Option B: TikTok Scraper**
- **URL**: https://rapidapi.com/tikwm-tikwm-default/api/tiktok-scraper7
- **Free Tier**: 500 requests/month
- **Price**: $0/month (free tier)
- **Features**: High volume, Reliable

---

### **Step 3: Subscribe to API**

1. Click on the API you chose
2. Click **"Subscribe to Test"** button
3. Choose **"Basic (Free)"** plan
4. Click **"Subscribe"**
5. No credit card required for free tier!

---

### **Step 4: Get Your API Key**

1. After subscribing, you'll see the API page
2. Click **"Code Snippets"** tab
3. Look for **"X-RapidAPI-Key"** in the code
4. Copy the key (looks like: `abc123def456...`)

Example:
```javascript
headers: {
  'X-RapidAPI-Key': 'abc123def456ghi789...',  // Copy this!
  'X-RapidAPI-Host': '...'
}
```

---

### **Step 5: Add to Your App**

1. Open the `.env` file in your project root
2. Find the line:
   ```
   REACT_APP_RAPIDAPI_KEY=
   ```
3. Paste your key after the `=`:
   ```
   REACT_APP_RAPIDAPI_KEY=abc123def456ghi789...
   ```
4. Save the file

---

### **Step 6: Restart Your App**

**Stop your frontend:**
- Press `Ctrl + C` in the npm start terminal

**Start again:**
```bash
npm start
```

**Backend stays running** - no need to restart it!

---

## ✨ How It Works Now

### **Smart Fallback System:**

```
1. App tries RapidAPI (if key exists)
   ↓ (if fails or no key)
2. Falls back to Free Backend
   ↓ (if fails)
3. Shows Demo Mode
```

**You get the best of both worlds!**

---

## 🎯 Testing

### **With RapidAPI Key:**
Paste a TikTok URL and you should see:
- ✅ Faster response (< 1 second)
- ✅ More detailed stats
- ✅ Higher quality thumbnails
- ✅ Console log: "Using RapidAPI"

### **Without RapidAPI Key:**
- ✅ Still works with free backend
- ✅ Unlimited downloads
- ✅ Console log: "Using free backend"

---

## 💰 Pricing Comparison

| Plan | Cost | Requests | Best For |
|------|------|----------|----------|
| **Free Backend** | $0 | Unlimited | Personal use |
| **RapidAPI Free** | $0 | 100-500/month | Testing |
| **RapidAPI Basic** | $10/month | 10,000/month | Heavy users |
| **RapidAPI Pro** | $50/month | 100,000/month | Commercial |

---

## 🔍 Checking Your Usage

1. Go to [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard)
2. Click on your subscribed API
3. View usage statistics
4. See remaining requests

---

## 🛠️ Troubleshooting

### **"Invalid API Key"**
- Check you copied the full key
- Make sure no spaces before/after
- Verify subscription is active
- Try regenerating the key

### **"Rate Limit Exceeded"**
✅ **Good news:** Your app automatically falls back to free backend!
- Wait for next month
- Or upgrade plan
- Or just use free backend

### **"CORS Error"**
- RapidAPI handles CORS automatically
- If you see this, restart your app
- Clear browser cache

### **Still Using Free Backend**
- Check `.env` file has correct key
- Restart frontend: `npm start`
- Check browser console for messages

---

## 📊 Monitoring

Your app will log which API it's using:

**Browser Console (F12):**
```javascript
// With RapidAPI
"Using RapidAPI for video fetch"

// Without RapidAPI
"Using free backend"

// If both fail
"Backend not available, using demo mode"
```

---

## 🎯 Recommended Setup

### **For Personal Use:**
```
✅ Free Backend (no API key)
✅ Unlimited downloads
✅ No cost
```

### **For Testing/Learning:**
```
✅ RapidAPI Free Tier
✅ 100-500 requests/month
✅ Best reliability
```

### **For Production/Commercial:**
```
✅ RapidAPI Basic Plan ($10/month)
✅ 10,000 requests/month
✅ With Free Backend fallback
```

---

## 🔐 Security

**Important:**
- ✅ `.env` is in `.gitignore` (your key is safe)
- ✅ Never commit `.env` to GitHub
- ✅ Never share your API key
- ✅ Regenerate if exposed

---

## ✅ Quick Checklist

Setup complete when:
- [ ] RapidAPI account created
- [ ] Subscribed to TikTok API
- [ ] API key copied
- [ ] Added to `.env` file
- [ ] Frontend restarted
- [ ] Tested with real URL
- [ ] Faster response confirmed

---

## 🎉 You're All Set!

Your app now has:
- ✅ Free unlimited backend
- ✅ Premium RapidAPI (optional)
- ✅ Smart fallback system
- ✅ Best reliability possible

---

## 🆘 Need Help?

**No API Key?**
- That's fine! Free backend works great
- No setup needed
- Unlimited downloads

**Want API Key?**
- Follow steps above
- Takes 5 minutes
- Completely optional

**Questions?**
- Check browser console
- See backend terminal logs
- Test with/without API key

---

**Happy Downloading!** 🚀

---

## 📝 Quick Reference

**Get API Key:**
1. https://rapidapi.com/
2. Sign up
3. Search "TikTok Download"
4. Subscribe (free)
5. Copy key

**Add to App:**
1. Open `.env`
2. Add key after `REACT_APP_RAPIDAPI_KEY=`
3. Save
4. Restart: `npm start`

**Test:**
- Paste TikTok URL
- Should be faster with key
- Still works without key
