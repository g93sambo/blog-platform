import React from 'react';
import DashboardCards from "@/components/dashboard/DashboardCards";
import DashboardTable from "@/components/dashboard/DashboardTable";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-colors">
          + New Post
        </button>
      </div>

      <DashboardCards />
      <DashboardTable />
    </div>
  );
}