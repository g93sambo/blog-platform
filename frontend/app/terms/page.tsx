export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-400 mb-8">Last updated: June 2026</p>

          <div className="space-y-6 text-slate-600 leading-relaxed text-sm">
            {[
              { title: '1. Acceptance of terms', body: 'By using Blogify, you agree to these Terms of Service. If you do not agree, please do not use the platform.' },
              { title: '2. Your account', body: 'You are responsible for maintaining the security of your account and all activity that occurs under it. You must provide accurate information when registering.' },
              { title: '3. Content you publish', body: 'You retain ownership of all content you post. By publishing on Blogify, you grant us a non-exclusive licence to display your content on the platform. You are solely responsible for ensuring your content does not infringe any third-party rights.' },
              { title: '4. Prohibited content', body: 'You may not publish content that is defamatory, harassing, hateful, illegal, or that infringes intellectual property rights. We reserve the right to remove any content that violates these terms.' },
              { title: '5. Account termination', body: 'We may suspend or terminate accounts that violate these terms. You may delete your account at any time from the Settings page.' },
              { title: '6. Disclaimers', body: 'Blogify is provided "as is" without warranties of any kind. We are not liable for any losses or damages arising from your use of the platform.' },
              { title: '7. Changes to terms', body: 'We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.' },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-bold text-slate-800 text-base mb-2">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
