'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞', href: '/dashboard' },
  { id: 'posts', label: 'My Posts', icon: '✎', href: '/dashboard/my-posts' },
  { id: 'new-post', label: 'New Post', icon: '＋', href: '/dashboard/new-post' },
  { id: 'analytics', label: 'Analytics', icon: '◎', href: '/dashboard/analytics' },
  { id: 'saved', label: 'Saved', icon: '♡', href: '/dashboard/saved' },
  { id: 'settings', label: 'Settings', icon: '⚙', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
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
                  {active && (
                    <div className="absolute inset-y-0 left-3 right-3 bg-[#378add26] rounded-lg" />
                  )}
                  <div className="relative flex items-center gap-5">
                    <span className={`text-base ${active ? 'font-medium' : 'font-normal'}`}>
                      {item.icon}
                    </span>
                    <span className={`text-sm ${active ? 'font-medium' : 'font-normal'}`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      {user ? (
        <div className="px-5 py-4 border-t border-[#2a3550]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#378add] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {getInitials(user.fullName)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.fullName}</p>
              <p className="text-xs text-[#8c94aa] truncate">@{user.username}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs text-[#8c94aa] hover:text-red-400 transition-colors py-1"
          >
            → Log out
          </button>
        </div>
      ) : (
        <div className="px-6 py-4 border-t border-[#2a3550]">
          <Link href="/login" className="text-sm text-[#378add] hover:underline">
            Log in
          </Link>
        </div>
      )}
    </aside>
  );
}
