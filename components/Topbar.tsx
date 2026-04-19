'use client';

import { useStore } from '@/store/useStore';
import { Search, Plus, Command } from 'lucide-react';
import Link from 'next/link';

export function Topbar() {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input
          type="text"
          placeholder="Search components, tags, or categories"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-12 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-zinc-600 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-zinc-500 text-xs font-mono bg-zinc-800 px-1.5 py-0.5 rounded">
          <Command size={12} /> K
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <Link
          href="/add"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add Component
        </Link>
      </div>
    </header>
  );
}
