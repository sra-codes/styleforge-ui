'use client';

import { UIComponent } from '@/types';
import { useStore } from '@/store/useStore';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { X, Save, Play, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ComponentViewerProps {
  componentId: string;
}

export function ComponentViewer({ componentId }: ComponentViewerProps) {
  const { components, updateComponent } = useStore();
  const router = useRouter();
  
  const component = components.find((c) => c.id === componentId);
  
  const [html, setHtml] = useState(component?.html || '');
  const [css, setCss] = useState(component?.css || '');
  const [js, setJs] = useState(component?.js || '');
  const [reactCode, setReactCode] = useState(component?.react || '');
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'react'>('html');
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!component) return null;

  const handleSave = () => {
    setIsSaving(true);
    updateComponent(component.id, { html, css, js, react: reactCode });
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleCopy = () => {
    let content = '';
    if (activeTab === 'html') content = html;
    if (activeTab === 'css') content = css;
    if (activeTab === 'js') content = js;
    if (activeTab === 'react') content = reactCode;
    
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSrcDoc = () => {
    if (activeTab === 'react') {
      let cleanReactCode = reactCode
        .replace(/import\s+.*?\s+from\s+['"].*?['"];?/g, '');

      let renderLogic = '';
      if (cleanReactCode.includes('export default')) {
        cleanReactCode = cleanReactCode.replace(/export\s+default\s+/g, 'const DefaultExport = ');
        cleanReactCode = cleanReactCode.replace(/export\s+/g, '');
        renderLogic = `
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<DefaultExport />);
        `;
      } else {
        const match = cleanReactCode.match(/function\s+([A-Z]\w*)/) || cleanReactCode.match(/const\s+([A-Z]\w*)\s*=/);
        const componentName = match ? match[1] : null;
        if (componentName) {
          renderLogic = `
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(<${componentName} />);
          `;
        } else {
          renderLogic = `
            document.getElementById('root').innerHTML = '<p style="color: #ef4444; font-family: sans-serif; text-align: center;">Could not find a React component to render.<br/>Please use "export default" or name your component with a capital letter.</p>';
          `;
        }
      }

      return `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
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
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              try {
                ${cleanReactCode}
                ${renderLogic}
              } catch (err) {
                document.getElementById('root').innerHTML = '<div style="color: #ef4444; font-family: monospace; padding: 20px; background: #fee2e2; border-radius: 8px; max-width: 80%; word-wrap: break-word;">' + err.message + '</div>';
              }
            </script>
          </body>
        </html>
      `;
    }

    return `
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
            ${css}
          </style>
        </head>
        <body>
          ${html}
          ${js ? `<script>${js}</script>` : ''}
        </body>
      </html>
    `;
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-zinc-100">{component.name}</h2>
          <div className="flex gap-2">
            {component.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isSaving ? <Check size={16} /> : <Save size={16} />}
            {isSaving ? 'Saved' : 'Save Changes'}
          </button>
          <button
            onClick={() => router.push('/')}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Pane */}
        <div className="w-1/2 flex flex-col border-r border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between px-4 h-12 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex gap-1">
              {(['html', 'css', 'js', 'react'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-zinc-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors text-sm"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={activeTab === 'js' ? 'javascript' : activeTab === 'react' ? 'typescript' : activeTab}
              theme="vs-dark"
              value={activeTab === 'html' ? html : activeTab === 'css' ? css : activeTab === 'js' ? js : reactCode}
              onChange={(value) => {
                if (activeTab === 'html') setHtml(value || '');
                if (activeTab === 'css') setCss(value || '');
                if (activeTab === 'js') setJs(value || '');
                if (activeTab === 'react') setReactCode(value || '');
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>

        {/* Preview Pane */}
        <div className="w-1/2 flex flex-col bg-zinc-900 relative">
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-800/50 text-xs font-medium text-zinc-300">
            <Play size={12} className="text-indigo-400" /> Live Preview
          </div>
          <iframe
            srcDoc={getSrcDoc()}
            title="Preview"
            className="w-full h-full border-none bg-white/5"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}
