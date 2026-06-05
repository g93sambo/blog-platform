'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { apiClient } from '@/lib/api';

interface Post {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  category: string;
  views: number;
  likes: number | any[];
  createdAt: string | Date;
  published?: boolean;
}

const MOCK: Post[] = [
  { id: '1', title: 'Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules', slug: 'street-souk', category: 'Fashion', views: 2410, likes: 184, createdAt: '2026-05-06', published: true },
  { id: '2', title: 'GTA VI Finally Drops — Was the Wait Worth It?', slug: 'gta-vi', category: 'Gaming', views: 1920, likes: 143, createdAt: '2026-05-04', published: true },
  { id: '3', title: 'Rihanna & A$AP Rocky Shut Down the Met Gala', slug: 'rihanna-met', category: 'Music', views: 980, likes: 92, createdAt: '2026-05-07', published: true },
  { id: '4', title: "AI is eating software jobs. Here's what nobody's saying.", slug: 'ai-jobs', category: 'Tech', views: 0, likes: 0, createdAt: '2026-05-08', published: false },
  { id: '5', title: "Why your 9-to-5 will never make you rich", slug: 'nine-to-five', category: 'Business', views: 730, likes: 61, createdAt: '2026-05-05', published: true },
];

const getLikesCount = (likes: number | any[]) =>
  Array.isArray(likes) ? likes.length : (likes ?? 0);

const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const normalisePost = (p: any): Post => ({
  ...p,
  id: p._id ?? p.id,
});

export default function MyPostsPage() {
  const searchParams = useSearchParams();
  const justCreated = searchParams.get('created') === '1';
  const wasPublished = searchParams.get('published') === '1';

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [banner, setBanner] = useState(justCreated);

  // Auto-dismiss success banner after 4 seconds
  useEffect(() => {
    if (!banner) return;
    const t = setTimeout(() => setBanner(false), 4000);
    return () => clearTimeout(t);
  }, [banner]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.getMyPosts(1, 50);
      const raw: any[] | undefined = (res.data as any)?.data;
      if (res.success && Array.isArray(raw)) {
        setPosts(raw.map(normalisePost));
      } else {
        setPosts(MOCK);
      }
    } catch {
      setPosts(MOCK);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await apiClient.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Failed to delete post');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = posts.filter((p) => {
    if (filter === 'published') return p.published === true;
    if (filter === 'draft') return p.published === false;
    return true;
  });

  const publishedCount = posts.filter((p) => p.published === true).length;
  const draftCount = posts.filter((p) => p.published === false).length;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-5">

      {/* Success Banner */}
      {banner && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-5 py-3 text-sm font-medium animate-pulse-once">
          <span className="text-lg">🎉</span>
          <span>
            {wasPublished
              ? 'Your post has been published and is now live!'
              : 'Your draft has been saved.'}
          </span>
          <button onClick={() => setBanner(false)} className="ml-auto text-emerald-500 hover:text-emerald-700">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Posts</h1>
          <p className="text-sm text-slate-500 mt-1">
            {loading ? 'Loading...' : `${posts.length} total · ${publishedCount} published · ${draftCount} draft`}
          </p>
        </div>
        <Link
          href="/dashboard/new-post"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <span>＋</span> New Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {([
          { key: 'all', label: `All (${posts.length})` },
          { key: 'published', label: `Published (${publishedCount})` },
          { key: 'draft', label: `Drafts (${draftCount})` },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 text-center gap-3">
            <p className="text-4xl">{filter === 'draft' ? '📋' : '📝'}</p>
            <p className="text-slate-600 font-medium">
              {filter === 'all' ? 'No posts yet' : `No ${filter} posts`}
            </p>
            <Link href="/dashboard/new-post" className="text-blue-600 text-sm hover:underline font-medium">
              Write your first post →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-center px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                <th className="text-right px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide hidden lg:table-cell">Views</th>
                <th className="text-right px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide hidden lg:table-cell">Likes</th>
                <th className="text-right px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide hidden md:table-cell">Date</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-6 py-4 max-w-[260px]">
                    <p className="font-medium text-slate-800 truncate group-hover:text-blue-600 transition-colors" title={post.title}>
                      {post.title}
                    </p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {post.category || 'General'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                      post.published === true
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {post.published === true ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-slate-500 tabular-nums hidden lg:table-cell">
                    {post.published ? post.views.toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-4 text-right text-slate-500 tabular-nums hidden lg:table-cell">
                    {post.published ? getLikesCount(post.likes).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-4 text-right text-slate-400 text-xs hidden md:table-cell whitespace-nowrap">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/edit/${post.id}`}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deleting === post.id}
                        className="px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-40"
                      >
                        {deleting === post.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
