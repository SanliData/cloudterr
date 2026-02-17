# Cloud Communication LLC — Marketing Website

Production-ready marketing site for a US-based fiber infrastructure contractor. Built with **Next.js 14** (App Router), **TypeScript**, and **TailwindCSS**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Where to edit content

- **Company info, leadership, contact**: `src/data/company.ts`
- **Services** (overview + 7 detail pages): `src/data/services.ts`
- **Projects / case studies** (6 sample projects): `src/data/projects.ts`
- **Coverage** (DFW, Texas, mobilization): `src/data/coverage.ts`
- **Navigation and footer links**: `src/data/nav.ts`

## Pages

| Page | Path |
|------|------|
| Home | `/` |
| About | `/about` |
| Services | `/services` + `/services/[slug]` (7 slugs) |
| Projects | `/projects` + `/projects/[slug]` (6 slugs) |
| Coverage | `/coverage` |
| Safety & Quality | `/safety-quality` |
| International Cooperation | `/international-cooperation` |
| Fiber Infrastructure Glossary | `/glossary` |
| Careers / Subcontractors | `/careers` |
| Contact / RFQ | `/contact` |

## Features

- Sticky header, consistent footer, semantic HTML, ARIA-friendly nav
- SEO: per-page metadata (title, description), Open Graph basics
- RFQ form: client-side validation; on submit → success toast + JSON printed to console (no backend)
- “Request Prequalification Package” CTA opens modal with short form (name/email/company/role)
- Coverage: Texas/DFW map placeholder (SVG), service areas list
- Capabilities Statement: placeholder PDF link and short description section
- Framer Motion for subtle animations; Lucide React for icons

## Fiber Infrastructure Chat Assistant

Domain-restricted AI chat for fiber terminology, project guidance, and RFQ intake.

### How to add glossary terms

Edit `src/data/chatGlossary.ts` and add entries to the `chatGlossaryTerms` array:

```ts
{ term: "New Term", category: "Category Name", definition: "Definition text." },
```

### How to change safety rules

Edit `src/data/systemRules.ts` to modify:

- `systemPrompt`: AI behavior instructions
- `hardRules`: Never-provide flags (pricing, legal, etc.)
- `fallbackResponse` / `uncertainResponse`: Default replies

### Where to connect real email / CRM

- **API route**: `src/app/api/chat/route.ts` — add your email or CRM integration in the `POST` handler
- **RFQ form submit**: `src/components/FiberChat.tsx` — `handleRfqSubmit` currently logs JSON to console; replace with `fetch` to your backend or webhook
- **Environment**: Set `OPENAI_API_KEY` in `.env.local` for project-guidance mode (GPT-4o-mini)

### Telemetry

Console logs: `[FiberChat]` — mode, term requested, RFQ submission.

---

## Tech stack

- Next.js 14 (App Router), TypeScript, TailwindCSS
- Framer Motion, lucide-react
- OpenAI (optional, for project-guidance mode)
- Content in `src/data/*`
