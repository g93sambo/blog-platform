interface PostCardProps {
  category: string;
  title: string;
  author: string;
  readTime: string;
  color: string;
  description?: string;
  variant?: 'small' | 'medium' | 'featured';
}

export const PostCard = ({ category, title, author, readTime, color, description, variant = 'medium' }: PostCardProps) => {
  const isFeatured = variant === 'featured';
  const isSmall = variant === 'small';

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#d2d2da] bg-white h-full transition-all hover:shadow-lg">
      {/* Dynamic Banner Height: h-24 for small, h-48 for medium/vertical, h-64 for featured */}
      <div 
        className={`${isSmall ? 'h-24' : isFeatured ? 'h-64' : 'h-48'} w-full transition-all`} 
        style={{ backgroundColor: color }} 
      />
      
      <div className="flex flex-col p-5 flex-grow gap-3">
        <span className="w-fit px-3 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
          {category}
        </span>
        
        <h2 className={`font-bold text-[#14141e] leading-tight ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
          {title}
        </h2>

        {description && (
          <p className="text-sm text-[#787882] line-clamp-3 text-justify leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-auto pt-4 flex justify-between items-center text-[11px] text-[#787882] border-t border-gray-50">
          <span className="font-medium text-gray-900">{author}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
};