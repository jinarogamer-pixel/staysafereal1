# STEEZZ RENTALS — Premium Exotic Car Rental Website Plan

## Context

The owner runs **STEEZZ RENTALS**, an exotic/luxury car rental business, and wants a cinematic marketing site like the "Exotics Now" reference (screenshot provided): a hero video of the cars driving, scroll-driven reveal into the collection, then company info and booking. Design bar: Phenomenon Studios / Taylor Swift-tier client sites — it must look hand-crafted and expensive, **not** "AI-generated slop." Budget-conscious, building little by little; a booking backend/CRM comes later, so today's build must leave clean seams for it.

**Key decision:** the current repo (`staysafereal1`) contains an unrelated "Stay Safe" home-safety site. The user confirmed STEEZZ RENTALS is a **different project** — build in a **new repo: `jinarogamer-pixel/steezz-rentals`** (greenfield). Do not touch the Stay Safe code.

**Confirmed by owner:**
- Business: exotic/luxury car rentals — "STEEZZ RENTALS"
- Hero footage: needs to be sourced (best path: their own IG/camera-roll clips; stock/placeholder until then)
- Accent color: **chrome/ice blue** (matches their chrome-blue logo) on a dark theme
- Content direction: real IRL footage and user-engaged content featured prominently — photos/media consolidated in one place on the site, not generic stock imagery
- Deliverable this session: **the plan itself** (this doc committed as `PLAN.md`); building happens in follow-up sessions

## Tech Stack

- **Next.js (App Router) + TypeScript** — server-rendered SEO for a local business, `next/image`/`next/font` for free performance, and `app/api/*` route handlers so the future inquiry endpoint and eventual CRM live in the same repo/deploy (no migration later). Chosen over Vite SPA (would need a separate backend for even a contact form) and Astro (weaker path to authenticated backend).
- **Tailwind CSS + shadcn/ui** — shadcn only as accessible primitives (Button/Input/Select/Textarea); the premium look comes from custom design tokens: deep charcoal (not pure black) background, chrome/ice-blue accent used sparingly, a display+grotesque type pairing, generous whitespace.
- **GSAP + ScrollTrigger** (now fully free post-Webflow acquisition) for the pinned, scroll-scrubbed hero→collection sequence; light CSS/Framer Motion for micro-interactions elsewhere.
- **Deploy: Vercel** (previews per push for owner review). Live commercial use requires Vercel Pro (~$20/mo) — the one assumed recurring cost.

## Video Strategy ($0/month target)

- Trim owner footage to a 6–12s muted loop, 1080p, two-pass H.264 mp4 (~3–8MB) + WebM source + AVIF/WebP poster frame.
- Host on **Cloudflare R2** (free 10GB storage, free egress forever) behind a `media.steezzrentals.com` subdomain on Cloudflare's free CDN. Bundling one small clip in `public/` is an acceptable Phase-1 shortcut only.
- `preload="metadata"`, IntersectionObserver-gated mount; on mobile viewports or `prefers-reduced-motion`, serve the static poster instead of video (protects LCP and visitors' data).

## Site Map

- **`/` Home** — pinned video hero + headline + CTAs → scroll-scrubbed reveal into Featured Fleet carousel → IRL/social content section (real IG reels + follower/view stats, Telegram CTA) → policy teaser banner → booking CTA band
- **`/fleet`** — grid of cars (photo, name, specs, "Inquire" → `/book?car=<slug>`)
- **`/book`** — inquiry form (name, phone, email, car pre-filled, dates, message) → emails owner; direct IG DM / Telegram / tel links; policies restated
- **`/policies`** — full rental requirements (2-day minimum, 18+ w/ insurance & deposit — exact figures TODO from owner), service area
- Branded 404; site-wide footer (logo, socials, policy links)

## Architecture

```
app/
  layout.tsx, page.tsx, fleet/page.tsx, book/page.tsx, policies/page.tsx
  api/inquire/route.ts            — POST, zod-validated, sends via Resend
components/
  nav/Nav.tsx (+MobileNavDrawer)  — transparent over hero, solidifies on scroll
  hero/Hero.tsx, hero/HeroMedia.tsx — IO-gated video, poster, mobile swap
  scroll/PinnedCollectionReveal.tsx — GSAP pin:true + scrub:true hero sequence
  scroll/ScrollRevealSection.tsx  — reusable fade/stagger wrapper
  fleet/FleetGrid.tsx, FleetCard.tsx, FleetCarousel.tsx
  social/SocialProofBar.tsx, InstagramReelEmbed.tsx (official oEmbed)
  booking/BookingInquiryForm.tsx  — React Hook Form + zod
  policies/PolicyBanner.tsx, layout/Footer.tsx, ui/*
lib/
  fleet-data.ts                   — single source of truth for cars (future DB seam)
  email.ts                        — Resend wrapper
```

Scroll mechanics: hero pinned inside a ~150vh spacer, GSAP timeline `scrub`-tied to scroll for headline/gradient/parallax; released into normal flow revealing the fleet carousel. All GSAP via `@gsap/react` `useGSAP` for App Router cleanup; reduced-motion fallback to simple fades.

## Content Needed From Owner (before/while building)

- Confirmed fleet list + specs (never fabricate HP/0-60 figures — mark "ask about specs" if unconfirmed)
- Hero clip (landscape preferred; vertical reels need blurred-fill treatment) + high-res car photos from camera roll (not IG re-downloads)
- Logo files (SVG + square mark), exact policy dollar amounts (deposit, insurance minimums, mileage/fees), business contact inbox/phone, legal name for footer
- Draft copy/palette/type will be proposed as placeholders for owner sign-off

## Phased Build Order

- **Phase 0 (next session):** create `steezz-rentals` repo, scaffold `create-next-app` + Tailwind + shadcn init + GSAP/`@gsap/react`/`resend`/`zod`/`react-hook-form`; brand tokens, fonts, Nav/Footer shells; owner links Vercel.
- **Phase 1 (2–3 sessions):** Home with **static-image hero first**, fleet carousel/grid from `lib/fleet-data.ts`, social-proof section, `/policies`, real social links. Push early for preview URLs.
- **Phase 1.5:** swap in R2-hosted video hero, build `PinnedCollectionReveal` + section reveals, micro-interactions, reduced-motion, Lighthouse pass.
- **Phase 2:** inquiry form + `api/inquire` + Resend (free tier, 3k/mo) + honeypot spam guard.
- **Phase 3:** launch hardening — per-page metadata, sitemap/robots, OG images, analytics (Vercel Analytics/Plausible), domain `steezzrentals.com` (Cloudflare Registrar/DNS, free email routing for `bookings@`), Vercel Pro, go live.
- **Phase 4 (deferred, not built now):** availability calendar + DB (Neon/Supabase free tier) replacing `fleet-data.ts`, Stripe deposits, lead tracking. `api/inquire/route.ts` and `fleet-data.ts` are the designed swap-in seams. Cheap interim CRM: pipe inquiries to a Google Sheet/Airtable.

## This Session's Execution Steps

1. Create GitHub repo `jinarogamer-pixel/steezz-rentals` (via GitHub MCP tools).
2. Commit this plan as `PLAN.md` (plus a short `README.md`) to its `main` branch — the requested markdown planning doc.
3. Do **not** scaffold the app yet — owner chose plan-only for this session.
4. Nothing is pushed to `staysafereal1`; its designated branch is left untouched since this work was confirmed to be a different project.

## Verification

- This session: confirm the new repo exists on GitHub with `PLAN.md` visible.
- Build sessions: `npm run dev` + Playwright/Chromium screenshot passes on desktop and mobile viewports for every visual milestone; Lighthouse (perf + a11y) before launch; test reduced-motion and slow-3G video fallback paths.
