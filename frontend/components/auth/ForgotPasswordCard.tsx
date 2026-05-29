"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordCard() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center text-center">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {/* Padlock Emoji Header */}
          <div className="text-3xl mb-3">🔐</div>
          
          <h1 className="text-xl font-bold text-slate-900 mb-1">Forgot your password?</h1>
          <p className="text-sm text-gray-400 mb-6">
            Enter your email and we'll send a reset link.
          </p>

          <div className="w-full flex flex-col gap-1.5 text-left mb-5">
            <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 text-sm rounded-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded-xl shadow-sm transition-colors mb-4"
          >
            Send reset link
          </button>
        </form>
      ) : (
        /* Success State */
        <div className="w-full flex flex-col items-center animate-fade-in">
          <div className="text-3xl mb-3">📩</div>
          <h1 className="text-xl font-bold text-slate-900 mb-1">Check your inbox</h1>
          <p className="text-sm text-gray-400 mb-6 px-2">
            We sent a password reset link to <span className="font-semibold text-slate-700">{email}</span>.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm rounded-xl transition-colors mb-4"
          >
            Resend link
          </button>
        </div>
      )}

      {/* Back to Login Anchor */}
      <Link 
        href="/login" 
        className="text-xs font-semibold text-blue-500 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
      >
        <span>←</span> Back to login
      </Link>
    </div>
  );
}