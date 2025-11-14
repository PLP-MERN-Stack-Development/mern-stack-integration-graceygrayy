// PostContext.jsx - Context for posts state management

import React, { createContext, useState, useCallback, useEffect } from 'react';
import api from '../hooks/useApi';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  // Fetch all posts
  const fetchPosts = useCallback(async (page = 1, limit = 10, category = null, search = null) => {
    setLoading(true);
    setError(null);

    try {
      let url = `/posts?page=${page}&limit=${limit}`;
      if (category) url += `&category=${category}`;
      if (search) url += `&search=${search}`;

      const response = await api.get(url);
      setPosts(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single post
  const fetchPost = useCallback(async (idOrSlug) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/posts/${idOrSlug}`);
      setCurrentPost(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create post
  const createPost = useCallback(async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      setPosts([response.data, ...posts]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
      throw err;
    }
  }, [posts]);

  // Update post
  const updatePost = useCallback(async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      setPosts(posts.map((p) => (p._id === id ? response.data : p)));
      setCurrentPost(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
      throw err;
    }
  }, [posts]);

  // Delete post
  const deletePost = useCallback(
    async (id) => {
      try {
        await api.delete(`/posts/${id}`);
        setPosts(posts.filter((p) => p._id !== id));
        return true;
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete post');
        throw err;
      }
    },
    [posts]
  );

  // Add comment
  const addComment = useCallback(async (postId, comment) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, {
        content: comment,
      });
      setCurrentPost(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add comment');
      throw err;
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch categories');
    }
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const value = {
    posts,
    currentPost,
    categories,
    loading,
    error,
    pagination,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    addComment,
    fetchCategories,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
