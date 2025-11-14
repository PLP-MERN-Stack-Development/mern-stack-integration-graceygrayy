// CreatePostPage.jsx - Page for creating or editing a post

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { categories, createPost, updatePost, fetchPost, currentPost } = useContext(PostContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    isPublished: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (id) {
      fetchPost(id).then((post) => {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          category: post.category._id,
          tags: post.tags.join(', '),
          isPublished: post.isPublished,
        });
      });
    }
  }, [id, isAuthenticated]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    if (!formData.category) {
      setError('Category is required');
      return;
    }

    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
      };

      if (id) {
        await updatePost(id, data);
        navigate(`/posts/${currentPost.slug}`);
      } else {
        const newPost = await createPost(data);
        navigate(`/posts/${newPost.slug}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <div className="form-container">
        <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Post title..."
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt (optional):</label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief excerpt..."
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated):</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="tag1, tag2, tag3"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content..."
              rows="10"
              disabled={loading}
            ></textarea>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="isPublished">Publish this post</label>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
