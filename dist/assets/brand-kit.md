# Mentor Arena — Brand Kit

Reference for everyone designing or building anything for Mentor Arena: web, PDF, social media, invoicing, course modules, student downloads. One source of truth.

---

## 1. Brand at a glance

**Mentor Arena** is a 1-to-1 digital skills mentorship in Pakistan, led by Fazal Shahid Latif. We teach Web Development, SEO, UI/UX Design, and Digital Marketing through live, project-based coaching in small batches (PKR 6,000/month). The brand voice is calm, honest, no hype. Think "a serious mentor who respects your time" rather than "a flashy bootcamp."

**Audience:** Pakistani students (Karachi, Lahore, Islamabad), 16–30 years old, self-driven, who want real skills and a portfolio piece — not a certificate.

**Brand personality:** Clear · Direct · Patient · Practical · Grown-up (no student gimmicks)

---

## 2. Logo family

All logo files live in `public/assets/`.

| File | What it is | When to use |
|------|-----------|-------------|
| `logo-primary.svg` | Horizontal: badge mark on the left, "Mentor Arena" wordmark + tagline on the right | Website header (on dark or light background), PDF covers, social media banners, invoices, course module covers, student downloads |
| `logo-horizontal.svg` | Compact horizontal: small badge + "Mentor Arena" wordmark + tagline — for narrow headers | Mobile site header, email signatures, favicon-adjacent contexts where a wordmark is still wanted |
| `logo-icon.svg` | Badge mark only (no wordmark) — rounded square with the white forward-check + green growth dot | Social media profile photos/avatars (Facebook page, YouTube channel, LinkedIn), favicon, app icon, course module thumbnail corners |
| `logo-locked.svg` | Badge mark only, bigger corner radius (112), cleaner for dark backgrounds | Dark-mode site header, video watermark, footer mark on dark backgrounds |
| `favicon.svg` | Favicon-sized version of the mark | Browser tab icon — referenced in `index.html` via `<link rel="icon">` |
| `favicon-32.png` | 32×32 PNG favicon | Fallback for browsers that don't render SVG favicons |
| `favicon-16.png` | 16×16 PNG favicon | Fallback for older browsers |
| `apple-touch-icon.png` | 180×180 PNG — iOS home screen icon | iOS users who bookmark the site to their home screen |

**Logo usage rule:** Always use one of the provided files. Never re-typeset the wordmark, never recolor it, never stretch or skew it. If you need a size not provided, open the SVG in a vector editor and scale proportionally.

### Clearspace and minimum size

- Minimum width for the horizontal logo: **200px** on screen (wordmark stays readable). Below that, switch to `logo-icon.svg`.
- Minimum width for `logo-icon.svg`: **64px**.
- Clearspace around the logo: leave space equal to the height of the badge mark on all sides. Never let other content crowd the logo.

### Logo on dark backgrounds

- On dark backgrounds, use `logo-primary.svg` or `logo-horizontal.svg` as-is (the wordmark is already dark blue `#1A4A7C` — it reads on light backgrounds; for dark backgrounds, use the icon-only marks `logo-icon.svg` or `logo-locked.svg` instead).
- Specifically: site header on dark (`bg-blue-950` etc.) → use `logo-icon.svg` or `logo-locked.svg` only, no wordmark. Light header → use `logo-primary.svg` or `logo-horizontal.svg`.

---

## 3. Colors

### Primary palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Brand blue (dark) | `#1A4A7C` | Primary brand color. Logo background, headings, primary buttons on light surfaces, CTA accents. | Main brand color. Logo mark fill, primary headings, key accents. |
| Brand blue (deep) | `#153D68` | Gradient endpoint, deep accent, footer dark sections. | Gradient stops, dark section backgrounds, deep text on white. |
| Brand green | `#4CAF50` | Growth/success accent. The "growth dot" in the logo, success states, positive signals, CTA highlights. | Logo accent dot, success/check states, positive highlights, CTA button accents on dark sections. |
| White | `#FFFFFF` | Logo mark, card backgrounds, body text on dark sections. | Mark stroke, card fills, text on dark backgrounds. |
| Off-white background | `#F8FAFC` / `#F1F5F9` | Page background, card backgrounds. | Page bg, panel bg. |
| Near-black text | `#0F172A` / `#1E293B` | Headings, body text. | H1–H3, body copy. |

### Neutrals (for supporting UI)

| Role | Hex | Usage |
|------|-----|-------|
| Text primary | `#1E293B` | Body copy, UI labels |
| Text secondary | `#475569` | Muted text, captions, meta info |
| Text tertiary | `#94A3B8` | Placeholder, disabled, decorative |
| Border default | `#E2E8F0` | Card borders, dividers |
| Border subtle | `#F1F5F9` | Very light separators |
| Background panel | `#F8FAFC` | Panel backgrounds, section bg tint |
| Background slate | `#0F172A` | Dark section backgrounds (deeper than brand blue for variety) |

### Color roles — what each color is "for" (not just what it looks like)

- **Brand blue (#1A4A7C):** "Mentor Arena." Everything that signals the brand: logo, primary headings H1–H2, primary CTA button on light backgrounds, selected states, the main brand accent.
- **Brand green (#4CAF50):** "Growth, progress, success." The logo's green dot, checkmarks/ticks, positive signals, "saved" states, success confirmations, green CTA buttons on dark backgrounds.
- **White:** Purity, clarity, the "whiteboard" — the mark's stroke, card surfaces, text on dark.
- **Neutrals:** Structure, not personality. Don't use color to _decorate_ — use it to _organize_.

### Color do-nots

- Never use brand blue and brand green together as two competing primaries in the same view — one should lead, the other accents.
- Never tint the logo wordmark green or blue arbitrarily — the wordmark is always brand blue on light, or omitted on dark.
- Never introduce new colors without adding them to this document.
- Never use pure `#000000` for body text — use `#1E293B` or `#0F172A`.
- Never use pure `#FFFFFF` for large background areas without a subtle warm/cool tint — `#F8FAFC` or `#F1F5F9`.

---

## 4. Typography

**Font family:** Inter (loaded from Google Fonts, weights 400/500/600/700/800). This is the only typeface used across the site and all brand PDFs.

**Hierarchy:**

| Level | Size (desktop) | Weight | Color | Notes |
|-------|---------------|--------|-------|-------|
| H1 page title | 2.5rem (40px) | 800 | `#0F172A` | Tight tracking `-0.03em`, leading `1.15` |
| H2 section heading | 2rem (32px) | 800 | `#0F172A` | Tracking `-0.02em` |
| H3 subheading | 1.25rem (20px) | 700 | `#334155` | |
| Body large | 1.0625rem (17px) | 400 | `#334155` | Leading `1.6`, max 65ch line length |
| Body | 0.9375rem (15px) | 400 | `#475569` | Leading `1.6` |
| UI label / eyebrow | 0.6875rem (11px) | 600 uppercase | `#475569` | Tracking `0.12em`, font-mono for data/price labels |
| Caption / meta | 0.8125rem (13px) | 400 | `#64748B` | |
| Price / PKR figure | 2.5rem+ | 800 | `#FFFFFF` (on dark) / `#1A4A7C` (on light) | Currency labels in smaller muted text |

**On dark backgrounds (brand blue `#1A4A7C` or slate `#0F172A`):** headings and body text should be white or near-white (`#FFFFFF`, `#F1F5F9`). Brand green can be used for accent text/eyebrows on dark. Never use brand blue text on a brand blue background — use white.

**Monospace usage:** Small labels like "PKR", "FREE", price tags, meta dates, and technical labels use monospace (Inter has a tabular feel in small sizes, but for explicit mono use `font-mono` in Tailwind). Keep mono to small accent labels only — never for body copy.

**PDF typography (brand-values.pdf, invoices, course module covers):** Same hierarchy. For PDFs, Inter from Google Fonts is used; if the PDF tool doesn't load external fonts, fall back to system sans (same visual weight, slightly less crisp — acceptable for printable PDFs).

---

## 5. Logo + color usage across touchpoints

### Website (mentorarena.online)

- **Header:** On light header — `logo-primary.svg`. On dark header (e.g. course pages with `bg-blue-950` hero) — `logo-icon.svg` or `logo-locked.svg`, centered or left, sized to ~36–44px tall.
- **Favicon:** `favicon.svg` (primary), `favicon-32.png` / `favicon-16.png` (fallback). Apple touch icon: `apple-touch-icon.png`.
- **Colors on site:** brand blue for headings/CTAs, brand green for success/accent, neutrals for body/borders. Dark sections use `#1A4A7C` or `#0F172A` with white text.
- **Buttons:** Primary CTA = brand blue background with white text (light pages) OR brand green background with white text (dark pages). Secondary = outline style. Never two full-color buttons next to each other unless one is clearly primary.

### Course module covers (student downloads)

- Each course module PDF cover uses `logo-primary.svg` placed in the upper-left or upper-center, with module title, week number, and the brand green accent rule.
- Cover background: white with a subtle brand-blue border frame and a thin green accent bar. Module number badge in brand blue rounded pill with white text.
- Chevron/forward-check motif from the logo can appear as a subtle watermark or accent on module covers — never re-drawn, always the original mark from `logo-icon.svg` at low opacity.

### Invoice / checkout pages

- Invoice header: `logo-primary.svg` on the left, "Mentor Arena" wordmark visible, invoice number + date on the right, brand blue header bar.
- Invoice table: header row in brand blue with white text. PKR amounts in brand blue bold. "PAID" / "PENDING" status pills in brand green (paid) or muted gray (pending).
- Totals box: brand blue border, brand green "Total" label, large PKR figure in brand blue/near-black.
- Payment QR codes (JazzCash/Raast, JS Bank/Zindigi/Raast) placed in a brand-blue bordered box with brand green "Scan to Pay" label.
- Footer: brand blue bar with `logo-icon.svg` + "Mentor Arena · Karachi, Pakistan" + support email `support@mentorarena.online`.

### Social media

- **Profile photo/avatar:** `logo-icon.svg` (the mark only, no wordmark) — it's readable at small sizes and works on Facebook, YouTube, LinkedIn, Instagram.
- **Cover/banner image:** brand blue background with a large faint logo-icon watermark at low opacity, plus a short text line in white: "Mentor Arena — 1-to-1 Digital Skills Mentorship, Pakistan."
- **Post templates:** white or brand-blue background, `logo-primary.svg` small in a corner, content in Inter, brand-green accent bar or check for positive posts.

### PDF documents (course outlines, brochures, brand-values.pdf)

- Primary logo: `logo-primary.svg` (or `logo-horizontal.svg` for narrow headers).
- Color: brand blue headers, white body background, brand green accents/rules.
- Footer: brand blue strip with logo-icon + brand name + page number.
- Never use the wordmark in green — wordmark is blue on light, omitted on dark.

---

## 6. Icon system

Icons used across the site and PDFs come from **Lucide React** (already installed). Use consistent icon sizes per context:

| Context | Icon size | Style |
|---------|-----------|-------|
| Section accent next to H2/H3 | 20px | `text-brand-blue` or `text-brand-green` |
| Card/box list icons (checkmarks, info, clock) | 14–16px | muted text color, brand-green for positive |
| Feature grid icons (large) | 32–40px | brand blue or brand green, paired with heading |
| Footer/social icons | 16–20px | brand blue on light, white on dark |
| Invoice/checkout status icons | 16px | brand green (paid/ok), muted (pending) |

**Do not mix icon styles** — stick to Lucide throughout (already the codebase standard). No emoji icons in formal brand surfaces (invoice, PDF, course module covers); emoji only in casual in-app messages if at all.

---

## 7. Photography and imagery

- Headshot of Fazal Shahid Latif: use the Unsplash image already in `AboutPage.tsx` (`photo-1507003211169-0a1dd7228f2d`) as the canonical portrait. Same image on about page, social profiles, course module "about your mentor" sections, invoice footer optional.
- Guest mentor (Awais Ghani): use the existing Unsplash image from `AboutPage.tsx` as his portrait.
- Decorative images: Unsplash for course-relevant imagery (code, design, SEO dashboards, marketing). Always `object-cover`, responsive, lazy-loaded, with descriptive `alt` text.
- No stock clipart, no generic "students around a laptop" photos — real, specific imagery only. If a photo isn't available, use a clean brand-colored illustration block (brand blue or brand green) with an icon, not a generic photo.

---

## 8. Voice and tone

- **Calm, direct, grown-up.** Write like a mentor speaking to a serious student — not a marketer shouting at a crowd.
- **No hype words:** avoid "guaranteed," "explode your career," "life-changing," "elite," "world-class," "best in Pakistan" unless you can prove it in one sentence.
- **Plain language:** if a sentence needs jargon, rewrite it. The site already does this well — keep it up. SEO course uses plain terms like "show your site to Google" alongside technical terms.
- **Honest about limits:** say "small batches," "1-to-1," "PKR 6,000/month," "150 live hours" — the real facts. No inflated promises.
- **Pakistani context:** it's fine to name Karachi, Lahore, Islamabad; to use "PKR" for prices; to mention remote work for US/UK/EU clients. This is part of the brand story, not a stereotype.

---

## 9. Rules for new surfaces

Any new place the brand shows up — a new PDF, a new social channel, a new invoice template, a student handouts folder — must follow these rules before it ships:

1. Use one of the approved logo files. Nothing hand-drawn.
2. Use only the brand colors listed above. No new colors.
3. Use Inter at the sizes in the typography table.
4. Keep the logo clearspace and minimum sizes.
5. On dark backgrounds, use icon-only marks, not the wordmark.
6. If in doubt, match the website header and the About page — those are the reference implementations.

---

*Last updated: 2026-09-15. Owner: Mentor Arena brand. Location: `public/assets/brand-kit.md` in the repo.*
