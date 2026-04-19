'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Sparkles, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import Link from 'next/link';

type AIRequestPayload =
  | { action: 'generate'; prompt: string }
  | { action: 'convert'; html: string; css: string };

interface AIResponse {
  css?: string;
  error?: string;
  html?: string;
  js?: string;
  name?: string;
  react?: string;
  tags?: string[];
}

async function requestAi(payload: AIRequestPayload): Promise<AIResponse> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as AIResponse;

  if (!response.ok) {
    throw new Error(data.error || 'Request failed.');
  }

  return data;
}

export default function AddComponentPage() {
  const { addComponent } = useStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [reactCode, setReactCode] = useState('');

  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const handleSave = () => {
    if (!name || !html) return alert('Name and HTML are required.');

    const newComponent = {
      id: uuidv4(),
      name,
      category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      description,
      html,
      css,
      js,
      react: reactCode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    addComponent(newComponent);
    router.push('/');
  };

  const handleGenerate = async () => {
    if (!aiPrompt) return alert('Please enter a prompt.');
    setIsGenerating(true);

    try {
      const data = await requestAi({ action: 'generate', prompt: aiPrompt });
      
      if (data.html) setHtml(data.html);
      if (data.css) setCss(data.css);
      if (data.js) setJs(data.js);
      if (data.react) setReactCode(data.react);
      if (data.name && !name) setName(data.name);
      if (data.tags && !tags) setTags(data.tags.join(', '));
      
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate a draft. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConvertToTailwind = async () => {
    if (!html || !css) return alert('HTML and CSS are required for conversion.');
    setIsConverting(true);

    try {
      const data = await requestAi({ action: 'convert', html, css });
      
      if (data.react) {
        setReactCode(data.react);
      } else {
        alert('Failed to generate React + Tailwind code.');
      }
      
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert to React + Tailwind. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Add Component</h1>
            <p className="text-zinc-400 text-sm mt-1">Create a component manually or generate a starting point from a prompt.</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
        >
          <Save size={18} />
          Save Component
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & AI */}
        <div className="space-y-6">
          {/* AI Generator Box */}
          <div className="bg-zinc-900 border border-indigo-500/30 rounded-xl p-5 shadow-lg shadow-indigo-500/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <h3 className="text-sm font-semibold text-indigo-400 flex items-center gap-2 mb-3">
              <Sparkles size={16} /> Prompt Generator
            </h3>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., A pricing card with layered glass panels and a floating call-to-action"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 min-h-[100px] resize-none mb-3"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !aiPrompt}
              className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700"
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {isGenerating ? 'Generating...' : 'Generate Draft'}
            </button>
          </div>

          {/* Component Details */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Component Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Neon Button"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 appearance-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="hover, button, neon"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the component..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 min-h-[80px] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Code Editors */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[300px]">
            <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">HTML *</span>
            </div>
            <Editor
              height="100%"
              language="html"
              theme="vs-dark"
              value={html}
              onChange={(val) => setHtml(val || '')}
              options={{ minimap: { enabled: false }, padding: { top: 16 } }}
            />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[300px]">
            <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">CSS</span>
              <button
                onClick={handleConvertToTailwind}
                disabled={isConverting || !css || !html}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                {isConverting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                {isConverting ? 'Converting...' : 'Convert to React + Tailwind'}
              </button>
            </div>
            <Editor
              height="100%"
              language="css"
              theme="vs-dark"
              value={css}
              onChange={(val) => setCss(val || '')}
              options={{ minimap: { enabled: false }, padding: { top: 16 } }}
            />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[200px]">
            <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">JavaScript (Optional)</span>
            </div>
            <Editor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={js}
              onChange={(val) => setJs(val || '')}
              options={{ minimap: { enabled: false }, padding: { top: 16 } }}
            />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[300px]">
            <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">React + Tailwind (Optional)</span>
            </div>
            <Editor
              height="100%"
              language="typescript"
              theme="vs-dark"
              value={reactCode}
              onChange={(val) => setReactCode(val || '')}
              options={{ minimap: { enabled: false }, padding: { top: 16 } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
