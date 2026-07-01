'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
      <p className="text-gray-500 mb-8 max-w-md text-center">
        We apologize for the inconvenience. An unexpected error has occurred while trying to process your request.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm"
        >
          Try again
        </button>
        <Link 
          href="/"
          className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-bold py-3 px-6 rounded-lg transition-colors shadow-sm"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
