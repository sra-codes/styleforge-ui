'use client';

import { useStore } from '@/store/useStore';
import { ComponentCard } from '@/components/ComponentCard';
import { ComponentViewer } from '@/components/ComponentViewer';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { SearchX } from 'lucide-react';

function DashboardContent() {
  const { components, favorites, searchQuery, activeCategory, activeTags } = useStore();
  const searchParams = useSearchParams();
  const viewId = searchParams.get('view');

  const filteredComponents = components.filter((c) => {
    // Search filter
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      activeCategory === null ||
      (activeCategory === 'Favorites' ? favorites.includes(c.id) : c.category === activeCategory);

    // Tags filter
    const matchesTags =
      activeTags.length === 0 || activeTags.every((t) => c.tags.includes(t));

    return matchesSearch && matchesCategory && matchesTags;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {activeCategory === 'Favorites'
              ? 'Favorites'
              : activeCategory || 'Component Library'}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
            <SearchX className="text-zinc-400" size={28} />
          </div>
          <h3 className="text-lg font-medium text-zinc-200">No components match</h3>
          <p className="text-zinc-500 mt-2 max-w-sm">
            Try a different search term or clear a few filters to widen the results.
          </p>
        </div>
      )}

      {viewId && <ComponentViewer key={viewId} componentId={viewId} />}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-zinc-500">Loading library...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
