'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

interface Stats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  followers: number;
}

const MOCK_STATS: Stats = { totalPosts: 24, totalViews: 8420, totalLikes: 1204, followers: 342 };

interface CardProps {
  title: string;
  value: string;
  trend: string;
  isPositive?: boolean;
  loading?: boolean;
}

const MetricCard = ({ title, value, trend, isPositive = true, loading }: CardProps) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2 flex-1">
    <span className="text-sm font-medium text-gray-400">{title}</span>
    {loading ? (
      <div className="h-9 w-20 bg-slate-100 rounded animate-pulse" />
    ) : (
      <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
    )}
    <div className="mt-2">
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
        isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {trend}
      </span>
    </div>
  </div>
);

export default function DashboardCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.getDashboardStats();
        if (res.success && res.data) {
          setStats(res.data);
        } else {
          setStats(MOCK_STATS);
        }
      } catch {
        setStats(MOCK_STATS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const display = stats ?? MOCK_STATS;

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mb-8">
      <MetricCard loading={loading} title="Total Posts" value={display.totalPosts.toLocaleString()} trend="+3 this month" />
      <MetricCard loading={loading} title="Total Views" value={display.totalViews.toLocaleString()} trend="+12% vs last month" />
      <MetricCard loading={loading} title="Total Likes" value={display.totalLikes.toLocaleString()} trend="+8% vs last month" />
      <MetricCard loading={loading} title="Followers" value={display.followers.toLocaleString()} trend="+21 new" />
    </div>
  );
}