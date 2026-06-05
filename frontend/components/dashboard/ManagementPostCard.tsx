'use client';

import Link from "next/link";

interface ManagementPostCardProps {
  id: string;
  title: string;
  category: string;
  status: string;
  views: string;
  date: string;
  color: string;
  onDelete: () => void;
}

export const ManagementPostCard = ({
  id,
  title,
  category,
  status,
  views,
  date,
  color,
  onDelete
}: ManagementPostCardProps) => {
  
  // Style lookups matching badge statuses elegantly
  const statusStyles: Record<string, string> = {
    Published: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Draft: "bg-gray-50 text-gray-600 border-gray-100",
    "Under Review": "bg-amber-50 text-amber-700 border-amber-100"
  };

  return (
    <article className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full relative group">
      
      {/* Asset Display Visual Box Wrapper Banner */}
      <Link href={`/blog/${id}`} className="w-full h-32 block overflow-hidden cursor-pointer">
        <div className="w-full h-full transition-transform duration-300 group-hover:scale-102" style={{ backgroundColor: color }} />
      </Link>

      {/* Content Space Matrix Details Layout */}
      <div className="p-4 flex flex-col flex-grow gap-3 text-xs justify-between">
        
        <div className="flex flex-col gap-2">
          {/* Post Categorization and Status Row Labels */}
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 uppercase">
              {category}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusStyles[status] || 'bg-gray-50'}`}>
              {status}
            </span>
          </div>

          {/* Dynamic Article Header String Anchor */}
          <Link href={`/blog/${id}`} className="block cursor-pointer">
            <h2 className="text-gray-900 font-bold text-sm leading-snug line-clamp-2 hover:text-[#378add] transition-colors">
              {title}
            </h2>
          </Link>
        </div>

        {/* Footer Metrics tracking Row Block along with Interactive Action Nodes */}
        <div className="flex justify-between items-center border-t border-gray-50 pt-3 text-gray-400 font-medium text-[11px]">
          <span>{views === "—" ? "0" : views} views · {date}</span>
          
          {/* Functional Delete Action Bubble Component Element Trigger */}
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            title="Delete this article permanently"
            aria-label={`Delete article titled: ${title}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

      </div>
    </article>
  );
};