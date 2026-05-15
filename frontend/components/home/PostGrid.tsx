import { PostCard } from "../shared/PostCard";

export default function PostGrid() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4">
      <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Featured Stories</h3>
      
      {/* TOP SECTION: Featured + 2 Small Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* The Pointed Card (Featured) - Spans 2 columns */}
        <div className="lg:col-span-2">
          <PostCard 
            variant="featured"
            category="Fashion"
            title="Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules"
            description="The Lagos market scene is becoming a global hub for streetwear..."
            author="Amara Okafor"
            readTime="5 min read"
            color="#f5c4d1"
          />
        </div>

        {/* Two Stacked Small Cards on the right */}
        <div className="flex flex-col gap-6">
          <PostCard variant="small" category="Gaming" title="GTA VI Finally Drops..." author="Josh Levi" readTime="4 min" color="#c3d2f8" />
          <PostCard variant="small" category="Music" title="Rihanna & A$AP Rocky..." author="Sofia M." readTime="3 min" color="#f8bbd0" />
        </div>
      </div>

      {/* MIDDLE SECTION: Your Red Circled Row (Medium Transition Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <PostCard category="Tech" title="AI is eating software jobs." author="Kemi A." readTime="6 min" color="#c7e3a6" />
        <PostCard category="Lifestyle" title="Why your 9-to-5 will never make you rich" author="Bola I." readTime="5 min" color="#ffcc80" />
        <PostCard category="Opinion" title="Gen Z doesn't need therapy." author="Tolu N." readTime="4 min" color="#b39ddb" />
      </div>

      {/* BOTTOM SECTION: Detailed Feed (Large Vertical Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <PostCard 
            key={`feed-post-${index}`}
            variant="medium" 
            title={`Evolution of Design: Part ${index + 1}`}
            description="Exploring the intersection of Human-Computer Interaction and modern software engineering frameworks."
            author="Adongo K." 
            readTime="6 min" 
            color="#c7e3a6" 
            category="Tech" 
          />
        ))}
      </div>
    </section>
  );
}