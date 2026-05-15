import type { ReactNode } from "react";
import Header from "./components/Header";
import "./globals.css";
import footer from "./components/Footer";
import Footer from "./components/Footer";
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}