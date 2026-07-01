import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-extrabold text-blue-100 tracking-widest mb-4">404</h1>
      <div className="bg-blue-600 text-white px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <h2 className="mt-8 text-3xl font-bold text-gray-900 mb-4">
        Oops! We can&apos;t find that page
      </h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg inline-block"
      >
        Return Home
      </Link>
    </div>
  );
}
