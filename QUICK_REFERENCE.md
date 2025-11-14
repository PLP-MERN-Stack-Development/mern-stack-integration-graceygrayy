# MERN Blog App - Quick Reference Card

## 🚀 Quick Commands

```bash
# Start Backend
cd server && npm run dev

# Start Frontend
cd client && npm run dev

# Build for Production
cd client && npm run build

# Install Dependencies
npm install
```

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| MongoDB | localhost:27017 |

## 🔑 Key API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user

### Posts
- `GET /api/posts` - List all
- `GET /api/posts/:id` - Get one
- `POST /api/posts` - Create (auth)
- `PUT /api/posts/:id` - Update (auth)
- `DELETE /api/posts/:id` - Delete (auth)
- `POST /api/posts/:id/comments` - Add comment (auth)

### Categories
- `GET /api/categories` - List all
- `POST /api/categories` - Create (admin)
- `DELETE /api/categories/:id` - Delete (admin)

## 📁 Important Files

```
Server
  server.js ..................... Main server
  models/ ....................... Database schemas
  controllers/ .................. Business logic
  routes/ ....................... API endpoints
  middleware/ ................... Auth & errors

Client
  App.jsx ....................... Main component
  pages/ ........................ Page components
  context/ ...................... State management
  hooks/ ........................ Custom hooks
  components/ ................... Reusable UI
```

## 🎨 React Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Navigation | components/ | Top navbar |
| PostCard | components/ | Post display |
| HomePage | pages/ | Post list |
| SinglePostPage | pages/ | Post detail |
| CreatePostPage | pages/ | Create/edit |
| LoginPage | pages/ | Login form |
| RegisterPage | pages/ | Register form |

## 🔐 Authentication Flow

```
1. Register → User created, JWT issued
2. Login → Email/password verified, JWT issued
3. API Call → JWT in Authorization header
4. Server → Verifies JWT, processes request
5. Protected Routes → JWT required to access
```

## 📊 Database Models

### User
```javascript
{ name, email, password, role, avatar, bio, createdAt }
```

### Post
```javascript
{ title, content, slug, excerpt, author, category, 
  tags, isPublished, viewCount, comments, createdAt }
```

### Category
```javascript
{ name, slug, description, postsCount, createdAt }
```

## 🛠️ Development Tools

| Tool | Purpose | Command |
|------|---------|---------|
| Node.js | Runtime | `node --version` |
| npm | Package manager | `npm --version` |
| Express | Web framework | - |
| MongoDB | Database | `mongod` |
| React | UI library | - |
| Vite | Build tool | `npm run dev` |

## ⚙️ Configuration Files

```
server/.env ..................... Backend config
client/.env ..................... Frontend config
vite.config.js .................. Vite config
package.json .................... Dependencies
.gitignore ...................... Git ignore
```

## 🧪 Test Scenarios

1. **Register** → Fill form → Success
2. **Login** → Use credentials → Redirected
3. **Create Post** → Fill form → Appears on home
4. **View Post** → Click post → Shows details
5. **Add Comment** → Write comment → Appears
6. **Search** → Enter keyword → Results shown
7. **Filter** → Select category → Posts filtered
8. **Logout** → Click logout → Back to public

## ❌ Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Can't connect to MongoDB | Start mongod service |
| Port 5000 in use | Change PORT in .env |
| CORS error | Check VITE_API_URL |
| 401 Unauthorized | Login again, check token |
| 404 Not Found | Check route spelling |
| Validation error | Check input format |

## 📦 Installation Checklist

- [ ] Node.js v18+ installed
- [ ] MongoDB installed/running
- [ ] Dependencies installed (npm install)
- [ ] .env files configured
- [ ] Backend running (npm run dev)
- [ ] Frontend running (npm run dev)
- [ ] Ports 3000 & 5000 available
- [ ] MONGODB_URI correct

## 🎯 Usage Steps

1. Open http://localhost:3000
2. Register new account
3. Login with credentials
4. Click "Create Post"
5. Fill in post details
6. Submit
7. View posts on home page
8. Click post to view details
9. Add comment
10. Search or filter posts

## 📝 Example: Create Post

```javascript
{
  title: "My First Post",
  content: "This is the content",
  excerpt: "Brief summary",
  category: "63a4f8c9d7e2a1b3c5d9e2f1",
  tags: ["blog", "first"],
  isPublished: true
}
```

## 🔗 Quick Navigation

- **Frontend Start**: `cd client && npm run dev`
- **Backend Start**: `cd server && npm run dev`
- **MongoDB Start**: `mongod`
- **Database Check**: MongoDB Compass or shell
- **API Test**: Postman or cURL
- **Logs**: Browser console (F12) or terminal

## 💾 Important Endpoints

```bash
# Get all posts
curl http://localhost:5000/api/posts

# Get single post
curl http://localhost:5000/api/posts/my-post-slug

# Get categories
curl http://localhost:5000/api/categories

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass"}'
```

## 🎓 Learning Path

1. Understanding MERN stack
2. Backend API with Express
3. Database design with MongoDB
4. Frontend components with React
5. State management with Context
6. Routing with React Router
7. Authentication with JWT
8. Full integration

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔄 Component Flow

```
App.jsx (Router)
├── AuthProvider
├── PostProvider
├── Navigation
└── Routes
    ├── HomePage
    ├── SinglePostPage
    ├── CreatePostPage
    ├── LoginPage
    └── RegisterPage
```

## 🎨 Color Scheme (Default)

- Primary: #3498db (Blue)
- Success: #27ae60 (Green)
- Error: #e74c3c (Red)
- Background: #f5f5f5 (Light Gray)
- Text: #333 (Dark Gray)

## ✅ Checklist Before Production

- [ ] Change JWT_SECRET
- [ ] Use MongoDB Atlas
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure CORS properly
- [ ] Test all features
- [ ] Check error handling
- [ ] Review security
- [ ] Optimize performance
- [ ] Add analytics

---

**Quick Reference Ready! 📚**

For more details, see README.md or SETUP_GUIDE.md
