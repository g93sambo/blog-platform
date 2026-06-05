'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import { Post, PaginatedResponse } from '@/types';
import { apiClient } from '@/lib/api';

interface SavedPostWithBanner extends Post {
  bannerColor?: string;
}

export default function SavedPostsPage() {
  const [posts, setPosts] = useState<SavedPostWithBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    // Load mock data directly (no auth check for preview)
    setLoading(true);
    setPosts(getMockSavedPosts());
    setLoading(false);
  }, []);

  const handleRemovePost = async (postId: string) => {
    try {
      setRemoving(postId);
      const response = await apiClient.unsavePost(postId);

      if (response.success) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      } else {
        alert(response.error || 'Failed to remove post');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f7f7f9]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#787882]">Loading saved posts...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f7f7f9]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-[#d2d2da] px-8 py-4">
          <h1 className="text-xl font-bold text-[#14141e]">Saved Posts</h1>
          <p className="text-[13px] text-[#787882]">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} saved
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[#fbeaf0] text-[#993556] border border-[#993556]">
              {error}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-[#14141e] font-semibold mb-2">No saved posts yet</p>
                <p className="text-[#787882]">Posts you save will appear here</p>
                <Link
                  href="/"
                  className="inline-block mt-4 px-6 py-2 bg-[#378add] text-white rounded-lg text-sm font-medium hover:bg-[#2668b8] transition-colors"
                >
                  Browse posts
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl space-y-4">
              {posts.map((post) => (
                <SavedPostCard
                  key={post.id}
                  post={post}
                  onRemove={handleRemovePost}
                  isRemoving={removing === post.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface SavedPostCardProps {
  post: SavedPostWithBanner;
  onRemove: (postId: string) => void;
  isRemoving: boolean;
}

function SavedPostCard({ post, onRemove, isRemoving }: SavedPostCardProps) {
  const getBadgeColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      fashion: { bg: 'bg-[#fbeaf0]', text: 'text-[#993556]' },
      gaming: { bg: 'bg-[#e6f1fb]', text: 'text-[#0c447c]' },
      music: { bg: 'bg-[#fbeaf0]', text: 'text-[#993556]' },
      tech: { bg: 'bg-[#eaf8f0]', text: 'text-[#27a064]' },
      business: { bg: 'bg-[#eaf8f0]', text: 'text-[#27a064]' },
    };
    return colors[category.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  };

  const badgeColor = getBadgeColor(post.category);

  return (
    <article className="bg-white rounded-[10px] border border-[#d2d2da] overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <div className="flex items-center gap-4 p-4">
          {/* Banner */}
          <div
            className="w-[120px] h-[80px] rounded-lg flex-shrink-0"
            style={{
              backgroundColor: post.bannerColor || '#378add',
            }}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className={`inline-block px-2.5 py-1 rounded-[11px] ${badgeColor.bg} mb-2`}>
              <p className={`text-[11px] font-medium ${badgeColor.text}`}>{post.category}</p>
            </div>

            <h3 className="text-[14px] font-medium text-[#14141e] mb-2 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-[12px] text-[#787882] font-normal">
              {post.author.fullName} · {post.readTime} read
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove(post.id);
            }}
            disabled={isRemoving}
            className="px-5 py-2 bg-[#feebeb] rounded-[6px] text-[#a32d2d] text-[12px] font-medium hover:bg-[#f5d5d5] transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </Link>
    </article>
  );
}

function getColorForCategory(category: string): string {
  const colors: Record<string, string> = {
    fashion: '#f5c4d1',
    gaming: '#c3d2f8',
    music: '#edb4c8',
    tech: '#c0dd97',
    business: '#d4e5b4',
    entertainment: '#f5c4d1',
    sports: '#c3d2f8',
    lifestyle: '#edb4c8',
    default: '#378add',
  };

  return colors[category.toLowerCase()] || colors.default;
}

function getMockSavedPosts(): SavedPostWithBanner[] {
  return [
    {
      id: '1',
      slug: 'street-souk-fashion',
      title: 'Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules',
      content: '',
      category: 'Fashion',
      author: { id: '1', fullName: 'Amara Okafor', email: '', username: 'amara' },
      readTime: '5m',
      views: 2410,
      likes: 184,
      comments: 0,
      bannerColor: '#f5c4d1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      slug: 'gta-vi-review',
      title: 'GTA VI Finally Drops — Was the Wait Worth It?',
      content: '',
      category: 'Gaming',
      author: { id: '2', fullName: 'Josh Levi', email: '', username: 'josh' },
      readTime: '4m',
      views: 1920,
      likes: 143,
      comments: 0,
      bannerColor: '#c3d2f8',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      slug: 'rihanna-aap-rocky-met-gala',
      title: 'Rihanna & A$AP Rocky Shut Down the Met Gala',
      content: '',
      category: 'Music',
      author: { id: '3', fullName: 'Sofia M.', email: '', username: 'sofia' },
      readTime: '3m',
      views: 1540,
      likes: 127,
      comments: 0,
      bannerColor: '#edb4c8',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      slug: 'ai-eating-software-jobs',
      title: "AI is eating software jobs. Here's what nobody's saying.",
      content: '',
      category: 'Tech',
      author: { id: '4', fullName: 'Kemi A.', email: '', username: 'kemi' },
      readTime: '6m',
      views: 890,
      likes: 76,
      comments: 0,
      bannerColor: '#c0dd97',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}
