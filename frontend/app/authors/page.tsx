import Link from 'next/link';

const MOCK_AUTHORS = [
  { id: '1', name: 'Amara Okafor', username: 'amara', bio: 'Fashion & culture writer. Lagos → London.', posts: 24, followers: 1840, initials: 'AO', color: '#f5c4d1' },
  { id: '2', name: 'Josh Levi', username: 'josh', bio: 'Gaming journalist. I play so you don\'t have to.', posts: 18, followers: 2310, initials: 'JL', color: '#c3d2f8' },
  { id: '3', name: 'Sofia M.', username: 'sofia', bio: 'Music & entertainment. Always on the pulse.', posts: 31, followers: 3200, initials: 'SM', color: '#edb4c8' },
  { id: '4', name: 'Kemi Adeyemi', username: 'kemi', bio: 'Tech & business. Making complex ideas simple.', posts: 15, followers: 980, initials: 'KA', color: '#c0dd97' },
  { id: '5', name: 'David O.', username: 'davidO', bio: 'Sports analyst. Stats, stories & heat takes.', posts: 22, followers: 1560, initials: 'DO', color: '#ffd9a0' },
  { id: '6', name: 'Priya S.', username: 'priya', bio: 'Lifestyle & wellness. Living intentionally.', posts: 19, followers: 2100, initials: 'PS', color: '#b5e8d8' },
];

export default function AuthorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Authors</h1>
          <p className="text-slate-500 mt-2">Discover the voices behind the stories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_AUTHORS.map((author) => (
            <div key={author.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-slate-700 flex-shrink-0"
                  style={{ backgroundColor: author.color }}
                >
                  {author.initials}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{author.name}</h2>
                  <p className="text-sm text-slate-400">@{author.username}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{author.bio}</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{author.posts} posts</span>
                <span>{author.followers.toLocaleString()} followers</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
