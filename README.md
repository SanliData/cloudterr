# Cloud Telecommunications — Marketing Website (www.cloudtelc.com)

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

## Nginx ile yayınlama (production)

Uygulama [NGINX](https://nginx.org/) reverse proxy ile yayınlanabilir. Next.js arka planda çalışır, nginx 80/443 portlarında trafiği uygulamaya yönlendirir.

### 1. Sunucuda uygulamayı çalıştırın

```bash
npm install
npm run build
npm start
```

Next.js varsayılan olarak `http://127.0.0.1:3000` üzerinde dinler.

### 2. Nginx yapılandırması

Projede hazır config: **`nginx/cloud-communications.conf`**

- **Linux (Debian/Ubuntu):**
  ```bash
  sudo cp nginx/cloud-communications.conf /etc/nginx/sites-available/cloud-communications
  sudo ln -s /etc/nginx/sites-available/cloud-communications /etc/nginx/sites-enabled/
  # server_name satırını kendi domain'inize göre düzenleyin
  sudo nginx -t && sudo systemctl reload nginx
  ```

- **Windows:**  
  [NGINX Windows](https://nginx.org/en/docs/windows.html) indirip kurun; `conf/nginx.conf` içinde `http` bloğuna şunu ekleyin:
  ```nginx
  include "C:/path/to/your/project/nginx/cloud-communications.conf";
  ```
  Sonra `nginx -s reload`.

### 3. HTTPS (isteğe bağlı)

SSL kullanmak için `nginx/cloud-communications.conf` dosyasının sonundaki yorum satırlarındaki HTTPS `server` bloğunu açın ve sertifika yollarını (örn. Let's Encrypt) kendi sunucunuza göre düzenleyin.

### DigitalOcean ile cloudtelc.com üzerinden yayınlama

Domain [DigitalOcean Networking → Domains](https://cloud.digitalocean.com/networking/domains/cloudtelc.com) üzerinde yönetiliyorsa, adım adım rehber için:

- **[docs/DEPLOY-DIGITALOCEAN.md](docs/DEPLOY-DIGITALOCEAN.md)** — Domain DNS (A/CNAME), Droplet kurulumu (Node.js, nginx, PM2), Let's Encrypt SSL ve güncelleme komutları.

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
