export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">About Blogify</h1>
          <p className="text-blue-600 font-medium mb-8">Stories worth reading. Ideas worth sharing.</p>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Blogify is a modern publishing platform built for writers, thinkers, and creators who
              want their words to reach the right audience. Whether you're sharing industry insights,
              personal essays, or culture commentary — this is your space.
            </p>
            <p>
              We believe great writing should be easy to discover. Our platform surfaces the best
              content through smart categorisation, trending signals, and a community that actually
              reads what you write.
            </p>
            <h2 className="text-lg font-bold text-slate-900 pt-2">Our mission</h2>
            <p>
              To give every writer — from first-timers to seasoned journalists — a beautiful,
              distraction-free home for their ideas. No algorithm games. No paywalls between writers
              and readers. Just good content.
            </p>
            <h2 className="text-lg font-bold text-slate-900 pt-2">Built with care</h2>
            <p>
              Blogify was built as a full-stack passion project using Next.js, Node.js, and MongoDB.
              Every feature is designed with both writers and readers in mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
