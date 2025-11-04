// App.jsx

import React, { useEffect, useState } from 'react';
import PostList from './components/PostList.jsx';
import PostForm from './components/PostForm.jsx';

// 1. DEFINE API CONSTANTS
// This will be the full URL in production and an empty string in development (due to proxy).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const POSTS_URL = `${API_BASE_URL}/api/posts`;

export default function App() {
  // ... (state definitions)

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      // 2. Use the consistent constant
      const res = await fetch(POSTS_URL);
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      // ... (sorting and setting posts)
    } catch (e) {
      setError(e.message || 'Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  // ... (useEffect remains the same)

  const handleCreate = async (post) => {
    // 3. Use the consistent constant
    const res = await fetch(POSTS_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(post)
    });
    // ...
    const saved = await res.json();
    setPosts(prev => [saved, ...prev]);
  };

  const handleUpdate = async (id, updates) => {
    // 4. Use the consistent constant
    const res = await fetch(`${POSTS_URL}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updates)
    });
    // ...
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    // 5. Use the consistent constant
    const res = await fetch(`${POSTS_URL}/${id}`, { method: 'DELETE' });
    // ...
  };

  // ... (return statement)
}