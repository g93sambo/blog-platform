'use client';

import { PostCard } from "../shared/PostCard";

interface PostGridProps {
  activeCategory: string;
}

export default function PostGrid({ activeCategory }: PostGridProps) {
  const colors = ["#c7e3a6", "#ffcc80", "#b39ddb", "#f5c4d1", "#c3d2f8"];

  // Mock Data: ID is generated as a string type
  const allPosts = Array.from({ length: 15 }).map((_, index) => ({
    id: index === 0 ? "street-souk" : `post-${index + 1}`, // Clean string IDs
    category: index % 2 === 0 ? "Tech" : "Lifestyle",
    title: index === 0 
      ? "Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules" 
      : `Insightful Article #${index + 1}`,
    description: "Exploring the intersection of Human-Computer Interaction and modern software engineering frameworks.",
    author: "Adongo K.",
    readTime: "6 min",
    color: colors[index % colors.length]
  }));

  const filteredPosts = activeCategory === "All" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <section className="py-8">
      {/* FEATURED SECTION */}
      {activeCategory === "All" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <PostCard 
              id="street-souk" // Explicit passing of ID string here
              variant="featured"
              category="Fashion"
              title="Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules"
              description="The Lagos market scene is becoming a global hub for streetwear and cultural expression..."
              author="Amara Okafor"
              readTime="5 min read"
              color="#f5c4d1"
            />
          </div>
          <div className="flex flex-col gap-6">
            <PostCard id="gta-vi" variant="small" category="Gaming" title="GTA VI Finally Drops..." author="Josh Levi" readTime="4 min" color="#c3d2f8" />
            <PostCard id="met-gala" variant="small" category="Music" title="Rihanna & A$AP Rocky..." author="Sofia M." readTime="3 min" color="#f8bbd0" />
          </div>
        </div>
      )}

      {/* TRENDING SMALL FEED ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredPosts.slice(0, 3).map((post) => (
          // Using the spread operator works perfectly here because post.id exists!
          <PostCard key={post.id} variant="small" {...post} />
        ))}
      </div>

      {/* TRANSITION SPLIT */}
      <div className="my-20 border-t border-gray-100 relative">
        <span className="absolute -top-3 left-0 bg-white pr-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Deep Dive Feed
        </span>
      </div>

      {/* DEEP DIVE VERTICAL FEED */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredPosts.slice(3).map((post) => (
          <PostCard key={post.id} variant="medium" {...post} />
        ))}
      </div>
    </section>
  );
}