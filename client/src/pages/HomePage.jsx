// HomePage.jsx - Home page displaying list of posts

import React, { useContext, useEffect } from 'react';
import { PostContext } from '../context/PostContext';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import './HomePage.css';

const HomePage = () => {
  const { posts, loading, error, fetchPosts, categories } = useContext(PostContext);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    fetchPosts(1, 10, selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(1, 10, selectedCategory, searchQuery);
  };

  if (loading) return <Loading />;

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Our Blog</h1>
        <p>Discover amazing stories and insights</p>
      </div>

      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="category-filters">
          <button
            className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`category-btn ${selectedCategory === cat._id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="no-posts">
            <p>No posts found. Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
