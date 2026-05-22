'use client';

import { useState } from "react";
import { Hero } from "../components/home/Hero";
import CategoryBar from "../components/home/CategoryBar";
import PostGrid from "../components/home/PostGrid";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-h-screen bg-white">
      {/* The Navigation Header and Main text are built inside this Hero component */}
      <Hero />
      
      <div className="max-w-7xl mx-auto px-6">
        <CategoryBar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        <PostGrid activeCategory={activeCategory} />
      </div>
    </main>
  );
}