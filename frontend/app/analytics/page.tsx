'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import AnalyticsSummaryCard from '@/components/dashboard/AnalyticsSummaryCard';
import AnalyticsChartComponent from '@/components/dashboard/AnalyticsChart';
import AnalyticsTable from '@/components/dashboard/AnalyticsTable';
import { AnalyticsData } from '@/types';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Show mock data directly for preview
        setAnalyticsData(getMockAnalyticsData());
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f7f7f9]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#787882]">Loading analytics...</p>
        </main>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex h-screen bg-[#f7f7f9]">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-[#14141e] font-semibold mb-2">Unable to load analytics</p>
        </main>
      </div>
    );
  }

  const summaryCards = [
    {
      title: 'Total Views',
      value: analyticsData.summary.totalViews.toLocaleString(),
      change: analyticsData.summary.totalViewsChange,
      isPositive: !analyticsData.summary.totalViewsChange.includes('-'),
    },
    {
      title: 'Unique Readers',
      value: analyticsData.summary.uniqueReaders.toLocaleString(),
      change: analyticsData.summary.uniqueReadersChange,
      isPositive: !analyticsData.summary.uniqueReadersChange.includes('-'),
    },
    {
      title: 'Avg Read Time',
      value: analyticsData.summary.avgReadTime,
      change: analyticsData.summary.avgReadTimeChange,
      isPositive: !analyticsData.summary.avgReadTimeChange.includes('-'),
    },
    {
      title: 'New Followers',
      value: analyticsData.summary.newFollowers.toLocaleString(),
      change: analyticsData.summary.newFollowersChange,
      isPositive: !analyticsData.summary.newFollowersChange.includes('-'),
    },
  ];

  return (
    <div className="flex h-screen bg-[#f7f7f9]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-[#d2d2da] px-8 py-4">
          <h1 className="text-xl font-bold text-[#14141e]">Analytics</h1>
          <p className="text-[13px] text-[#787882]">Last 30 days</p>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 space-y-8 overflow-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryCards.map((card) => (
              <AnalyticsSummaryCard key={card.title} {...card} />
            ))}
          </div>

          {/* Chart */}
          <AnalyticsChartComponent data={analyticsData.viewsTrend} />

          {/* Table */}
          <AnalyticsTable posts={analyticsData.topPosts} />
        </div>
      </main>
    </div>
  );
}

// Mock data for development/demo purposes
function getMockAnalyticsData(): AnalyticsData {
  return {
    summary: {
      totalViews: 8420,
      uniqueReaders: 3210,
      avgReadTime: '3m 42s',
      newFollowers: 21,
      totalViewsChange: '+12% vs last month',
      uniqueReadersChange: '+8% vs last month',
      avgReadTimeChange: '-5% vs last month',
      newFollowersChange: '+40% vs last month',
    },
    viewsTrend: [
      { date: 'May 1', views: 240 },
      { date: 'May 2', views: 380 },
      { date: 'May 3', views: 200 },
      { date: 'May 4', views: 278 },
      { date: 'May 5', views: 189 },
      { date: 'May 6', views: 239 },
      { date: 'May 7', views: 349 },
      { date: 'May 8', views: 200 },
      { date: 'May 9', views: 221 },
      { date: 'May 10', views: 250 },
      { date: 'May 11', views: 210 },
      { date: 'May 12', views: 229 },
      { date: 'May 13', views: 200 },
      { date: 'May 14', views: 250 },
      { date: 'May 15', views: 210 },
      { date: 'May 16', views: 290 },
      { date: 'May 17', views: 200 },
      { date: 'May 18', views: 250 },
      { date: 'May 19', views: 210 },
      { date: 'May 20', views: 250 },
      { date: 'May 21', views: 200 },
      { date: 'May 22', views: 260 },
      { date: 'May 23', views: 200 },
      { date: 'May 24', views: 290 },
      { date: 'May 25', views: 230 },
      { date: 'May 26', views: 200 },
      { date: 'May 27', views: 250 },
      { date: 'May 28', views: 210 },
      { date: 'May 29', views: 290 },
      { date: 'May 30', views: 340 },
    ],
    topPosts: [
      {
        id: '1',
        slug: 'street-souk-fashion',
        title: 'Street Souk: How Lagos Market Culture Is Rewriting...',
        content: '',
        category: 'Fashion',
        author: { id: '1', fullName: 'Amara Okafor', email: '', username: 'amara' },
        readTime: '5m',
        views: 2410,
        likes: 184,
        comments: 0,
        ctr: '8.2%',
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
        ctr: '6.4%',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        slug: 'nine-to-five-wealth',
        title: 'Why your 9-to-5 will never make you rich',
        content: '',
        category: 'Business',
        author: { id: '3', fullName: 'Unknown', email: '', username: 'unknown' },
        readTime: '5m',
        views: 730,
        likes: 61,
        comments: 0,
        ctr: '4.1%',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        slug: 'gen-z-therapy',
        title: 'Gen Z doesn\'t need therapy.',
        content: '',
        category: 'Mental Health',
        author: { id: '4', fullName: 'Unknown', email: '', username: 'unknown' },
        readTime: '4m',
        views: 520,
        likes: 44,
        comments: 0,
        ctr: '3.8%',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
}
