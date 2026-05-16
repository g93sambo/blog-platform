'use client';

import { CategoryPill } from "../ui/CategoryPill";

interface CategoryBarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const categories = ["All", "Culture", "Tech", "Gaming", "Music", "Fashion", "Opinion", "Lifestyle"];

export default function CategoryBar({ activeCategory, setActiveCategory }: CategoryBarProps) {
  return (
    <div className="flex gap-3 py-8 overflow-x-auto no-scrollbar mb-8">      
    {categories.map((cat) => (
        <div key={cat} onClick={() => setActiveCategory(cat)} className="cursor-pointer">
          <CategoryPill 
            label={cat} 
            isActive={cat === activeCategory} 
          />
        </div>
      ))}
    </div>
  );
}