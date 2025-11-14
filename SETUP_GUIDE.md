# MERN Stack Blog Application - Setup Guide

## ✅ Completed Implementation

This is a fully-functional MERN (MongoDB, Express.js, React.js, Node.js) blog application with all essential features implemented.

### Backend Features Completed
- ✅ Express.js REST API with proper routing
- ✅ MongoDB with Mongoose for data modeling
- ✅ JWT authentication with bcryptjs password hashing
- ✅ Three Mongoose models: User, Post, Category
- ✅ Complete CRUD operations for posts and categories
- ✅ Comments system on posts
- ✅ Search and filtering functionality
- ✅ Pagination support
- ✅ Input validation with express-validator
- ✅ Comprehensive error handling middleware
- ✅ Role-based authorization (user, admin)

### Frontend Features Completed
- ✅ React.js with React Router for navigation
- ✅ Context API for state management (AuthContext, PostContext)
- ✅ Custom useApi hook for API calls with loading/error states
- ✅ Vite build tool configuration
- ✅ Responsive CSS styling
- ✅ Protected routes for authenticated users
- ✅ Authentication pages (Login, Register)
- ✅ Blog post pages (Home, Single Post, Create/Edit)
- ✅ Navigation component with auth state
- ✅ Post card components with metadata
- ✅ Comments display and creation
- ✅ Search and category filtering

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

#### Server Setup
```bash
cd server
npm install
```

#### Client Setup
```bash
cd client
npm install
```

### Step 2: Configure Environment Variables

#### Server (.env)
Already created at `server/.env` with:
```
MONGODB_URI=mongodb://localhost:27017/mern-blog
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key_not_for_production
JWT_EXPIRE=7d
```

**For Production**: Change JWT_SECRET to a secure random string

#### Client (.env)
Already created at `client/.env` with:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Update MONGODB_URI in server/.env:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog
```

### Step 4: Run the Application

#### Terminal 1 - Start Backend Server
```bash
cd server
npm run dev
```

Expected output:
```
Connected to MongoDB
Server running on port 5000
```

#### Terminal 2 - Start Frontend Dev Server
```bash
cd client
npm run dev
```

Expected output:
```
  VITE v5.0.2  ready in 123 ms

  ➜  Local:   http://localhost:3000/
```

### Step 5: Test the Application

1. Open browser and navigate to `http://localhost:3000`
2. Click "Register" to create a new account
3. Login with your credentials
4. Click "Create Post" to write a blog post
5. Select a category or create one through the API
6. View posts on the home page
7. Click on a post to view details and add comments

## 📚 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Body: { name, email, password }
Response: { token, user }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Posts Endpoints

#### Get All Posts
```
GET /api/posts?page=1&limit=10&category=categoryId&search=query
Response: { data: [posts], pagination }
```

#### Get Single Post
```
GET /api/posts/:idOrSlug
Response: { data: post }
```

#### Create Post (Authenticated)
```
POST /api/posts
Headers: { Authorization: "Bearer token" }
Body: { title, content, excerpt, category, tags, isPublished }
Response: { data: post }
```

#### Update Post (Authenticated, Author or Admin)
```
PUT /api/posts/:id
Headers: { Authorization: "Bearer token" }
Body: { title, content, excerpt, category, tags, isPublished }
Response: { data: post }
```

#### Delete Post (Authenticated, Author or Admin)
```
DELETE /api/posts/:id
Headers: { Authorization: "Bearer token" }
Response: { success: true, message }
```

#### Add Comment (Authenticated)
```
POST /api/posts/:id/comments
Headers: { Authorization: "Bearer token" }
Body: { content }
Response: { data: updatedPost }
```

### Categories Endpoints

#### Get All Categories
```
GET /api/categories
Response: { data: [categories] }
```

#### Create Category (Admin Only)
```
POST /api/categories
Headers: { Authorization: "Bearer token" }
Body: { name, description }
Response: { data: category }
```

## 🗂️ File Structure Summary

```
client/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx       # Main navigation bar
│   │   ├── PostCard.jsx         # Post display card
│   │   └── Loading.jsx          # Loading spinner
│   ├── pages/
│   │   ├── HomePage.jsx         # Posts listing page
│   │   ├── SinglePostPage.jsx   # Post detail page
│   │   ├── CreatePostPage.jsx   # Create/edit post form
│   │   ├── LoginPage.jsx        # Login form
│   │   └── RegisterPage.jsx     # Registration form
│   ├── hooks/
│   │   └── useApi.js            # Custom API hook
│   ├── context/
│   │   ├── AuthContext.jsx      # Auth state management
│   │   └── PostContext.jsx      # Posts state management
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # Entry point
├── public/
│   └── index.html
└── package.json

server/
├── models/
│   ├── User.js                  # User schema
│   ├── Post.js                  # Post schema
│   └── Category.js              # Category schema
├── controllers/
│   ├── authController.js        # Auth logic
│   ├── postController.js        # Post operations
│   └── categoryController.js    # Category operations
├── routes/
│   ├── auth.js                  # Auth routes
│   ├── posts.js                 # Post routes
│   └── categories.js            # Category routes
├── middleware/
│   ├── auth.js                  # JWT validation
│   └── errorHandler.js          # Error handling
├── utils/
│   ├── jwt.js                   # JWT utilities
│   └── validationRules.js       # Input validation
└── server.js                    # Express app
```

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Authorization checks for protected routes
- ✅ Consistent error messages (no sensitive info leakage)

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or update MONGODB_URI for Atlas

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in server/.env or kill the process using the port

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Ensure VITE_API_URL in client/.env matches the server URL

### Token Expired
```
Error: Token has expired
```
**Solution**: User needs to login again to get a new token

## 📦 Available Scripts

### Server Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (configured but not implemented)
```

### Client Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code (if configured)
```

## 🎯 Next Steps & Enhancements

1. **Image Upload**
   - Install `multer` for file uploads
   - Add image upload endpoint
   - Store images in uploads folder or cloud storage

2. **Rich Text Editor**
   - Integrate Quill or Draft.js
   - Store rich content in database
   - Display formatted content

3. **Email Notifications**
   - Use Nodemailer
   - Send notifications on new comments
   - Email verification on registration

4. **Analytics**
   - Track page views
   - User engagement metrics
   - Popular posts

5. **Production Deployment**
   - Deploy server to Heroku, Railway, or similar
   - Deploy frontend to Vercel or Netlify
   - Use MongoDB Atlas for database
   - Set secure environment variables

6. **Testing**
   - Unit tests with Jest
   - Integration tests
   - E2E tests with Cypress

7. **Performance**
   - Implement caching
   - Optimize database queries
   - Code splitting in React

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation
3. Check browser console for errors
4. Check server logs for backend errors

## 🎓 Learning Resources

- [MERN Stack Tutorial](https://reactjs.org/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB University](https://university.mongodb.com/)
- [React Router Docs](https://reactrouter.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

**Congratulations! Your MERN Blog Application is ready to use! 🎉**
