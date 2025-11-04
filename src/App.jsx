// App.jsx
import React, { useEffect, useState } from 'react';
import PostList from './components/PostList.jsx';
import PostForm from './components/PostForm.jsx';

// 1. Define a constant that uses an environment variable
// In a production build, VITE_API_BASE_URL will be the full Render URL.
// In a development build, it will likely be an empty string, allowing the relative path to work.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const POSTS_URL = `${API_BASE_URL}/api/posts`;

export default function App() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      // 2. Use the constant here
      const res = await fetch(POSTS_URL);
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      // Sort newest first
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(data);
    } catch (e) {
      setError(e.message || 'Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (post) => {
    // 3. Use the constant here
    const res = await fetch(POSTS_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(post)
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Create failed');
    }
    const saved = await res.json();
    setPosts(prev => [saved, ...prev]);
  };

  const handleUpdate = async (id, updates) => {
    // 4. Use the constant here
    const res = await fetch(`${POSTS_URL}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Update failed');
    const updated = await res.json();
    setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    // 5. Use the constant here
    const res = await fetch(`${POSTS_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Failed to delete');
      return;
    }
    setPosts(prev => prev.filter(p => p.id !== id));
  };
  
  // ... (rest of the component JSX)
// ...
}