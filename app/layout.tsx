import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { CommandPalette } from '@/components/CommandPalette';

export const metadata: Metadata = {
  title: {
    default: 'StyleForge',
    template: '%s | StyleForge',
  },
  applicationName: 'StyleForge',
  description:
    'Curated UI components and CSS animations with live previews, inline editing, local persistence, and optional prompt-based generation.',
  keywords: [
    'UI components',
    'CSS animations',
    'component library',
    'live preview',
    'Tailwind CSS',
    'Next.js',
  ],
  openGraph: {
    title: 'StyleForge',
    description:
      'Curated UI components and CSS animations with live previews, inline editing, local persistence, and optional prompt-based generation.',
    type: 'website',
    siteName: 'StyleForge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StyleForge',
    description:
      'Curated UI components and CSS animations with live previews, inline editing, local persistence, and optional prompt-based generation.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-50 flex h-screen overflow-hidden antialiased selection:bg-indigo-500/30">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 bg-zinc-950/50">
            {children}
          </main>
        </div>
        <CommandPalette />
      </body>
    </html>
  );
}
