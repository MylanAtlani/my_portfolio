# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
yarn dev          # Start dev server with Turbopack
yarn build        # Production build
yarn start        # Start production server
yarn lint         # ESLint
yarn type-check   # TypeScript validation
yarn format       # Prettier formatting
yarn clean        # Remove .next and out directories
yarn build:analyze  # Bundle analysis (ANALYZE=true)
```

## Architecture Overview

This is a **Next.js 15.4 portfolio** using App Router with internationalization (French/English).

### Routing Structure
- `app/[locale]/` - All pages are locale-prefixed (fr default, en)
- `app/[locale]/projects/[slug]/` - Dynamic project pages
- `middleware.ts` - next-intl middleware handles locale detection and routing
- `i18n/routing.ts` - Defines supported locales (fr, en) and default

### Key Architectural Patterns

**Providers (wrap the app in layout.tsx):**
- `ThemeProvider` - next-themes for dark/light mode (class-based)
- `NextIntlClientProvider` - Translations from `messages/*.json`
- `ToasterProvider` - Toast notifications

**Data Layer:**
- `data/projects.ts` - Project definitions
- `data/technologies.ts` - Tech stack data
- `data/features.ts` - Feature definitions
- `messages/fr.json`, `messages/en.json` - All UI translations

**Component Organization:**
- `components/sections/` - Page sections (hero, projects, expertise, contact-cta, etc.)
- `components/layout/` - Navbar, Footer, ThemeToggle, LanguageToggle
- `components/ui/` - Reusable components (Button, ProjectCard, TechCard, etc.)

**Lib Utilities:**
- `lib/utils.ts` - `cn()` helper (clsx wrapper)
- `lib/validation.ts` - Server-side form validation
- `lib/rate-limit.ts` - API rate limiting
- `lib/email.ts` - Email utilities (Resend)
- `lib/project-adapter.ts` - Project data transformations

### Contact Form API
`app/api/contact/route.ts` uses Resend for email delivery with:
- Honeypot spam protection
- Server-side validation
- Rate limiting (2 req/min per IP, 1 req/5min per email)

### Styling
- Tailwind CSS with CSS variables for theming
- Dark mode via `class` attribute on `<html>`
- Custom fonts: Inter (main), ndot-47 (Nothing OS style)
- Color tokens defined in `app/globals.css` and mapped in `tailwind.config.ts`

### Internationalization
Use `next-intl` patterns:
```tsx
import { useTranslations } from 'next-intl';
const t = useTranslations('section');
```
All translation keys are in `messages/fr.json` and `messages/en.json`.

### Environment Variables
Required for contact form:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`
