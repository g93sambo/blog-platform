'use client';

import { useState } from "react";
import Link from "next/link";

interface Category {
  label: string;
  bgClass: string;
  textClass: string;
}

interface BlogHeaderProps {
  title: string;
  categories: Category[];
  authorName: string;
  authorInitials: string;
  date: string;
  readTime: string;
  views: string;
  likes: number;
}

export const BlogHeader = ({
  title,
  categories,
  authorName,
  authorInitials,
  date,
  readTime,
  views,
  likes
}: BlogHeaderProps) => {
  // For capturing incoming props into local state engines to drive active reactivity
  const [liked, setLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setCurrentLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setCurrentLikes((prev) => prev + 1);
    }
  };

  return (
    <article className="w-full flex flex-col gap-6 text-left pb-6 border-b border-[#d2d2da]">
      <Link href="/" className="inline-flex items-center text-[#787882] text-xs font-normal transition-colors hover:text-gray-900 w-fit">
        ← Back to Home
      </Link>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span key={category.label} className={`px-3 py-1 text-[11px] font-medium rounded-full inline-flex items-center justify-center whitespace-nowrap ${category.bgClass} ${category.textClass}`}>
            {category.label}
          </span>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex flex-col gap-4 max-w-4xl">
          <h1 className="text-[#14141e] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e6f1fb] rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <span className="font-bold text-[#0c447c] text-xs tracking-wider">{authorInitials}</span>
            </div>
            <div>
              <p className="text-[#14141e] text-sm font-semibold">{authorName}</p>
              <p className="text-[#787882] text-xs font-normal mt-0.5 flex flex-wrap items-center gap-1.5">
                <time dateTime={date}>{date}</time>
                <span aria-hidden="true">·</span>
                <span>{readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{views} views</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-end">
          <button
            type="button"
            onClick={handleLikeToggle}
            className={`px-4 py-2 rounded-lg inline-flex items-center justify-center font-medium text-xs transition-all active:scale-95 ${
              liked 
                ? 'bg-[#378add] text-white hover:bg-[#2a74bd]' 
                : 'bg-[#e6f1fb] text-[#0c447c] hover:bg-[#d5e8fa]'
            }`}
            aria-label={`Like article, current count ${currentLikes} likes`}
          >
            {liked ? "♥" : "♡"}&nbsp;&nbsp;{currentLikes}
          </button>
          <button type="button" className="px-4 py-2 bg-white rounded-lg border border-solid border-[#d2d2da] inline-flex items-center justify-center font-normal text-[#14141e] text-xs transition-colors hover:bg-gray-50 active:scale-95">
            Share
          </button>
        </div>
      </div>
    </article>
  );
};