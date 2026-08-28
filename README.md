# Magneto Partners

Marketing website for Magneto Partners — a strategic consulting firm in rare-earth magnets, EV supply chains, motor materials, and advanced manufacturing intelligence. Chief Advisor: Dr Raghavan Gopalan.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form + Zod
- Lucide React icons
- Canvas-based hero particle network (no Three.js)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — pages (Home, Services, Industries, AI Advisor, Insights, About, Contact)
- `components/` — UI, layout, section, advisor, contact, and about components
- `lib/` — typed content (`constants.ts`), chat response logic (`chatResponses.ts`), and shared types (`types.ts`)

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
