export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-400 mb-8">Last updated: June 2026</p>

          <div className="space-y-6 text-slate-600 leading-relaxed text-sm">
            {[
              { title: '1. Information we collect', body: 'We collect information you provide directly to us, such as your name, email address, and any content you create or share on the platform. We also collect usage data such as pages visited and features used.' },
              { title: '2. How we use your information', body: 'We use the information we collect to operate and improve the platform, send you updates about your account, personalise your experience, and ensure the security of our services.' },
              { title: '3. Data storage', body: 'Your data is stored securely in MongoDB Atlas with encryption at rest. Passwords are hashed using bcrypt and are never stored in plain text.' },
              { title: '4. Cookies', body: 'We use localStorage to maintain your session and preferences. We do not use third-party tracking cookies.' },
              { title: '5. Your rights', body: 'You have the right to access, correct, or delete your personal data at any time. You can do this from your account Settings page or by contacting us.' },
              { title: '6. Contact', body: 'For any privacy-related questions, please reach out through the platform.' },
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
