# Team Request Hub

A modern SaaS-style dashboard for Sales teams to submit and track support requests to Cloud Adoption, Technical, and Marketing teams.

## Features

- **Customer Type classification** — New Customer vs Existing Customer
- **Dashboard summary** — live stats by customer type, category, and priority
- **Request table** — filterable by customer type, priority, status, with search
- **New request modal** — full form with all required fields
- **REST API** — `/api/requests` GET / POST / PATCH / DELETE
- **Sortable columns** — click any column header to sort
- **Delete requests** — hover a row to reveal the delete button

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Lucide React](https://lucide.dev/) — icons
- TypeScript throughout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
team-request-hub/
├── app/
│   ├── api/requests/          # REST API routes
│   │   ├── route.ts           # GET (list + stats), POST
│   │   └── [id]/route.ts      # PATCH, DELETE
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # Dashboard page
├── components/
│   ├── dashboard/
│   │   ├── CustomerBreakdown.tsx
│   │   └── Topbar.tsx
│   ├── requests/
│   │   ├── NewRequestModal.tsx
│   │   └── RequestTable.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── StatCard.tsx
├── lib/
│   ├── data.ts                # In-memory store + sample data
│   └── utils.ts               # Helpers, class names, formatters
└── types/
    └── index.ts               # Shared TypeScript types
```

## Deploying to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. No environment variables needed for the default in-memory build

> **Note**: The default data store is in-memory and resets on each server restart. For production, swap `lib/data.ts` with a database (Postgres, PlanetScale, Supabase, etc.).

## Extending with a Database

Replace the functions in `lib/data.ts` with your ORM of choice. The API routes and components remain unchanged.

```ts
// Example with Prisma
import { prisma } from '@/lib/prisma';
export async function getRequests(filters) {
  return prisma.request.findMany({ where: buildWhere(filters) });
}
```
