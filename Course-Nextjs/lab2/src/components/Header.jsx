import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-950/70 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-sm hover:from-indigo-300 hover:to-purple-300 transition-all">
              NextStore
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link href="/" className="text-slate-300 hover:text-white font-medium hover:scale-105 transition-all">
              Home
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-white font-medium hover:scale-105 transition-all">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
