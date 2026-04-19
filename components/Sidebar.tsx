'use client';

import { CATEGORIES } from '@/types';
import { useStore } from '@/store/useStore';
import { LayoutGrid, Star, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function Sidebar() {
  const { activeCategory, setActiveCategory, components, favorites } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const allTags = Array.from(new Set(components.flatMap((c) => c.tags))).sort();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 h-screen overflow-y-auto flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">S</span>
          </div>
          StyleForge
        </Link>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Library
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  if (pathname !== '/') router.push('/');
                  setActiveCategory(null);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  activeCategory === null && pathname === '/'
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <LayoutGrid size={16} />
                All Components
                <span className="ml-auto text-xs bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">
                  {components.length}
                </span>
              </button>
              <button
                onClick={() => {
                  if (pathname !== '/') router.push('/');
                  setActiveCategory('Favorites');
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  activeCategory === 'Favorites'
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <Star size={16} />
                Favorites
                <span className="ml-auto text-xs bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">
                  {favorites.length}
                </span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {CATEGORIES.map((category) => {
                const count = components.filter((c) => c.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      if (pathname !== '/') router.push('/');
                      setActiveCategory(category);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      activeCategory === category
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    )}
                  >
                    {category}
                    <span className="ml-auto text-xs bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 15).map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    if (pathname !== '/') router.push('/');
                    useStore.getState().toggleTag(tag);
                  }}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors border",
                    useStore.getState().activeTags.includes(tag)
                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                  )}
                >
                  <Hash size={10} />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
