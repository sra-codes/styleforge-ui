'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Search, FileCode2, Plus, Star } from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { components, setActiveCategory } = useStore();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
        <Command
          className="flex flex-col w-full h-full"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <div className="flex items-center px-4 py-3 border-b border-zinc-800">
            <Search className="text-zinc-500 mr-2" size={18} />
            <Command.Input
              autoFocus
              placeholder="Search the library or jump to an action..."
              className="flex-1 bg-transparent text-zinc-200 outline-none placeholder:text-zinc-500"
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-zinc-500 text-sm">
              No results found.
            </Command.Empty>

            <Command.Group heading="Quick Actions" className="text-xs font-medium text-zinc-500 px-2 py-1.5">
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  router.push('/add');
                }}
                className="flex items-center gap-2 px-2 py-2 text-sm text-zinc-300 rounded-md cursor-pointer hover:bg-zinc-800 aria-selected:bg-zinc-800"
              >
                <Plus size={16} /> Create Component
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  router.push('/');
                  setActiveCategory('Favorites');
                }}
                className="flex items-center gap-2 px-2 py-2 text-sm text-zinc-300 rounded-md cursor-pointer hover:bg-zinc-800 aria-selected:bg-zinc-800"
              >
                <Star size={16} /> View Favorites
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Components" className="text-xs font-medium text-zinc-500 px-2 py-1.5 mt-2">
              {components.map((component) => (
                <Command.Item
                  key={component.id}
                  value={component.name + ' ' + component.tags.join(' ')}
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/?view=${component.id}`);
                  }}
                  className="flex items-center gap-2 px-2 py-2 text-sm text-zinc-300 rounded-md cursor-pointer hover:bg-zinc-800 aria-selected:bg-zinc-800"
                >
                  <FileCode2 size={16} className="text-indigo-400" />
                  {component.name}
                  <span className="ml-auto text-xs text-zinc-500">{component.category}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
