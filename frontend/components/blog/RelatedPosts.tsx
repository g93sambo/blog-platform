'use client';

import Link from "next/link";

interface RelatedPostItem {
  id: string; 
  title: string;
  author: string;
  readTime: string;
  color: string;
}

interface RelatedPostsProps {
  label?: string;
  posts: RelatedPostItem[];
}

export const RelatedPosts = ({ label = "RELATED POSTS", posts }: RelatedPostsProps) => {
  return (
    <section aria-labelledby="related-posts-heading" className="w-full bg-[#f5f5f7] rounded-xl border border-solid border-[#d2d2da] p-4 flex flex-col gap-4 text-left">
      <h2 id="related-posts-heading" className="text-[#787882] text-[10px] font-medium tracking-wider uppercase">
        {label}
      </h2>

      <ul className="m-0 p-0 list-none flex flex-col gap-4">
        {posts.map((post, index) => (
          <li key={post.id} className="w-full flex flex-col gap-4">
            
            <Link href={`/blog/${post.id}`} className="block group w-full">
              <article className="flex gap-3 items-center w-full">
                
                <div 
                  className="w-12 h-12 rounded-md flex-shrink-0 transition-opacity group-hover:opacity-85 cursor-pointer"
                  style={{ backgroundColor: post.color }}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-1 w-full min-w-0">
                  <h3 className="text-[#14141e] text-xs font-medium leading-tight line-clamp-2 group-hover:text-[#378add] transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-[#787882] text-[11px] font-normal truncate">
                    {post.author} · {post.readTime}
                  </p>
                </div>

              </article>
            </Link>

            {index < posts.length - 1 && (
              <hr className="w-full h-px border-0 bg-[#d2d2da] m-0" aria-hidden="true" />
            )}

          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedPosts;