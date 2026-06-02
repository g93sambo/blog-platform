import React from 'react';

interface CardProps {
  title: string;
  value: string;
  trend: string;
  isPositive?: boolean;
}

const MetricCard = ({ title, value, trend, isPositive = true }: CardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2 flex-1">
      <span className="text-sm font-medium text-gray-400">{title}</span>
      <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
      <div className="mt-2">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {trend}
        </span>
      </div>
    </div>
  );
};

export default function DashboardCards() {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mb-8">
      <MetricCard title="Total Posts" value="24" trend="+3 this month" />
      <MetricCard title="Total Views" value="8,420" trend="+12% vs last month" />
      <MetricCard title="Total Likes" value="1,204" trend="+8% vs last month" />
      <MetricCard title="Followers" value="342" trend="+21 new" />
    </div>
  );
}