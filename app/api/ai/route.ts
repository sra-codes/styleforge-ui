import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MODEL_NAME = 'gemini-3-flash-preview';

type GenerateRequest = {
  action: 'generate';
  prompt: string;
};

type ConvertRequest = {
  action: 'convert';
  css: string;
  html: string;
};

type AIRequest = GenerateRequest | ConvertRequest;

function isGenerateRequest(payload: unknown): payload is GenerateRequest {
  return Boolean(
    payload &&
      typeof payload === 'object' &&
      'action' in payload &&
      'prompt' in payload &&
      (payload as Record<string, unknown>).action === 'generate' &&
      typeof (payload as Record<string, unknown>).prompt === 'string'
  );
}

function isConvertRequest(payload: unknown): payload is ConvertRequest {
  return Boolean(
    payload &&
      typeof payload === 'object' &&
      'action' in payload &&
      'html' in payload &&
      'css' in payload &&
      (payload as Record<string, unknown>).action === 'convert' &&
      typeof (payload as Record<string, unknown>).html === 'string' &&
      typeof (payload as Record<string, unknown>).css === 'string'
  );
}

function buildPrompt(payload: AIRequest): string {
  if (payload.action === 'generate') {
    return `
      You are an expert UI developer. Create a UI component based on this request: "${payload.prompt}".
      Return ONLY a JSON object with the following keys:
      - "html": The HTML string for the component.
      - "css": The CSS string for the component (use modern CSS, variables, flex/grid, animations if requested).
      - "js": Any necessary JavaScript (optional, leave empty if not needed).
      - "react": The React component code using Tailwind CSS classes.
      - "name": A short, catchy name for the component.
      - "tags": An array of 3-5 relevant string tags (e.g., ["hover", "glass", "button"]).

      Do not include markdown formatting like \`\`\`json in your response. Just the raw JSON.
    `;
  }

  return `
    You are an expert UI developer. Convert the following HTML and CSS into a single React functional component using Tailwind CSS utility classes.

    HTML:
    ${payload.html}

    CSS:
    ${payload.css}

    Return ONLY a JSON object with the following key:
    - "react": The complete React component code using Tailwind CSS classes.
  `;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!isGenerateRequest(payload) && !isConvertRequest(payload)) {
    return NextResponse.json({ error: 'Unsupported AI request payload.' }, { status: 400 });
  }

  if (payload.action === 'generate' && !payload.prompt.trim()) {
    return NextResponse.json({ error: 'A prompt is required.' }, { status: 400 });
  }

  if (payload.action === 'convert' && (!payload.html.trim() || !payload.css.trim())) {
    return NextResponse.json({ error: 'HTML and CSS are required for conversion.' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'GEMINI_API_KEY is not configured. Add it to .env.local to enable prompt generation and conversion features.',
      },
      { status: 500 }
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: buildPrompt(payload),
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim();

    if (!text) {
      return NextResponse.json({ error: 'The AI service returned an empty response.' }, { status: 502 });
    }

    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({ error: 'The AI service returned invalid JSON.' }, { status: 502 });
    }
  } catch (error) {
    console.error('AI request failed:', error);
    return NextResponse.json(
      { error: 'Unable to complete the AI request right now. Please try again.' },
      { status: 500 }
    );
  }
}