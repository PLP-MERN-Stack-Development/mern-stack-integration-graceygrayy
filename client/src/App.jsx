// App.jsx - Main App component with routing

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import CreatePostPage from './pages/CreatePostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:slug" element={<SinglePostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/:id/edit"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
