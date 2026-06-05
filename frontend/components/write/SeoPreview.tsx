'use client';

interface SeoPreviewProps {
  title: string;
  subtitle: string;
}

export const SeoPreview = ({ title, subtitle }: SeoPreviewProps) => {
  const displayTitle = title.trim() || "Street Souk: How Lagos Market Culture Is Rewriting...";
  const displayDesc = subtitle.trim() || "From Balogun to Brooklyn — underground designers turning fabric markets into movements...";

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm text-xs text-left">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SEO Preview</h3>
      <div className="flex flex-col gap-0.5 max-w-full overflow-hidden">
        <span className="text-[#378add] font-medium text-sm truncate hover:underline cursor-pointer">
          {displayTitle}
        </span>
        <span className="text-green-700 font-normal text-[11px] truncate">
          blogify.app/post/{displayTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
        </span>
        <p className="text-gray-500 font-normal text-[11px] line-clamp-2 leading-tight">
          {displayDesc}
        </p>
      </div>
    </div>
  );
};