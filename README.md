# LXDraw

LXDraw is a real-time collaborative whiteboard built with Next.js, TypeScript, and Liveblocks. It includes classic drawing tools and an AI helper that can generate vector strokes from a text prompt.

## What is included

- Shared real-time canvas (single room: `lxdraw`)
- Selection and multi-selection
- Pencil drawing
- Rectangle and ellipse tools
- Eraser tool
- Undo / redo history
- Clear canvas action
- LX AI modal (BYOK OpenAI key) to generate line-art strokes

## Tech stack

- Next.js + React + TypeScript
- Liveblocks (presence, storage, history)
- SVG-based canvas rendering

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with your Liveblocks keys:

```bash
NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
```

Notes:
- `NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY` is currently used by `pages/api/liveblocks-auth.ts`.
- `LIVEBLOCKS_SECRET_KEY` is read in `pages/index.tsx` for startup warning checks.

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## LX AI (prompt-to-drawing)

- Click the magic button in the toolbar.
- Paste your OpenAI API key and enter a prompt.
- The key is saved in browser `localStorage` (`openai_api_key`) and sent with the request to `/api/generate`.
- The backend calls OpenAI (`gpt-4o`) and converts returned strokes into canvas path layers.

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run Next.js linting
