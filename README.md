# RapidMVP Validator

An AI-powered tool by **[Power Shifter Digital](https://powershifter.com)** that pressure-tests a product idea *before* a line of code is written. A founder or team answers a short, build-focused questionnaire and gets an instant, honest read on execution risk, scope realism, and technical feasibility — scored against 20 years of shipping experience.

🔗 **Live:** [rapidmvp.powershifter.com](https://rapidmvp.powershifter.com) · validator at [`/validate`](https://rapidmvp.powershifter.com/validate)

---

## What it does

The validator forks into **two distinct flows** behind an upfront "What are you building?" picker, because the risks that sink a product are different from the ones that sink an internal tool:

| | **Go-to-market product** | **Internal / enterprise tool** |
| --- | --- | --- |
| Audience | Customers choose to use it | A defined group is expected to use it |
| Middle step | **Market & Positioning** — competitors, differentiation (why they switch), behavior change | **Systems & Adoption** — what it replaces, integrations, adoption/change-mgmt, security & compliance |
| Analysis lens | Ruthless VC / market-pull & scope-creep | Enterprise Delivery Lead — integration surface, adoption, compliance, ROI |

Both flows share the Intro, Solution, and Execution steps. The results page then renders a score, a per-flow **readiness breakdown**, a "blindspot" risk, a traditional-vs-rapid timeline, and an email-gated deep dive.

### Flow

```
/validate  →  pick type  →  4-step questionnaire  →  POST /api/analyze (Gemini)  →  /report
                                                                                      └→ POST /api/send-report (Resend) emails the full report
```

---

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router, standalone output) + **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** + a hand-authored design-system layer in [`app/globals.css`](app/globals.css)
- **[Framer Motion](https://www.framer.com/motion/)** — wizard transitions, progress, report reveals
- **[React Hook Form](https://react-hook-form.com)** — wizard form state & validation
- **[SWR](https://swr.vercel.app)** — analysis fetch/cache on the report page
- **[Google Gemini](https://ai.google.dev/)** (`gemini-2.0-flash`) via `@google/generative-ai` — the analysis engine
- **[Resend](https://resend.com)** — emails the full report
- `lucide-react`, `canvas-confetti`

---

## Power Shifter Design System

The app runs on the **current Power Shifter brand** — the same editorial paper/ink system as [PS-Dot-Com](https://powershifter.com), not the old neon-on-black look. All tokens live in [`app/globals.css`](app/globals.css).

**Type** (Adobe Fonts / Typekit kit `xkk7api`, loaded in [`app/layout.tsx`](app/layout.tsx)):

| Role | Family | Token |
| --- | --- | --- |
| Display / headings | **Articulat CF** (heavy) | `--display` |
| Editorial accents | **Fraunces** (variable, italic) | `--serif` |
| Labels / eyebrows | **Config Mono** | `--mono` |

**Palette:**

| | Hex | Token |
| --- | --- | --- |
| Paper (canvas) | `#F6F3EC` | `--paper` |
| Ink (cards / text) | `#121315` | `--ink` |
| Magenta (accent) | `#FD2E90` | `--magenta` |

**Class systems** (BEM-ish, defined in `globals.css`):

- `nav` / `.cta` — brand header
- `.wiz-*` — the validator wizard (dark ink cards on the paper canvas, `.wiz-choice` type picker)
- `.rep-*` — the report (score hero, readiness bars, gated deep-dive)
- `.rm-*` — marketing landing sections
- Motion easings standardized on `cubic-bezier(0.22, 1, 0.36, 1)`

> Designs originate in Claude design and are committed to the `claude-design/rapidmvp-pages` branch as static HTML references.

---

## Project structure

```
app/
  layout.tsx            Root layout — Typekit, Header/Footer, GA, LinkedIn tag
  page.tsx              Marketing landing (/)
  globals.css           Design system: tokens, nav, .wiz-*, .rep-*, .rm-*
  validate/page.tsx     Wizard controller — builds the step list per project type
  report/page.tsx       Gated results page (SWR → /api/analyze)
  api/
    analyze/route.ts    Gemini analysis; system prompt forks by projectType
    send-report/route.ts  Resend email of the full report
    unsubscribe/route.ts
components/
  wizard/               StepIntro, StepType, StepProblem(+Internal), StepSolution,
                        StepPositioning (GTM), StepSystems (internal), StepExecution
  layout/               Header, Footer
  ui/                   Button, Card, Modal, AnimatedNumber, PageTransition
  HowItWorks, Testimonials, FounderNote, FAQ, LinkedInTag
lib/
  types.ts              FormData (incl. ProjectType discriminator) + AnalysisResult
```

The wizard step list is built **dynamically** from the selected `projectType` ([`app/validate/page.tsx`](app/validate/page.tsx)); the analysis prompt and the report's readiness labels both fork on the same flag.

---

## Local development

> **Heads up:** install with `--legacy-peer-deps`. There's a pre-existing peer conflict (`@next/third-parties@14` vs `next@16`). The committed lockfile is consistent, so the Docker build's `npm ci` is unaffected — this flag is only needed for local `npm install`.

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:3000
```

Page rendering works without any env vars. The **analysis** (`/api/analyze`) and **email** (`/api/send-report`) require keys — create `.env.local`:

```bash
GEMINI_API_KEY=...                 # required for analysis
RESEND_API_KEY=...                 # required to email reports
RESEND_FROM_EMAIL="Rapid MVP Validator <mvp.validator@mailupdates.powershifter.com>"
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Optional analytics / lifecycle:
NEXT_PUBLIC_GA_ID=...
CAMPAIGN_MONITOR_API_KEY=...
CAMPAIGN_MONITOR_LIST_ID=...
```

```bash
npm run build        # production build
npm run lint         # eslint
```

---

## Deployment

**Deployed on [Google Cloud Run](https://cloud.google.com/run)** (project `gen-lang-client-0804834480`), with **continuous deploy from `main`** via Cloud Build using the repo [`Dockerfile`](Dockerfile). Every merge to `main` rebuilds and redeploys to `rapidmvp.powershifter.com`. Full setup steps are in [`DEPLOY.md`](DEPLOY.md).

- ⚠️ This is **not** a Vercel project — there are **no per-PR preview URLs**. The only test environment is production, after merging to `main` (build takes a few minutes).
- Environment variables (`GEMINI_API_KEY`, `RESEND_*`, etc.) are configured on the Cloud Run service.
- Freshness check: the live HTML contains `use.typekit.net/xkk7api` once the current brand build is live.

---

## Related

- **[PS-Dot-Com](https://powershifter.com)** — the main Power Shifter site. Its `/digital` page routes visitors to the on-site `/rapidmvp` landing, which links on to this validator. Static design copies of the landing + validator also live there (the static `/validate` is a non-functional mock — this app is the real one).
