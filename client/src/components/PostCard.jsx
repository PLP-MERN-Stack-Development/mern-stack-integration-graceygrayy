// PostCard.jsx - Component to display post in a card format

import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  const truncateContent = (content, length = 150) => {
    if (content.length > length) {
      return content.substring(0, length) + '...';
    }
    return content;
  };

  return (
    <div className="post-card">
      {post.featuredImage && post.featuredImage !== 'default-post.jpg' && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="post-card-image"
        />
      )}
      <div className="post-card-content">
        <div className="post-meta">
          <span className="post-category">{post.category?.name}</span>
          <span className="post-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h2 className="post-title">
          <Link to={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="post-excerpt">
          {post.excerpt || truncateContent(post.content)}
        </p>
        <div className="post-footer">
          <span className="post-author">By {post.author?.name}</span>
          <span className="post-views">👁️ {post.viewCount} views</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
