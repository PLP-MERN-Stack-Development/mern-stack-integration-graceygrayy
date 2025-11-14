// SinglePostPage.jsx - Page for viewing a single post with comments

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import './SinglePostPage.css';

const SinglePostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentPost, loading, error, fetchPost, addComment } = useContext(PostContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost(slug);
  }, [slug, fetchPost]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Please login to add a comment');
      navigate('/login');
      return;
    }

    if (!commentContent.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    setSubmitting(true);
    try {
      await addComment(currentPost._id, commentContent);
      setCommentContent('');
    } catch (err) {
      alert('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="error-page">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="error-page">
        <h2>Post Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="single-post-page">
      <article className="post-article">
        {currentPost.featuredImage && currentPost.featuredImage !== 'default-post.jpg' && (
          <img
            src={currentPost.featuredImage}
            alt={currentPost.title}
            className="featured-image"
          />
        )}

        <div className="post-header">
          <h1>{currentPost.title}</h1>
          <div className="post-meta">
            <span>By {currentPost.author?.name}</span>
            <span>•</span>
            <span>{new Date(currentPost.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{currentPost.category?.name}</span>
            <span>•</span>
            <span>👁️ {currentPost.viewCount} views</span>
          </div>
        </div>

        <div className="post-body">
          <p>{currentPost.content}</p>
        </div>

        {currentPost.tags && currentPost.tags.length > 0 && (
          <div className="post-tags">
            {currentPost.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <section className="comments-section">
        <h2>Comments ({currentPost.comments?.length || 0})</h2>

        {isAuthenticated && (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment..."
              className="comment-input"
              rows="4"
              disabled={submitting}
            ></textarea>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        )}

        <div className="comments-list">
          {currentPost.comments && currentPost.comments.length > 0 ? (
            currentPost.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div className="comment-header">
                  <strong>{comment.user?.name}</strong>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first!</p>
          )}
        </div>
      </section>

      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Posts
      </button>
    </div>
  );
};

export default SinglePostPage;
