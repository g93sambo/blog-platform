'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';

interface SavedPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  views: number;
  likes: number;
  author: { fullName: string; username: string };
  bannerColor?: string;
  createdAt: string | Date;
}

const CATEGORY_COLORS: Record<string, string> = {
  fashion: '#f5c4d1', gaming: '#c3d2f8', music: '#edb4c8',
  tech: '#c0dd97', business: '#d4e5b4', entertainment: '#f5c4d1',
  sports: '#c3d2f8', lifestyle: '#edb4c8',
};

const MOCK: SavedPost[] = [
  { id: '1', title: 'Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules', slug: 'street-souk', category: 'Fashion', readTime: '5m', views: 2410, likes: 184, author: { fullName: 'Amara Okafor', username: 'amara' }, bannerColor: '#f5c4d1', createdAt: new Date() },
  { id: '2', title: 'GTA VI Finally Drops — Was the Wait Worth It?', slug: 'gta-vi', category: 'Gaming', readTime: '4m', views: 1920, likes: 143, author: { fullName: 'Josh Levi', username: 'josh' }, bannerColor: '#c3d2f8', createdAt: new Date() },
  { id: '3', title: 'Rihanna & A$AP Rocky Shut Down the Met Gala', slug: 'rihanna-met', category: 'Music', readTime: '3m', views: 1540, likes: 127, author: { fullName: 'Sofia M.', username: 'sofia' }, bannerColor: '#edb4c8', createdAt: new Date() },
  { id: '4', title: "AI is eating software jobs. Here's what nobody's saying.", slug: 'ai-jobs', category: 'Tech', readTime: '6m', views: 890, likes: 76, author: { fullName: 'Kemi A.', username: 'kemi' }, bannerColor: '#c0dd97', createdAt: new Date() },
];

export default function SavedPostsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await apiClient.getSavedPosts();
        if (res.success && res.data && Array.isArray((res.data as any).data)) {
          setPosts((res.data as any).data);
        } else {
          setPosts(MOCK);
        }
      } catch {
        setPosts(MOCK);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleRemove = async (id: string) => {
    setRemoving(id);
    try {
      await apiClient.unsavePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Failed to remove post');
    } finally {
      setRemoving(null);
    }
  };

  const getBannerColor = (post: SavedPost) =>
    post.bannerColor || CATEGORY_COLORS[post.category.toLowerCase()] || '#378add';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Saved Posts</h1>
        <p className="text-sm text-slate-500 mt-1">
          {loading ? 'Loading...' : `${posts.length} post${posts.length !== 1 ? 's' : ''} saved`}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="flex gap-2 items-center text-slate-400">
            <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            Loading saved posts...
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center h-64 gap-4 text-center">
          <span className="text-5xl">🔖</span>
          <div>
            <p className="text-slate-700 font-semibold">No saved posts yet</p>
            <p className="text-slate-400 text-sm mt-1">Posts you save will appear here</p>
          </div>
          <Link
            href="/"
            className="mt-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse posts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const catColor = getBannerColor(post);
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-5 p-5">
                  {/* Color Banner */}
                  <div
                    className="w-28 h-20 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: catColor }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category badge */}
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
                      style={{ backgroundColor: catColor + '55', color: '#333' }}
                    >
                      {post.category}
                    </span>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-slate-400 mt-2">
                      {post.author.fullName} · {post.readTime} read · {post.views.toLocaleString()} views
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="px-4 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center"
                    >
                      Read
                    </Link>
                    <button
                      onClick={() => handleRemove(post.id)}
                      disabled={removing === post.id}
                      className="px-4 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {removing === post.id ? '...' : 'Remove'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
