import type { ReactNode } from 'react';

// Register page gets a clean full-screen layout — no nav chrome
export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
