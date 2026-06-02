import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  PlusSquare, 
  BarChart2, 
  Bookmark, 
  Settings 
} from 'lucide-react';

interface UserProfile {
  name: string;
  role: string;
}

interface SidebarProps {
  user?: UserProfile | null;
}

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

const NavItem = ({ href, label, icon: Icon, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[#1E293B] text-blue-400'
          : 'text-gray-400 hover:bg-[#111827] hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar({ user }: SidebarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="w-64 h-screen bg-[#0F172A] text-white flex flex-col justify-between p-4 sticky top-0 border-r border-slate-800">
      <div className="flex flex-col gap-8">
        <div className="px-4 py-2 text-2xl font-bold tracking-tight">
          Blog<span className="text-blue-500">ify</span>
        </div>

       <nav className="flex flex-col gap-1">
  <NavItem href="/dashboard" label="Dashboard" icon={LayoutDashboard} isActive />
  <NavItem href="/dashboard/my-posts" label="My Posts" icon={FileText} />
  <NavItem href="/dashboard/new-post" label="New Post" icon={PlusSquare} />
  <NavItem href="/dashboard/analytics" label="Analytics" icon={BarChart2} />
  <NavItem href="/dashboard/saved" label="Saved" icon={Bookmark} />
  <NavItem href="/dashboard/settings" label="Settings" icon={Settings} />
</nav>
      </div>

      {user ? (
        <div className="flex items-center gap-3 border-t border-slate-800 pt-4 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold border border-slate-600">
            {getInitials(user.name)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate text-gray-200">{user.name}</span>
            <span className="text-xs text-gray-500 truncate">{user.role}</span>
          </div>
        </div>
      ) : (
        <div className="border-t border-slate-800 pt-4 px-4 text-sm text-gray-500">
          Not logged in
        </div>
      )}
    </aside>
  );
}