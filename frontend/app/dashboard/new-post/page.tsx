'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';

const CATEGORIES = [
  'Tech', 'Business', 'Fashion', 'Gaming', 'Music',
  'Sports', 'Lifestyle', 'Mental Health', 'Entertainment', 'Other',
];

export default function NewPostPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const generateSlug = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80);

  const handleSave = async (publish: boolean) => {
    if (!title.trim()) { setError('Please add a title.'); return; }
    if (!content.trim()) { setError('Please add some content.'); return; }
    if (!category) { setError('Please select a category.'); return; }

    setError('');
    publish ? setPublishing(true) : setSaving(true);

    try {
      const res = await apiClient.createPost({
        title: title.trim(),
        content: content.trim(),
        category,
        description: description.trim(),
        slug: generateSlug(title),
        readTime: `${readTime}m`,
        published: publish,
      } as any);

      if (res.success) {
        router.push(`/dashboard/my-posts?created=1&published=${publish ? '1' : '0'}`);
      } else {
        setError(res.error || 'Failed to save post');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save post');
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">New Post</h1>
          <p className="text-sm text-slate-500 mt-1">
            {wordCount > 0 ? `${wordCount} words · ~${readTime} min read` : 'Start writing below'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={saving || publishing}
            className="px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving || publishing}
            className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            {publishing ? 'Publishing...' : 'Publish →'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Editor Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Title */}
        <div className="px-8 pt-8 pb-4 border-b border-slate-50">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your post title..."
            className="w-full text-3xl font-bold text-slate-900 placeholder-slate-300 border-none outline-none resize-none bg-transparent"
          />
        </div>

        {/* Meta Row */}
        <div className="px-8 py-4 border-b border-slate-50 flex flex-wrap gap-4 items-center">
          {/* Category */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Author</label>
            <span className="text-sm text-slate-700 font-medium">{user?.fullName ?? '—'}</span>
          </div>
        </div>

        {/* Short Description */}
        <div className="px-8 py-4 border-b border-slate-50">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description (shown in previews)..."
            rows={2}
            maxLength={200}
            className="w-full text-sm text-slate-600 placeholder-slate-300 border-none outline-none resize-none bg-transparent leading-relaxed"
          />
          <p className="text-xs text-slate-300 text-right mt-1">{description.length}/200</p>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Start writing your post here...\n\nTell your story, share your ideas, or teach something new. You can use plain text — markdown formatting is supported.`}
            rows={24}
            className="w-full text-base text-slate-800 placeholder-slate-300 border-none outline-none resize-none bg-transparent leading-8 font-light"
          />
        </div>
      </div>

      {/* Writing Tips */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">✨ Tips for a great post</p>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Start with a compelling hook in the first paragraph</li>
          <li>Aim for 500–1,500 words for best engagement</li>
          <li>Use short paragraphs — readers skim on mobile</li>
          <li>End with a clear call to action or takeaway</li>
        </ul>
      </div>
    </div>
  );
}
