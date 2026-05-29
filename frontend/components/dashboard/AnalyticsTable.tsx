import { TopPost } from '@/types';

interface AnalyticsTableProps {
  posts: TopPost[];
}

export default function AnalyticsTable({ posts }: AnalyticsTableProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-[10px] border border-[#d2d2da] p-5 h-[260px] flex items-center justify-center">
        <p className="text-[#787882]">No posts yet</p>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-[10px] border border-[#d2d2da] overflow-hidden">
      <div className="p-5 border-b border-[#d2d2da]">
        <h2 className="text-sm font-medium text-[#14141e]">Top performing posts</h2>
      </div>

      {/* Table Header */}
      <div className="bg-[#f9f9fb] px-5 py-3 grid grid-cols-12 gap-4 text-xs font-medium text-[#787882]">
        <div className="col-span-5">Post title</div>
        <div className="col-span-2">Views</div>
        <div className="col-span-2">Likes</div>
        <div className="col-span-1">Read time</div>
        <div className="col-span-2">CTR</div>
      </div>

      {/* Table Body */}
      <div>
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`px-5 py-4 grid grid-cols-12 gap-4 items-center border-b border-[#f0f0f0] last:border-b-0 ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#fbfbfd]'
            }`}
          >
            <div className="col-span-5">
              <p className="text-[13px] font-normal text-[#14141e] line-clamp-2">
                {post.title}
              </p>
            </div>
            <div className="col-span-2 text-[13px] font-normal text-[#14141e]">
              {post.views.toLocaleString()}
            </div>
            <div className="col-span-2 text-[13px] font-normal text-[#14141e]">
              {post.likes.toLocaleString()}
            </div>
            <div className="col-span-1 text-[13px] font-normal text-[#14141e]">
              {post.readTime}
            </div>
            <div className="col-span-2 text-[13px] font-normal text-[#14141e]">
              {post.ctr}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
