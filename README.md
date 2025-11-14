# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js (MERN stack). This application demonstrates seamless integration between front-end and back-end components, including database operations, API communication, and state management.

## Features

### Core Features
- ✅ **RESTful API** with Express.js and MongoDB
- ✅ **Full CRUD Operations** for blog posts
- ✅ **User Authentication** with JWT tokens
- ✅ **User Authorization** with roles (user, admin)
- ✅ **React Router** for navigation
- ✅ **Context API** for state management
- ✅ **Input Validation** with express-validator
- ✅ **Error Handling** middleware
- ✅ **Comments** system for posts
- ✅ **Search & Filtering** functionality
- ✅ **Pagination** for post lists
- ✅ **Responsive UI** with CSS

### Advanced Features
- 🔐 User authentication with JWT
- 📝 Create, edit, and delete blog posts
- 💬 Comments on posts with user information
- 🏷️ Categories for organizing posts
- 🔍 Full-text search functionality
- 📊 View count tracking
- ⚡ Optimistic UI updates
- 🎨 Modern, responsive design

## Project Structure

```
mern-blog/
├── client/                          # React front-end
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── Loading.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── SinglePostPage.jsx
│   │   │   ├── CreatePostPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useApi.js
│   │   ├── context/                 # Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── PostContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── server/                          # Express.js back-end
│   ├── models/                      # Mongoose models
│   │   ├── Post.js
│   │   ├── User.js
│   │   └── Category.js
│   ├── controllers/                 # Route controllers
│   │   ├── postController.js
│   │   ├── categoryController.js
│   │   └── authController.js
│   ├── routes/                      # API routes
│   │   ├── posts.js
│   │   ├── categories.js
│   │   └── auth.js
│   ├── middleware/                  # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/                       # Utility functions
│   │   ├── validationRules.js
│   │   └── jwt.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn
- Git

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd mern-blog
```

#### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file based on `.env.example`:
```
MONGODB_URI=mongodb://localhost:27017/mern-blog
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
```

#### 3. Set up the client

```bash
cd ../client
npm install
```

Create a `.env` file based on `.env.example`:
```
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

#### Terminal 1 - Start the server
```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

#### Terminal 2 - Start the client
```bash
cd client
npm run dev
```

The client will run on `http://localhost:3000`

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts (with pagination, filtering, search)
- `GET /api/posts/:id` - Get a specific post by ID or slug
- `POST /api/posts` - Create a new post (authenticated)
- `PUT /api/posts/:id` - Update a post (authenticated, author or admin)
- `DELETE /api/posts/:id` - Delete a post (authenticated, author or admin)
- `POST /api/posts/:id/comments` - Add a comment to a post (authenticated)
- `GET /api/posts/search` - Search posts

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category
- `POST /api/categories` - Create a new category (admin only)
- `PUT /api/categories/:id` - Update a category (admin only)
- `DELETE /api/categories/:id` - Delete a category (admin only)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (authenticated)
- `PUT /api/auth/profile` - Update user profile (authenticated)

## Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: 'user', 'admin', default: 'user'),
  avatar: String (default: 'default-avatar.jpg'),
  bio: String (max: 500),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Schema
```javascript
{
  title: String (required, max: 100),
  content: String (required),
  featuredImage: String (default: 'default-post.jpg'),
  slug: String (required, unique),
  excerpt: String (max: 200),
  author: ObjectId (ref: 'User', required),
  category: ObjectId (ref: 'Category', required),
  tags: [String],
  isPublished: Boolean (default: false),
  viewCount: Number (default: 0),
  comments: [{
    user: ObjectId (ref: 'User'),
    content: String (required),
    createdAt: Date (default: now)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema
```javascript
{
  name: String (required, unique, max: 50),
  slug: String (required, unique),
  description: String (max: 200),
  postsCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## Technology Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Vite** - Build tool and dev server
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object modeling for MongoDB
- **JWT** - Authentication
- **express-validator** - Input validation
- **bcryptjs** - Password hashing

## Usage

### Creating a Blog Post
1. Register or login to your account
2. Navigate to "Create Post"
3. Fill in the post details (title, content, category, tags)
4. Choose to publish immediately or save as draft
5. Click "Create Post"

### Commenting on Posts
1. Login to your account
2. Navigate to a blog post
3. Scroll to the comments section
4. Write your comment and click "Post Comment"

### Searching Posts
1. Use the search bar on the home page
2. Enter keywords to search
3. Filter by category if needed

### Managing Categories
- Admin users can create, edit, and delete categories
- Categories can only be deleted if they have no posts

## Authentication Flow

1. **Registration**
   - User submits name, email, and password
   - Password is hashed using bcryptjs
   - User is created and JWT token is issued

2. **Login**
   - User submits email and password
   - Password is compared with hashed password
   - JWT token is issued upon successful authentication

3. **Protected Routes**
   - Token is sent in the Authorization header
   - Server verifies token validity
   - Request is processed if token is valid

## Error Handling

The application includes comprehensive error handling:

- **Validation Errors** - Invalid input data
- **Authentication Errors** - Invalid credentials or missing token
- **Authorization Errors** - Insufficient permissions
- **Database Errors** - MongoDB connection and query errors
- **Server Errors** - Unhandled exceptions

All errors are returned in a consistent JSON format:
```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Future Enhancements

- [ ] Image uploads for featured post images
- [ ] Rich text editor for post content
- [ ] Email notifications for new comments
- [ ] Post scheduling
- [ ] Draft auto-save
- [ ] Social media sharing
- [ ] Analytics and statistics
- [ ] Dark mode
- [ ] Multi-language support
- [ ] SEO optimization

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Commit and push to your branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please create an issue in the repository.

## Deployment

### Backend Deployment (Heroku, Railway, or similar)
1. Set environment variables on your hosting platform
2. Push your code to the hosting platform
3. Ensure MongoDB is connected

### Frontend Deployment (Vercel, Netlify, or similar)
1. Run `npm run build` to create production build
2. Deploy the `dist` folder to your hosting platform
3. Update API URLs in environment variables

## Testing

To test the application:

1. **Start both servers** (server and client)
2. **Create a test account** by registering
3. **Create test posts** with different categories
4. **Test search and filtering**
5. **Add comments** to posts
6. **Test authentication** by logging out and logging back in

## Performance Optimization

- JWT authentication for secure stateless communication
- MongoDB indexing on frequently queried fields
- Client-side caching with context API
- Lazy loading for large lists
- API request debouncing for search

## Security Considerations

- ✅ Passwords are hashed with bcryptjs
- ✅ JWT tokens for authentication
- ✅ Input validation with express-validator
- ✅ CORS enabled for cross-origin requests
- ✅ Error messages don't expose sensitive information
- ⚠️ In production, use HTTPS and secure JWT_SECRET

## Contact

For questions or feedback, please contact the development team.

---

**Happy Blogging! 📝** 