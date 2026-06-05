'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Great for highlighting the active tab!
import { 
  LayoutDashboard, 
  FileText, 
  PlusSquare, 
  BarChart2, 
  Bookmark, 
  Settings 
} from 'lucide-react';

export default function SideBar() {
  const pathname = usePathname();

  // Explicit route mapping data array matching our file system structure
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Posts', href: '/dashboard/posts', icon: FileText },
    { label: 'New Post', href: '/write', icon: PlusSquare },
    { label: 'Analytics', href: '/analytics', icon: BarChart2 },
    { label: 'Saved', href: '/saved-posts', icon: Bookmark },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0f141c] text-gray-400 flex flex-col border-r border-gray-850 select-none">
      {/* Platform Branding Logo */}
      <div className="px-6 py-6 border-b border-gray-900">
        <Link href="/dashboard" className="text-xl font-bold text-white tracking-tight cursor-pointer">
          Blog<span className="text-[#3B82F6]">ify</span>
        </Link>
      </div>

      {/* Navigation Link Menu Tree */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-[#1e2633] text-white' 
                  : 'hover:bg-[#141a24] hover:text-gray-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#3B82F6]' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mock User Footer Area */}
      <div className="p-4 border-t border-gray-900 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#3B82F6] text-white font-bold rounded-full flex items-center justify-center text-xs">
          KO
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-white truncate">Kelvin O.</span>
          <span className="text-[10px] text-gray-500 truncate">Author Account</span>
        </div>
      </div>
    </aside>
  );
}