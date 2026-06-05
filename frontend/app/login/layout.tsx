import type { ReactNode } from 'react';

// Login page gets a clean full-screen layout — no nav chrome
export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
