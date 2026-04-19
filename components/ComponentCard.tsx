'use client';

import { UIComponent } from '@/types';
import { useStore } from '@/store/useStore';
import { Star, Code2, Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

interface ComponentCardProps {
  component: UIComponent;
}

export function ComponentCard({ component }: ComponentCardProps) {
  const { favorites, toggleFavorite, deleteComponent } = useStore();
  const isFavorite = favorites.includes(component.id);
  const [copied, setCopied] = useState<'html' | 'css' | 'js' | 'react' | null>(null);

  const handleCopy = (type: 'html' | 'css' | 'js' | 'react', content: string) => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: transparent;
            font-family: system-ui, -apple-system, sans-serif;
          }
          ${component.css}
        </style>
      </head>
      <body>
        ${component.html}
        ${component.js ? `<script>${component.js}</script>` : ''}
      </body>
    </html>
  `;

  return (
    <div className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50">
      {/* Preview Area */}
      <div className="relative h-48 bg-zinc-950/50 border-b border-zinc-800 overflow-hidden">
        <iframe
          srcDoc={srcDoc}
          title={component.name}
          className="w-full h-full border-none pointer-events-none"
          sandbox="allow-scripts"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <Link
            href={`/?view=${component.id}`}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Code2 size={16} />
            View Full Code
          </Link>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleFavorite(component.id)}
            className={cn(
              "p-2 rounded-lg backdrop-blur-md transition-colors",
              isFavorite
                ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                : "bg-black/50 text-zinc-400 hover:text-white hover:bg-black/70"
            )}
          >
            <Star size={16} className={cn(isFavorite && "fill-current")} />
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this component?')) {
                deleteComponent(component.id);
              }
            }}
            className="p-2 rounded-lg bg-black/50 text-zinc-400 hover:text-red-400 hover:bg-black/70 backdrop-blur-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-zinc-100 truncate" title={component.name}>
              {component.name}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">{component.category}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {component.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 text-[10px] uppercase tracking-wider font-medium"
            >
              {tag}
            </span>
          ))}
          {component.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-500 text-[10px] font-medium">
              +{component.tags.length - 3}
            </span>
          )}
        </div>

        {/* Quick Copy */}
        <div className="flex gap-2 pt-3 border-t border-zinc-800/50 mt-1">
          <button
            onClick={() => handleCopy('html', component.html)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors"
          >
            {copied === 'html' ? <span className="text-green-400">Copied!</span> : <>HTML</>}
          </button>
          <button
            onClick={() => handleCopy('css', component.css)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors"
          >
            {copied === 'css' ? <span className="text-green-400">Copied!</span> : <>CSS</>}
          </button>
          {component.react && (
            <button
              onClick={() => handleCopy('react', component.react!)}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors"
            >
              {copied === 'react' ? <span className="text-green-400">Copied!</span> : <>React</>}
            </button>
          )}
          {component.js && !component.react && (
            <button
              onClick={() => handleCopy('js', component.js)}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors"
            >
              {copied === 'js' ? <span className="text-green-400">Copied!</span> : <>JS</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
