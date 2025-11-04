import React, { useState } from 'react';

export default function PostForm({ initial = {}, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [author, setAuthor] = useState(initial.author || '');
  const [content, setContent] = useState(initial.content || '');
  const [imageUrl, setImageUrl] = useState(initial.imageUrl || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    setError('');
    if (!author.trim()) {
      setError('Author is required');
      return;
    }
    setBusy(true);
    try {
      await onSubmit({ author: author.trim(), content, imageUrl: imageUrl?.trim() || null });
      if (!initial.id) {
        setAuthor('');
        setContent('');
        setImageUrl('');
      }
    } catch (err) {
      setError(err.message || 'Failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handle}>
      <div className="form-row">
        <label>Author</label>
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Content</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Image URL (optional)</label>
        <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      </div>

      {error && <div style={{color:'#b91c1c', marginBottom:8}}>{error}</div>}

      <div style={{display:'flex', gap:8}}>
        <button type="submit" disabled={busy} className="btn btn-primary">{busy ? 'Saving...' : submitLabel}</button>
        {onCancel && <button type="button" onClick={onCancel} className="btn btn-ghost">Cancel</button>}
      </div>
    </form>
  );
}