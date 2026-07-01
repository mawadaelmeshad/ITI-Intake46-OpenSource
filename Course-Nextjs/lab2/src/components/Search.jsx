'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('query', searchTerm);
      } else {
        params.delete('query');
      }
      replace(`/?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="mb-16 flex gap-3 max-w-2xl mx-auto relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500"></div>
      <div className="relative flex w-full gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search premium products..."
            className="w-full pl-11 pr-4 py-4 bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-slate-500 transition-all shadow-inner font-medium text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-wait text-lg border border-indigo-500/50"
        >
          {isPending ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
