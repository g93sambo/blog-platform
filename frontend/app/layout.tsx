import type { ReactNode } from 'react';
import './globals.css';
import ClientProviders from '@/components/shared/ClientProviders';

export const metadata = {
  title: 'Blogify',
  description: 'Where ideas go live.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}