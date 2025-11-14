# Quick Start Checklist

## ✅ Pre-Installation

- [ ] Node.js v18+ installed
- [ ] MongoDB installed locally or MongoDB Atlas account created
- [ ] Git configured
- [ ] Text editor/IDE ready (VS Code recommended)

## ✅ Installation Steps

### Backend Setup
- [ ] Navigate to `server` directory
- [ ] Run `npm install`
- [ ] `.env` file already configured
- [ ] Verify MongoDB connection details

### Frontend Setup
- [ ] Navigate to `client` directory
- [ ] Run `npm install`
- [ ] `.env` file already configured
- [ ] Verify API URL

## ✅ Configuration

### MongoDB
- [ ] Start MongoDB service (local or use Atlas)
- [ ] Verify connection string in `.env`

### Environment Variables
- [ ] Server `.env` properly set
- [ ] Client `.env` properly set
- [ ] JWT_SECRET changed to secure value (production)

## ✅ Starting the Application

### Terminal 1 - Backend
- [ ] Navigate to `server` directory
- [ ] Run `npm run dev`
- [ ] Verify: "Connected to MongoDB" message appears
- [ ] Verify: "Server running on port 5000" message appears

### Terminal 2 - Frontend
- [ ] Navigate to `client` directory
- [ ] Run `npm run dev`
- [ ] Verify: Server starts on http://localhost:3000
- [ ] Wait for Vite to compile

### Browser
- [ ] Open http://localhost:3000
- [ ] Verify home page loads
- [ ] Verify navigation bar appears

## ✅ Testing the Application

### User Registration & Authentication
- [ ] Click "Register" button
- [ ] Fill in registration form (name, email, password)
- [ ] Successfully register
- [ ] Verify logged in (welcome message shown)

### Creating a Post
- [ ] Click "Create Post" button
- [ ] Fill in post form
- [ ] Select a category (or create one if needed)
- [ ] Add tags
- [ ] Submit post
- [ ] Verify post appears on home page

### Viewing Posts
- [ ] Click on a post from home page
- [ ] Verify post details load
- [ ] Verify author and date information
- [ ] Verify view count displayed

### Comments
- [ ] While viewing a post, scroll to comments section
- [ ] Write a comment
- [ ] Submit comment
- [ ] Verify comment appears in list

### Search & Filter
- [ ] Go to home page
- [ ] Use search bar to search for post
- [ ] Verify results show matching posts
- [ ] Filter by category
- [ ] Verify only posts from category shown

### Logout
- [ ] Click logout button in navbar
- [ ] Verify logged out (register/login buttons shown)

## ✅ Troubleshooting

### Issue: Cannot connect to MongoDB
- [ ] Verify MongoDB is running
- [ ] Check MONGODB_URI in .env
- [ ] Try restarting MongoDB service

### Issue: Port 5000 already in use
- [ ] Kill process using port 5000
- [ ] Or change PORT in server/.env

### Issue: API requests failing
- [ ] Verify VITE_API_URL is correct in client/.env
- [ ] Check server is running on port 5000
- [ ] Check browser console for CORS errors

### Issue: Cannot create posts
- [ ] Verify you're logged in
- [ ] Check that a category exists
- [ ] Check browser console for validation errors

## 📋 File Checklist

### Server Files
- [ ] `server/server.js` - Main server file
- [ ] `server/package.json` - Dependencies
- [ ] `server/.env` - Environment variables
- [ ] `server/models/` - Database models (User, Post, Category)
- [ ] `server/controllers/` - Route controllers
- [ ] `server/routes/` - API routes
- [ ] `server/middleware/` - Auth and error handling
- [ ] `server/utils/` - Validation and JWT utilities

### Client Files
- [ ] `client/src/App.jsx` - Main app component
- [ ] `client/package.json` - Dependencies
- [ ] `client/.env` - Environment variables
- [ ] `client/vite.config.js` - Vite configuration
- [ ] `client/src/components/` - Reusable components
- [ ] `client/src/pages/` - Page components
- [ ] `client/src/context/` - State management
- [ ] `client/src/hooks/` - Custom hooks
- [ ] `client/public/index.html` - HTML template

### Documentation
- [ ] `README.md` - Main documentation
- [ ] `SETUP_GUIDE.md` - Setup instructions
- [ ] `FEATURES_IMPLEMENTED.md` - Feature checklist
- [ ] `QUICK_START.md` - This file

## 🎯 Next Steps

### To Run in Production
- [ ] Build frontend: `cd client && npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Deploy backend to Heroku/Railway
- [ ] Update environment variables
- [ ] Use MongoDB Atlas instead of local

### To Add Features
- [ ] See SETUP_GUIDE.md for enhancement suggestions
- [ ] Implement image uploads
- [ ] Add email notifications
- [ ] Add analytics

### To Customize
- [ ] Modify styling in component CSS files
- [ ] Update branding in Navigation component
- [ ] Add your own categories
- [ ] Customize form fields

## 📞 Getting Help

1. **Check Documentation**
   - README.md for overview
   - SETUP_GUIDE.md for setup help
   - FEATURES_IMPLEMENTED.md for feature details

2. **Check Logs**
   - Browser console (F12) for frontend errors
   - Terminal for backend errors

3. **Check Code**
   - API calls in client/src/context/
   - Routes in server/routes/
   - Models in server/models/

4. **Restart Services**
   - Restart backend: Ctrl+C and run again
   - Restart frontend: Ctrl+C and run again

---

**You're all set! Happy blogging! 📝**
