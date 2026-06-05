'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import DashboardCards from '@/components/dashboard/DashboardCards';
import DashboardTable from '@/components/dashboard/DashboardTable';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user?.fullName?.split(' ')[0] ?? 'Writer'} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening with your blog today.</p>
        </div>
        <Link
          href="/dashboard/new-post"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          + New Post
        </Link>
      </div>

      <DashboardCards />
      <DashboardTable />
    </div>
  );
}