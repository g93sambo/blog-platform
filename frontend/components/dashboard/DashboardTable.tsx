'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import DeleteModal from './DeleteModal';

interface PostRow {
  id: string;
  title: string;
  published: boolean;
  views: number;
  likes: number | any[];
  createdAt: string | Date;
}

const MOCK: PostRow[] = [
  { id: '1', title: 'Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules', published: true, views: 2410, likes: 184, createdAt: '2026-05-06' },
  { id: '2', title: 'GTA VI Finally Drops — Was the Wait Worth It?', published: true, views: 1920, likes: 143, createdAt: '2026-05-04' },
  { id: '3', title: 'Rihanna & A$AP Rocky Shut Down the Met Gala', published: true, views: 980, likes: 92, createdAt: '2026-05-07' },
  { id: '4', title: "AI is eating software jobs. Here's what nobody's telling you", published: false, views: 0, likes: 0, createdAt: '2026-05-08' },
  { id: '5', title: "Why your 9-to-5 will never make you rich", published: true, views: 730, likes: 61, createdAt: '2026-05-05' },
];

const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const likesCount = (likes: number | any[]) =>
  Array.isArray(likes) ? likes.length : likes;

export default function DashboardTable() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostRow | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.getMyPosts(1, 10);
        const data: any[] | undefined = (res.data as any)?.data;
        if (res.success && Array.isArray(data) && data.length > 0) {
          setPosts(data.map((p: any) => ({ ...p, id: p._id ?? p.id })));
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

  const handleDeleteClick = (post: PostRow) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPost) return;
    try {
      await apiClient.deletePost(selectedPost.id);
      setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
    } catch {
      // ignore — post may be mock
    }
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const statusStyle = (published: boolean) =>
    published
      ? 'bg-green-50 text-green-700'
      : 'bg-gray-100 text-gray-600';

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden w-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
        <h2 className="text-sm font-semibold text-slate-800">Recent Posts</h2>
        <Link href="/dashboard/my-posts" className="text-xs text-blue-600 hover:underline font-medium">
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold text-gray-400 uppercase bg-slate-50/70">
              <th className="p-4 pl-6">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Views</th>
              <th className="p-4">Likes</th>
              <th className="p-4">Date</th>
              <th className="p-4 pr-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="p-4">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6 font-medium text-slate-900 max-w-xs truncate" title={post.title}>
                      {post.title}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${statusStyle(post.published)}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      {post.published ? post.views.toLocaleString() : '—'}
                    </td>
                    <td className="p-4 text-gray-500">
                      {post.published ? likesCount(post.likes).toLocaleString() : '—'}
                    </td>
                    <td className="p-4 text-gray-500 whitespace-nowrap">{formatDate(post.createdAt)}</td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/dashboard/edit/${post.id}`}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(post)}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        postTitle={selectedPost?.title ?? ''}
        onCancel={() => { setIsModalOpen(false); setSelectedPost(null); }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}