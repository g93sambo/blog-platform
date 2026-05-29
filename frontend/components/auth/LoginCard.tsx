'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginCard() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      await login(email, password);
      router.push('/analytics');
    } catch (err) {
      setError('Login failed. Try again!');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 antialiased font-sans">
      {/* Outer Card Container */}
      <div className="w-full max-w-[540px] rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-100">
        
        {/* Deep Blue Header */}
        <div className="bg-[#002B5B] px-6 py-10 text-center text-white">
          <h1 className="text-3xl font-bold tracking-tight">
            Blog<span className="font-medium text-blue-300">ify</span>
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Where ideas go live.
          </p>
        </div>

        {/* Card Body */}
        <div className="p-8 sm:p-10">
          
          {/* Segmented Tab Toggle Navigation */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-8 border border-gray-200">
            <button
              type="button"
              className="flex-1 rounded-lg py-2.5 text-sm font-semibold bg-[#3B82F6] text-white shadow-sm transition-all duration-200"
            >
              Log in
            </button>
            <Link
              href="/register"
              className="flex-1 text-center rounded-lg py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all duration-200"
            >
              Register
            </Link>
          </div>

          {/* Heading Text */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Log in to your account to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Password
                </label>
                <Link href="#" className="text-xs font-medium text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xs select-none"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center pt-1">
              <input
                id="remember-checkbox"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-checkbox" className="ml-2.5 text-xs text-gray-500 select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isLoading ? 'Logging in...' : 'Log in'}</span>
              {!isLoading && <span className="text-base font-light">→</span>}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-4 text-xs text-gray-400">or continue with</span>
          </div>

    </div>
  );
}