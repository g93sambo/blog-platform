import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Blogify
            </Link>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link href="/about" className="text-sm text-gray-500 hover:text-blue-600 transition">
              About
            </Link>
            <Link href="/write" className="text-sm text-gray-500 hover:text-blue-600 transition">
              Write for us
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600 transition">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-blue-600 transition">
              Terms
            </Link>
          </nav>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Blogify. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;