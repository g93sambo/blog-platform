"use client";

import { useState, useEffect, type ReactNode } from "react";
import Header from "../components/shared/Header";
import "./globals.css";
import Footer from "../components/shared/Footer";
import Sidebar from "@/components/shared/SideBar";
import { PostProvider } from '@/context/PostContext';

interface UserProfile {
  name: string;
  role: string;
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Syncing with local client-side session authentication hook
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-slate-50 text-slate-900">
        
        {/* Global state engine wrapping entire core app infrastructure */}
        <PostProvider>
          
          {/* Sidebar layout passing down the live user auth state object */}
          <Sidebar user={user} />

          <div className="flex flex-col flex-grow">
            <Header />

            {/* Next.js dynamic main dashboard viewport window slot */}
            <main className="flex-grow p-6">
              {children}
            </main>

            <Footer />
          </div>

        </PostProvider>

      </body>
    </html>
  );
}