"use client";

import React, { useState } from 'react';
import DeleteModal from './DeleteModal';

interface PostData {
  title: string;
  status: 'Published' | 'Draft' | 'Under Review';
  views: string;
  likes: string;
  date: string;
}

export default function DashboardTable() {
  const [posts, setPosts] = useState<PostData[]>([
    { title: "Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules", status: "Published", views: "2,410", likes: "184", date: "May 6, 2026" },
    { title: "GTA VI Finally Drops — Was the Wait Worth It?", status: "Published", views: "1,920", likes: "143", date: "May 4, 2026" },
    { title: "Rihanna & A$AP Rocky Shut Down the Met Gala", status: "Published", views: "980", likes: "92", date: "May 7, 2026" },
    { title: "AI is eating software jobs. Here's what nobody's telling you", status: "Draft", views: "—", likes: "—", date: "May 8, 2026" },
    { title: "Why your 9-to-5 will never make you rich", status: "Published", views: "730", likes: "61", date: "May 5, 2026" },
    { title: "Gen Z doesn't need therapy. We need systemic change", status: "Under Review", views: "—", likes: "—", date: "May 3, 2026" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);

  const statusStyles = {
    Published: "bg-green-50 text-green-700",
    Draft: "bg-gray-100 text-gray-600",
    "Under Review": "bg-amber-50 text-amber-700"
  };

  const handleDeleteClick = (index: number) => {
    setSelectedPostIndex(index);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPostIndex !== null) {
      setPosts(posts.filter((_, i) => i !== selectedPostIndex));
    }
    setIsModalOpen(false);
    setSelectedPostIndex(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden w-full">
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
            {posts.map((post, index) => (
              <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 pl-6 font-medium text-slate-900 max-w-md truncate">{post.title}</td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${statusStyles[post.status]}`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{post.views}</td>
                <td className="p-4 text-gray-500">{post.likes}</td>
                <td className="p-4 text-gray-500 whitespace-nowrap">{post.date}</td>
                <td className="p-4 pr-6">
                  <div className="flex items-center justify-center gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(index)}
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
        postTitle={selectedPostIndex !== null ? posts[selectedPostIndex].title : ""}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}