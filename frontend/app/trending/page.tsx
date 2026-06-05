import Link from 'next/link';

const TRENDING = [
  { rank: 1, title: 'Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules', category: 'Fashion', author: 'Amara Okafor', readTime: '5m', views: '2.4k', color: '#f5c4d1', slug: 'street-souk' },
  { rank: 2, title: 'GTA VI Finally Drops — Was the Wait Worth It?', category: 'Gaming', author: 'Josh Levi', readTime: '4m', views: '1.9k', color: '#c3d2f8', slug: 'gta-vi' },
  { rank: 3, title: 'Rihanna & A$AP Rocky Shut Down the Met Gala', category: 'Music', author: 'Sofia M.', readTime: '3m', views: '1.5k', color: '#edb4c8', slug: 'met-gala' },
  { rank: 4, title: "AI is eating software jobs. Here's what nobody's saying.", category: 'Tech', author: 'Kemi A.', readTime: '6m', views: '1.2k', color: '#c0dd97', slug: 'ai-jobs' },
  { rank: 5, title: 'Why your 9-to-5 will never make you rich', category: 'Business', author: 'David O.', readTime: '5m', views: '980', color: '#ffd9a0', slug: 'nine-to-five' },
  { rank: 6, title: "Gen Z doesn't need therapy. We need systemic change.", category: 'Mental Health', author: 'Priya S.', readTime: '4m', views: '870', color: '#b5e8d8', slug: 'gen-z-therapy' },
  { rank: 7, title: 'The quiet rise of African cinema on the global stage', category: 'Entertainment', author: 'Amara Okafor', readTime: '7m', views: '760', color: '#f5d4a0', slug: 'african-cinema' },
  { rank: 8, title: "Inside the world's most expensive sneaker drop", category: 'Fashion', author: 'Josh Levi', readTime: '4m', views: '690', color: '#f5c4d1', slug: 'sneaker-drop' },
  { rank: 9, title: 'How one startup turned rejection into a $1B valuation', category: 'Business', author: 'Kemi A.', readTime: '6m', views: '620', color: '#d4e5b4', slug: 'startup-rejection' },
  { rank: 10, title: "The mental load of being 'always on' in a remote job", category: 'Lifestyle', author: 'Priya S.', readTime: '5m', views: '540', color: '#d4b5e8', slug: 'remote-mental-load' },
];

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">🔥 Trending</h1>
          <p className="text-slate-500 mt-2">The most-read stories right now</p>
        </div>

        <div className="flex flex-col gap-4">
          {TRENDING.map((post) => (
            <Link
              key={post.rank}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-all"
            >
              {/* Rank */}
              <span className="text-3xl font-black text-slate-200 w-10 text-center flex-shrink-0 group-hover:text-blue-200 transition-colors">
                {post.rank}
              </span>

              {/* Color bar */}
              <div className="w-1.5 h-14 rounded-full flex-shrink-0" style={{ backgroundColor: post.color }} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{post.category}</span>
                <h2 className="font-semibold text-slate-800 text-sm leading-snug mt-0.5 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">{post.author} · {post.readTime} read · {post.views} views</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
