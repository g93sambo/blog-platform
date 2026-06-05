'use client';

import { useState } from "react";
import Link from "next/link";
import { PostStatusTabs } from "@/components/dashboard/PostStatusTabs";
import { ManagementPostCard } from "@/components/dashboard/ManagementPostCard";

export default function MyPostsDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");

  // Local state array modeling your operational dashboard posts row entries
  const [userPosts, setUserPosts] = useState([
    { id: "street-souk", title: "Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules", category: "Fashion", status: "Published", views: "2,410", date: "May 6, 2026", color: "#f5c4d1" },
    { id: "gta-vi", title: "GTA VI Finally Drops — Was the Wait Worth It?", category: "Gaming", status: "Published", views: "1,920", date: "May 4, 2026", color: "#c3d2f8" },
    { id: "met-gala", title: "Rihanna & A$AP Rocky Shut Down the Met Gala — Again", category: "Music", status: "Published", views: "980", date: "May 7, 2026", color: "#f4c0d1" },
    { id: "ai-jobs", title: "AI is eating software jobs. Here's what nobody's saying.", category: "Tech", status: "Draft", views: "—", date: "May 8, 2026", color: "#c0dd97" },
    { id: "nine-to-five", title: "Why your 9-to-5 will never make you rich (and what will)", category: "Lifestyle", status: "Published", views: "730", date: "May 5, 2026", color: "#fcd381" },
    { id: "gen-z", title: "Gen Z doesn't need therapy. We need systemic change.", category: "Opinion", status: "Under Review", views: "—", date: "May 3, 2026", color: "#b39ddb" }
  ]);

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setUserPosts((prev) => prev.filter((post) => post.id !== id));
    }
  };

  // Compute live contextual numeric tallies for display tabs matching design specifications
  const counts = {
    All: userPosts.length,
    Published: userPosts.filter(p => p.status === "Published").length,
    Draft: userPosts.filter(p => p.status === "Draft").length,
    "Under Review": userPosts.filter(p => p.status === "Under Review").length
  };

  const filteredPosts = activeTab === "All" 
    ? userPosts 
    : userPosts.filter((post) => post.status === activeTab);

  return (
    <div className="w-full text-left p-6 flex flex-col gap-6">
      
      {/* View Dashboard Section Top Header Action Bar */}
      <div className="w-full flex justify-between items-center border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-gray-900">My Posts</h1>
        <Link href="/write">
          <button className="px-4 py-2 bg-[#378add] text-white text-xs font-semibold rounded-lg hover:bg-[#2776c2] transition-colors shadow-sm">
            + New Post
          </button>
        </Link>
      </div>

      {/* Filter Segment Tabs Row Controls */}
      <PostStatusTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />

      {/* Dynamic Structural Grid Framework Feed */}
      {filteredPosts.length === 0 ? (
        <div className="w-full py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-sm text-gray-400">
          No entries located matching this lifecycle state.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <ManagementPostCard 
              key={post.id} 
              {...post} 
              onDelete={() => handleDeletePost(post.id)} 
            />
          ))}
        </div>
      )}

    </div>
  );
}