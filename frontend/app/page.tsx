'use client';

import { useState } from "react";
import Link from "next/link";
import { Hero } from "../components/home/Hero";
import CategoryBar from "../components/home/CategoryBar";
import PostGrid from "../components/home/PostGrid";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-h-screen bg-white">
      {/* The Navigation Header and Main text are built inside this Hero component */}
      <Hero />
      
      <div className="max-w-7xl mx-auto px-6">
        <CategoryBar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        <PostGrid activeCategory={activeCategory} />
      </div>

      {/* Preview Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Preview More Features?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Check out our dashboard, settings, and saved posts without logging in
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/analytics"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              📊 View Analytics
            </Link>
            <Link
              href="/settings"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              ⚙️ View Settings
            </Link>
            <Link
              href="/saved-posts"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              ❤️ View Saved Posts
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            💡 Tip: All pages show with sample data. No login needed for preview!
          </p>
        </div>
      </div>
    </main>
  );
}