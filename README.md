# StyleForge

StyleForge is a Next.js UI component library and CSS animation vault for browsing, previewing, editing, saving, and generating reusable interface patterns.

## Highlights

- Browse a curated catalog of UI components and motion snippets
- Preview components live before copying or editing code
- Edit HTML, CSS, JavaScript, and React output directly in the browser
- Save favorites and custom components locally with Zustand persistence
- Convert HTML and CSS into React + Tailwind output
- Use optional prompt-based generation powered by Gemini

## Tech Stack

- Next.js 15 App Router
- React 19
- Tailwind CSS 4
- Monaco Editor
- Zustand
- Optional Google Gemini integration via `@google/genai`

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

1. Install dependencies.

   ```bash
   npm install
   ```

2. Create `.env.local` from `.env.example` if you want prompt generation and conversion features.

   ```env
   GEMINI_API_KEY="your_gemini_api_key"
   ```

3. Start the development server.

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | No | Enables prompt-based generation and HTML/CSS-to-React conversion. |

The component library, previews, editing workflow, and local favorites work without an API key.

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build
- `npm run start` serves the production build
- `npm run lint` runs ESLint and project checks
- `npm run clean` removes the local `.next` build output

## Project Structure

- `app/` contains the App Router pages and the server route for optional generation
- `components/` contains reusable UI building blocks
- `data/components.json` contains the seeded component library
- `store/useStore.ts` manages local persistence, favorites, and filters
- `types/` contains shared types and category definitions

## Publishing Notes

- Keep `.env.local` out of version control
- Run `npm run lint` and `npm run build` before publishing changes
- Prompt requests are handled server-side, so the API key stays off the client
- Update your GitHub repository name, description, and social preview after the first push
