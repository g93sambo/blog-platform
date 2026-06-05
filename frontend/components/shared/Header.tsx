'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Brand Logo */}
      <Link href="/" className="text-2xl font-bold">
        <span className="text-blue-600">Blog</span>ify
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex gap-8 text-gray-500 font-medium">
        <Link href="/" className="hover:text-black">Home</Link>
        <Link href="/trending" className="hover:text-black">Trending</Link>
        <Link href="/categories" className="hover:text-black">Categories</Link>
        <Link href="/authors" className="hover:text-black">Authors</Link>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black"
            >
              Dashboard
            </Link>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer" title={user.fullName}>
              {getInitials(user.fullName)}
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
            >
              Get started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}