'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞', href: '/dashboard' },
  { id: 'posts', label: 'My Posts', icon: '✎', href: '/my-posts' },
  { id: 'new-post', label: 'New Post', icon: '＋', href: '/write' },
  { id: 'analytics', label: 'Analytics', icon: '◎', href: '/analytics' },
  { id: 'saved', label: 'Saved', icon: '♡', href: '/saved-posts' },
  { id: 'settings', label: 'Settings', icon: '⚙', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className="relative h-screen w-60 bg-[#121828] flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-1 px-6 py-7">
        <span className="text-lg font-bold text-[#378add]">Blog</span>
        <span className="text-lg font-medium text-white">ify</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-0">
        <ul className="space-y-0">
          {sidebarItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`relative block w-full px-7 py-3.5 text-left transition-colors ${
                    active
                      ? 'text-[#378add]'
                      : 'text-[#b4bcd2] hover:text-white'
                  }`}
                >
                  {/* Active background highlight */}
                  {active && (
                    <div className="absolute inset-y-0 left-3 right-3 bg-[#378add26] rounded-lg" />
                  )}

                  {/* Content */}
                  <div className="relative flex items-center gap-5">
                    <span className={`text-base ${active ? 'font-medium' : 'font-normal'}`}>
                      {item.icon}
                    </span>
                    <span
                      className={`text-sm ${active ? 'font-medium' : 'font-normal'}`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section (optional - can be expanded) */}
      <div className="px-6 py-4 border-t border-[#2a3550]">
        <p className="text-xs text-[#8c94aa]">Logged in as</p>
        <p className="text-sm font-medium text-white truncate">Your Name</p>
      </div>
    </aside>
  );
}
