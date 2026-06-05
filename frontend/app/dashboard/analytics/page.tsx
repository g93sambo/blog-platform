'use client';

import { useState, useEffect } from 'react';
import AnalyticsSummaryCard from '@/components/dashboard/AnalyticsSummaryCard';
import AnalyticsChartComponent from '@/components/dashboard/AnalyticsChart';
import AnalyticsTable from '@/components/dashboard/AnalyticsTable';
import { AnalyticsData } from '@/types';

const MOCK: AnalyticsData = {
  summary: {
    totalViews: 8420, uniqueReaders: 3210, avgReadTime: '3m 42s', newFollowers: 21,
    totalViewsChange: '+12% vs last month', uniqueReadersChange: '+8% vs last month',
    avgReadTimeChange: '-5% vs last month', newFollowersChange: '+40% vs last month',
  },
  viewsTrend: [
    { date: 'May 1', views: 240 }, { date: 'May 5', views: 380 }, { date: 'May 10', views: 200 },
    { date: 'May 12', views: 278 }, { date: 'May 14', views: 189 }, { date: 'May 16', views: 339 },
    { date: 'May 18', views: 349 }, { date: 'May 20', views: 200 }, { date: 'May 22', views: 421 },
    { date: 'May 24', views: 290 }, { date: 'May 26', views: 380 }, { date: 'May 28', views: 220 },
    { date: 'May 30', views: 340 },
  ],
  topPosts: [
    { id: '1', slug: 'street-souk', title: 'Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules', content: '', category: 'Fashion', author: { id: '1', fullName: 'Adetunlese Arowolo', email: '', username: 'sambo' }, readTime: '5m', views: 2410, likes: 184, comments: 0, ctr: '8.2%', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', slug: 'gta-vi', title: 'GTA VI Finally Drops — Was the Wait Worth It?', content: '', category: 'Gaming', author: { id: '1', fullName: 'Adetunlese Arowolo', email: '', username: 'sambo' }, readTime: '4m', views: 1920, likes: 143, comments: 0, ctr: '6.4%', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', slug: 'nine-to-five', title: 'Why your 9-to-5 will never make you rich', content: '', category: 'Business', author: { id: '1', fullName: 'Adetunlese Arowolo', email: '', username: 'sambo' }, readTime: '5m', views: 730, likes: 61, comments: 0, ctr: '4.1%', createdAt: new Date(), updatedAt: new Date() },
    { id: '4', slug: 'ai-jobs', title: "AI is eating software jobs. Here's what nobody's saying.", content: '', category: 'Tech', author: { id: '1', fullName: 'Adetunlese Arowolo', email: '', username: 'sambo' }, readTime: '6m', views: 520, likes: 44, comments: 0, ctr: '3.8%', createdAt: new Date(), updatedAt: new Date() },
  ],
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(MOCK);
      setLoading(false);
    }, 500);
  }, [range]);

  const summaryCards = data
    ? [
        { title: 'Total Views', value: data.summary.totalViews.toLocaleString(), change: data.summary.totalViewsChange, isPositive: !data.summary.totalViewsChange.includes('-') },
        { title: 'Unique Readers', value: data.summary.uniqueReaders.toLocaleString(), change: data.summary.uniqueReadersChange, isPositive: !data.summary.uniqueReadersChange.includes('-') },
        { title: 'Avg Read Time', value: data.summary.avgReadTime, change: data.summary.avgReadTimeChange, isPositive: !data.summary.avgReadTimeChange.includes('-') },
        { title: 'New Followers', value: data.summary.newFollowers.toLocaleString(), change: data.summary.newFollowersChange, isPositive: !data.summary.newFollowersChange.includes('-') },
      ]
    : [];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Track your content performance</p>
        </div>
        {/* Date range selector */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                range === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r === '7d' ? 'Last 7 days' : r === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex gap-2 items-center text-slate-400">
            <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            Loading analytics...
          </div>
        </div>
      ) : data ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <AnalyticsSummaryCard key={card.title} {...card} />
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-slate-800">Views over time</h2>
              <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                {data.viewsTrend.reduce((s, d) => s + d.views, 0).toLocaleString()} total views
              </span>
            </div>
            <AnalyticsChartComponent data={data.viewsTrend} />
          </div>

          {/* Top Posts Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-5">Top Performing Posts</h2>
            <AnalyticsTable posts={data.topPosts} />
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Posts Published', value: '5', icon: '📝' },
              { label: 'Total Comments Received', value: '38', icon: '💬' },
              { label: 'Total Likes Received', value: '524', icon: '❤️' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
