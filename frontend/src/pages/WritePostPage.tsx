import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createPost, updatePost } from '../api';
import toast from 'react-hot-toast';

const WritePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: '',
    coverImage: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      content: form.content,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      coverImage: form.coverImage,
      published: form.published,
    };

    try {
      if (editId) {
        await updatePost(editId, payload);
        toast.success('Post updated!');
      } else {
        await createPost(payload);
        toast.success('Post created!');
      }
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to save post';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="write-page">
      <h1>{editId ? 'Edit Post' : 'Write a New Post'}</h1>

      <form id="write-post-form" onSubmit={handleSubmit} className="write-form">
        <div className="form-group">
          <label htmlFor="post-title">Title *</label>
          <input
            id="post-title"
            name="title"
            type="text"
            placeholder="Your post title..."
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-content">Content *</label>
          <textarea
            id="post-content"
            name="content"
            rows={16}
            placeholder="Write your post content here... (HTML supported)"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="post-tags">Tags (comma separated)</label>
            <input
              id="post-tags"
              name="tags"
              type="text"
              placeholder="e.g. tech, tutorial, react"
              value={form.tags}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="post-cover">Cover Image URL</label>
            <input
              id="post-cover"
              name="coverImage"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.coverImage}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-checkbox">
          <input
            id="post-published"
            name="published"
            type="checkbox"
            checked={form.published}
            onChange={handleChange}
          />
          <label htmlFor="post-published">Publish immediately</label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
          <button id="submit-post-btn" type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editId ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default WritePostPage;
