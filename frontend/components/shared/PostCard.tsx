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
    <article className={`flex flex-col overflow-hidden rounded-xl border border-[#d2d2da] bg-white transition-shadow hover:shadow-md h-full`}>
      {/* Dynamic Banner Height */}
      <div className={`${isFeatured ? 'h-40' : 'h-24'} w-full`} style={{ backgroundColor: color }} />
      
      <div className="flex flex-col p-4 flex-grow">
        <span className="w-fit px-3 py-1 rounded-full bg-opacity-20 mb-3 text-[11px] font-medium" 
              style={{ backgroundColor: color, color: '#333' }}>
          {category}
        </span>
        
        <h2 className={`font-bold text-[#14141e] mb-2 ${isFeatured ? 'text-xl' : 'text-sm'}`}>
          {title}
        </h2>

        {/* Only Featured and Medium cards get descriptions */}
        {description && !isSmall && (
          <p className="text-xs text-[#787882] line-clamp-3 mb-4 text-justify">
            {description}
          </p>
        )}

        <div className="mt-auto pt-2 text-[11px] text-[#787882]">
          <span className="font-medium">{author}</span> · {readTime}
        </div>
      </div>
    </article>
  );
};