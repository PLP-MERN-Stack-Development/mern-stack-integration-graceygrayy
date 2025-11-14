# Project Directory Structure

## Complete File Tree

```
mern-stack-integration-graceygrayy/
│
├── 📄 README.md                       # Main project documentation
├── 📄 SETUP_GUIDE.md                  # Detailed setup and API documentation
├── 📄 QUICK_START.md                  # Quick start checklist
├── 📄 FEATURES_IMPLEMENTED.md         # Complete feature checklist
├── 📄 PROJECT_SUMMARY.md              # This file
├── 📄 Week4-Assignment.md             # Assignment requirements
│
├── 📂 server/                         # Express.js Backend
│   │
│   ├── 📂 models/                     # Mongoose Models
│   │   ├── 📄 User.js                 # User schema with auth
│   │   ├── 📄 Post.js                 # Post schema with comments
│   │   └── 📄 Category.js             # Category schema
│   │
│   ├── 📂 controllers/                # Route Controllers
│   │   ├── 📄 authController.js       # Authentication logic
│   │   ├── 📄 postController.js       # Post operations
│   │   └── 📄 categoryController.js   # Category operations
│   │
│   ├── 📂 routes/                     # API Routes
│   │   ├── 📄 auth.js                 # /api/auth routes
│   │   ├── 📄 posts.js                # /api/posts routes
│   │   └── 📄 categories.js           # /api/categories routes
│   │
│   ├── 📂 middleware/                 # Custom Middleware
│   │   ├── 📄 auth.js                 # JWT validation middleware
│   │   └── 📄 errorHandler.js         # Error handling middleware
│   │
│   ├── 📂 utils/                      # Utility Functions
│   │   ├── 📄 jwt.js                  # JWT token functions
│   │   └── 📄 validationRules.js      # Input validation rules
│   │
│   ├── 📂 uploads/                    # User Uploads Directory
│   │   └── (empty - for future uploads)
│   │
│   ├── 📄 server.js                   # Main Express server file
│   ├── 📄 package.json                # Backend dependencies
│   ├── 📄 .env                        # Environment variables (configured)
│   ├── 📄 .env.example                # Environment template
│   └── 📄 .gitignore                  # Git ignore rules
│
└── 📂 client/                         # React.js Frontend
    │
    ├── 📂 src/
    │   │
    │   ├── 📂 components/             # Reusable Components
    │   │   ├── 📄 Navigation.jsx      # Navigation bar
    │   │   ├── 📄 Navigation.css
    │   │   ├── 📄 PostCard.jsx        # Post card component
    │   │   ├── 📄 PostCard.css
    │   │   ├── 📄 Loading.jsx         # Loading spinner
    │   │   └── 📄 Loading.css
    │   │
    │   ├── 📂 pages/                  # Page Components
    │   │   ├── 📄 HomePage.jsx        # Home page with post list
    │   │   ├── 📄 HomePage.css
    │   │   ├── 📄 SinglePostPage.jsx  # Post detail page
    │   │   ├── 📄 SinglePostPage.css
    │   │   ├── 📄 CreatePostPage.jsx  # Create/edit post form
    │   │   ├── 📄 CreatePostPage.css
    │   │   ├── 📄 LoginPage.jsx       # Login form
    │   │   ├── 📄 RegisterPage.jsx    # Registration form
    │   │   └── 📄 AuthPage.css        # Auth styles
    │   │
    │   ├── 📂 hooks/                  # Custom Hooks
    │   │   └── 📄 useApi.js           # Custom API hook
    │   │
    │   ├── 📂 context/                # Context Providers
    │   │   ├── 📄 AuthContext.jsx     # Authentication context
    │   │   └── 📄 PostContext.jsx     # Posts context
    │   │
    │   ├── 📂 services/               # API Services
    │   │   └── 📄 api.js              # Axios instance
    │   │
    │   ├── 📄 App.jsx                 # Main app component with routing
    │   ├── 📄 App.css                 # App styles
    │   ├── 📄 main.jsx                # React entry point
    │   └── 📄 index.css               # Global styles
    │
    ├── 📂 public/                     # Static Files
    │   └── 📄 index.html              # HTML template
    │
    ├── 📄 package.json                # Frontend dependencies
    ├── 📄 vite.config.js              # Vite configuration
    ├── 📄 .env                        # Environment variables (configured)
    ├── 📄 .env.example                # Environment template
    └── 📄 .gitignore                  # Git ignore rules
```

---

## File Count Summary

```
Backend (server/)
  ├── Models: 3 files
  ├── Controllers: 3 files
  ├── Routes: 3 files
  ├── Middleware: 2 files
  ├── Utils: 2 files
  ├── Config: 3 files (.env, .env.example, .gitignore)
  └── Total: ~18 files

Frontend (client/)
  ├── Components: 6 files (JSX + CSS)
  ├── Pages: 10 files (JSX + CSS)
  ├── Hooks: 1 file
  ├── Context: 2 files
  ├── Services: 1 file
  ├── Core: 3 files (App.jsx, main.jsx, index.css)
  ├── Public: 1 file (index.html)
  ├── Config: 4 files (package.json, vite.config.js, .env, .gitignore)
  └── Total: ~28 files

Documentation
  ├── README.md
  ├── SETUP_GUIDE.md
  ├── QUICK_START.md
  ├── FEATURES_IMPLEMENTED.md
  ├── PROJECT_SUMMARY.md
  ├── Week4-Assignment.md
  └── Total: 6 files

Grand Total: ~52 files (excluding node_modules)
```

---

## Key Files Description

### Backend Key Files

| File | Purpose |
|------|---------|
| `server/server.js` | Express app initialization, middleware setup, route registration |
| `server/models/User.js` | User schema, password hashing, authentication methods |
| `server/models/Post.js` | Post schema, comments array, slug generation, view tracking |
| `server/models/Category.js` | Category schema, slug generation, post count |
| `server/controllers/authController.js` | Register, login, profile management |
| `server/controllers/postController.js` | CRUD operations, search, comments |
| `server/controllers/categoryController.js` | Category management |
| `server/middleware/auth.js` | JWT verification, token validation |
| `server/utils/jwt.js` | Token generation and verification |
| `server/utils/validationRules.js` | Input validation rules |

### Frontend Key Files

| File | Purpose |
|------|---------|
| `client/src/App.jsx` | Main app, routing, protected routes |
| `client/src/main.jsx` | React entry point, DOM mounting |
| `client/src/context/AuthContext.jsx` | Authentication state management |
| `client/src/context/PostContext.jsx` | Posts and categories state |
| `client/src/hooks/useApi.js` | API call wrapper with loading/error states |
| `client/src/pages/HomePage.jsx` | Post listing with search and filter |
| `client/src/pages/SinglePostPage.jsx` | Post details and comments |
| `client/src/pages/CreatePostPage.jsx` | Create/edit post form |
| `client/src/pages/LoginPage.jsx` | User login |
| `client/src/pages/RegisterPage.jsx` | User registration |
| `client/src/components/Navigation.jsx` | Top navigation bar |
| `client/src/components/PostCard.jsx` | Post display card |
| `client/src/components/Loading.jsx` | Loading indicator |

---

## Configuration Files

### server/.env
```
MONGODB_URI=mongodb://localhost:27017/mern-blog
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key_not_for_production
JWT_EXPIRE=7d
```

### client/.env
```
VITE_API_URL=http://localhost:5000/api
```

---

## Dependencies Summary

### Backend (server/package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "jsonwebtoken": "^9.1.0",
    "bcryptjs": "^2.4.3",
    "express-validator": "^7.0.0",
    "axios": "^1.6.2",
    "multer": "^1.4.5-lts.1"
  }
}
```

### Frontend (client/package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "vite": "^5.0.2",
    "@vitejs/plugin-react": "^4.2.1"
  }
}
```

---

## File Naming Conventions

- **Models**: PascalCase (e.g., `User.js`, `Post.js`)
- **Controllers**: camelCase with Controller suffix (e.g., `postController.js`)
- **Routes**: camelCase (e.g., `posts.js`)
- **Components**: PascalCase (e.g., `Navigation.jsx`)
- **Pages**: PascalCase with Page suffix (e.g., `HomePage.jsx`)
- **Styles**: Lowercase matching component (e.g., `Navigation.css`)
- **Hooks**: camelCase with use prefix (e.g., `useApi.js`)

---

## Git Ignore Files

Both `server/.gitignore` and `client/.gitignore` ignore:
- `node_modules/`
- `.env` (local environment)
- `dist/` and `build/`
- Log files
- OS files (.DS_Store)

---

## Next Steps

To add new features:

1. **New Model**: Add file in `server/models/`
2. **New Route**: Add controller in `server/controllers/` and route in `server/routes/`
3. **New Page**: Add component in `client/src/pages/`
4. **New Component**: Add in `client/src/components/`
5. **Update Context**: Modify `client/src/context/` files
6. **Update Styles**: Create matching `.css` file

---

This structure ensures:
- ✅ Clear separation of concerns
- ✅ Easy to navigate
- ✅ Scalable architecture
- ✅ Maintainable code
- ✅ Professional organization

**All files are created and ready to use!**
