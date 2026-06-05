'use client';

import { use } from "react";
import Link from "next/link";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogBody } from "@/components/blog/BlogBody";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { CommentSection } from "@/components/ui/CommentSection";

const mockPostDatabase: Record<string, any> = {
  "street-souk": {
    title: "Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules",
    bannerLeftColor: "#f5c4d1",
    bannerRightColor: "#bc4773",
    quote: '"The underground is now the mainstream. Lagos didn\'t wait for permission — it just built its own lane."',
    categories: [
      { label: "Fashion", bgClass: "bg-[#fbeaf0]", textClass: "text-[#993556]" },
      { label: "Culture", bgClass: "bg-[#e6f1fb]", textClass: "text-[#0c447c]" }
    ],
    paragraphs: [
      { id: "intro", text: "From the narrow alleys of Balogun Market to the runways of Brooklyn's most talked-about pop-ups, a new fashion movement is quietly rewriting the rules of global style. Lagos-based designers, once overlooked by the mainstream, are now setting trends that the biggest luxury houses are quietly copying — and rarely crediting." },
      { id: "body", text: "The movement started quietly — small-batch garments, handwoven fabrics, screen-printed tees with slogans that meant something to the community. But as social media gave these creators a global platform, what was once hyperlocal became hyper-influential. Today, you'll find Balogun's aesthetic in editorial spreads in Paris, Tokyo, and New York." }
    ],
    authorName: "Amara Okafor",
    authorInitials: "AO",
    authorBio: "Culture & fashion writer, Lagos.",
    date: "May 6, 2026",
    readTime: "5 min read",
    views: "2,410",
    likes: 184,
    related: [
      { id: "gta-vi", title: "GTA VI Finally Drops — Was the Wait Worth It?", author: "Josh Levi", readTime: "4 min", color: "#c3d2f8" },
      { id: "met-gala", title: "Rihanna & A$AP Rocky Shut Down the Met Gala", author: "Sofia M.", readTime: "3 min", color: "#f4c0d1" },
      { id: "ai-jobs", title: "AI is eating software jobs. Here's what nobody's saying.", author: "Kemi A.", readTime: "6 min", color: "#c0dd97" }
    ]
  },
  "gta-vi": {
    title: "GTA VI Finally Drops — Was the Wait Worth It?",
    bannerLeftColor: "#c3d2f8",
    bannerRightColor: "#4c6ef5",
    quote: '"A technical marvel that pushes hardware to its absolute limit, redefining modern open-world boundaries."',
    categories: [
      { label: "Gaming", bgClass: "bg-[#e6f1fb]", textClass: "text-[#0c447c]" },
      { label: "Tech", bgClass: "bg-[#e8f5e9]", textClass: "text-[#2e7d32]" }
    ],
    paragraphs: [
      { id: "intro", text: "After over a decade of speculation, trailers, and unprecedented industry anticipation, Rockstar Games has finally launched its latest magnum opus. The virtual streets are denser, the lighting mechanics defy expectations, and the cultural satire is sharper than ever." },
      { id: "body", text: "Initial benchmarks show incredible utilization of modern ray-tracing pipelines. While performance on baseline consoles sees minor frame pacing dips during high-intensity vehicular sequences, the software optimization is an undeniable engineering feat." }
    ],
    authorName: "Josh Levi",
    authorInitials: "JL",
    authorBio: "Tech & gaming analyst based in Lagos.",
    date: "May 20, 2026",
    readTime: "4 min read",
    views: "45,820",
    likes: 1042,
    related: [
      { id: "street-souk", title: "Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules", author: "Amara Okafor", readTime: "5 min", color: "#f5c4d1" },
      { id: "met-gala", title: "Rihanna & A$AP Rocky Shut Down the Met Gala", author: "Sofia M.", readTime: "3 min", color: "#f4c0d1" }
    ]
  }
};

export default function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const currentId = resolvedParams.id;
  const post = mockPostDatabase[currentId];

  // Structural Fallback Handler if the post route doesn't match our database records
  if (!post) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6 gap-4">
        <h1 className="text-xl font-bold text-gray-900">Article Content Under Construction</h1>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          The routing key <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600">/blog/{currentId}</code> does not have an allocated text block dataset configured yet.
        </p>
        <Link href="/dashboard" className="text-sm text-[#378add] font-medium hover:underline mt-2">
          ← Return to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="w-full h-[240px] md:h-[300px] flex overflow-hidden">
        <div className="w-1/2 h-full" style={{ backgroundColor: post.bannerLeftColor }} />
        <div className="w-1/2 h-full" style={{ backgroundColor: post.bannerRightColor }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-10">
          <BlogHeader {...post} />
          <BlogBody paragraphs={post.paragraphs} quote={post.quote} />
          <CommentSection />
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-6 h-fit">
          <AuthorCard initials={post.authorInitials} name={post.authorName} bio={post.authorBio} />
          <RelatedPosts posts={post.related} />
        </div>
      </div>
    </main>
  );
}