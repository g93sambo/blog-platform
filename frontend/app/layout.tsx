"use client";

import { useState, useEffect, type ReactNode } from "react";
import Header from "../components/shared/Header";
import "./globals.css";
import Footer from "../components/shared/Footer";
import Sidebar from "@/components/shared/SideBar";

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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-slate-50 text-slate-900">
        <Sidebar user={user} />

        <div className="flex flex-col flex-grow">
          <Header />

          <main className="flex-grow p-6">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}