'use client';

import Link from "next/link";
import { Button } from "../ui/Button";

interface EditorHeaderProps {
  onPublish: () => void;
}

export const EditorHeader = ({ onPublish }: EditorHeaderProps) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Branding Platform Logo */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-gray-900 tracking-tight">
          Blog<span className="text-[#378add]">ify</span>
        </span>
        <span className="text-xs text-gray-400 font-normal ml-4 flex items-center gap-1.5">
          ✏️ New post · <span className="italic">Draft saved</span>
        </span>
      </div>

      {/* Primary Action Button Suite */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            ← Dashboard
          </button>
        </Link>
        <Button 
          label="Publish →" 
          variant="primary" 
          onClick={onPublish}
          className="!text-xs !py-2 !px-4 h-[38px]" 
        />
      </div>
    </header>
  );
};