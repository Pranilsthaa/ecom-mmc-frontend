# MemoryFrame

Next.js App Router foundation for the company branding and ecommerce website. The supplied homepage is the landing page at `/`; its copy, section layouts, animations, and rose/orange palette are retained.

## Run locally

Use Node.js 20.9+ and Bun (the repository uses Bun 1.2.15).

```sh
bun install
bun dev
```

Open http://localhost:3000.

```sh
bun run lint
bun run typecheck
bun run build
bun start
```

`bun start` serves the production build. Next.js downloads and self-hosts the existing Geist fonts during builds, so the first build needs access to Google Fonts.

## Structure

```text
app/
  layout.tsx                 Shared navigation, footer, metadata, and providers
  page.tsx                   Landing page composition (Server Component)
  globals.css                Tailwind, theme tokens, and global accessibility styles
  favicon.ico
components/
  home/                      Hero, features, process, gallery, reviews, and CTA
  layout/                    Navbar, footer, and local social icons
  providers/                 Reduced-motion configuration
  theme/                     Theme toggle and preference synchronization
public/
  placeholder.svg            Local fallback for the supplied placeholder images
```

Keep route entry points in `app/`, reusable UI in `components/`, and static assets in `public/`. Add actual shop routes under `app/` when product and checkout requirements are defined; there are no placeholder routes to maintain.

## Themes and navigation

The theme follows the visitor's system preference until they use the navbar toggle. The choice persists in local storage and syncs across tabs. A small initialization script applies the preference before paint. Color tokens live in `app/globals.css`; component-specific adjustments use Tailwind's `dark:` variant.

The navbar links to existing landing sections and includes a mobile menu with Escape-to-close, a skip link, and visible keyboard focus. Main calls to action navigate to the gallery, process, or contact section.

## Current scope

This is the initial landing-page setup. Original demo copy, company/contact information, reviews, claims, and placeholder imagery are retained for later replacement. The original gallery detail/favorite controls, newsletter subscription, social links, and policy/support links are presentation placeholders. Checkout, photo upload, pricing, authentication, and newsletter delivery are not implemented. No site has been published.
