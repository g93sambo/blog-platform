'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Hero } from '@/components/home/Hero';
import CategoryBar from '@/components/home/CategoryBar';
import PostGrid from '@/components/home/PostGrid';
import PublicShell from '@/components/shared/PublicShell';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { isAuthenticated } = useAuth();

  return (
    <PublicShell>
      <Hero />

      <div className="max-w-7xl mx-auto px-6">
        <CategoryBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <PostGrid activeCategory={activeCategory} />
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {isAuthenticated ? (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome back! Ready to write?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Head to your dashboard to manage your posts and view analytics.
              </p>
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Go to Dashboard →
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start writing today
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of writers sharing their ideas with the world.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Create free account
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Log in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </PublicShell>
  );
}