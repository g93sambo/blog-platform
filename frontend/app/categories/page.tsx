import Link from 'next/link';

const CATEGORIES = [
  { name: 'Tech', emoji: '💻', count: 142, color: '#c0dd97', desc: 'AI, software, gadgets & the future of the internet' },
  { name: 'Business', emoji: '📈', count: 98, color: '#d4e5b4', desc: 'Startups, money, markets & entrepreneurship' },
  { name: 'Fashion', emoji: '👗', count: 87, color: '#f5c4d1', desc: 'Style, trends, culture & the global fashion scene' },
  { name: 'Gaming', emoji: '🎮', count: 76, color: '#c3d2f8', desc: 'Reviews, news & deep dives into gaming culture' },
  { name: 'Music', emoji: '🎵', count: 64, color: '#edb4c8', desc: 'Albums, artists, tours & the stories behind the sound' },
  { name: 'Sports', emoji: '⚽', count: 59, color: '#ffd9a0', desc: 'Match reports, analysis & sports lifestyle' },
  { name: 'Mental Health', emoji: '🧠', count: 48, color: '#b5e8d8', desc: 'Wellness, therapy culture & emotional intelligence' },
  { name: 'Entertainment', emoji: '🎬', count: 112, color: '#f5d4a0', desc: 'Movies, TV, celebs & pop culture moments' },
  { name: 'Lifestyle', emoji: '🌿', count: 73, color: '#d4b5e8', desc: 'Travel, food, relationships & living well' },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500 mt-2">Browse stories by topic</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/?category=${cat.name}`}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: cat.color }}
              >
                {cat.emoji}
              </div>
              <h2 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{cat.name}</h2>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{cat.desc}</p>
              <p className="text-xs text-slate-400 mt-3 font-medium">{cat.count} articles</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
