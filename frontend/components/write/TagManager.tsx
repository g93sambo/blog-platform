'use client';

import { useState } from "react";

// exact props contract for the dynamic tag manager
interface TagManagerProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const TagManager = ({ tags, onChange }: TagManagerProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t: string) => t !== tagToRemove));
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm text-xs">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tags</h3>
      <div className="flex flex-wrap gap-1.5 mb-1">
        {tags.map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-sky-50 text-[#0c447c] font-medium rounded-md flex items-center gap-1.5 text-[11px]">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-sky-400 hover:text-red-500 font-bold">×</button>
          </span>
        ))}
      </div>
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag and hit Enter..."
        className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 outline-none focus:border-[#378add]"
      />
    </div>
  );
};