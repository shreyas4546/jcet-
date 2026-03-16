# JCET Official Website - Developer Handoff

## Design Tokens & Tailwind Configuration

The project uses Tailwind CSS v4. The configuration is embedded in `src/index.css` using CSS variables.

```css
@theme {
  --color-navy: #002752;
  --color-navy-light: #003a7a;
  --color-navy-dark: #001226;
  --color-neon: #00E5FF;
  --color-neon-hover: #33ebff;
  --color-warm: #FFC857;
  --color-glass: rgba(255, 255, 255, 0.06);
  --color-glass-hover: rgba(255, 255, 255, 0.1);
  --color-glass-border: rgba(255, 255, 255, 0.1);
  
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Poppins", ui-sans-serif, system-ui, sans-serif;
}
```

### Recommended Utility Classes

- **Hero Background:** `bg-navy-dark` with a radial gradient glow `bg-neon/10 blur-[120px]`.
- **Card Glass (Glassmorphism):** `bg-glass backdrop-blur-md border border-glass-border rounded-2xl shadow-xl`
- **Primary CTA:** `bg-neon text-navy-dark font-semibold rounded-full hover:bg-neon-hover transition-colors shadow-[0_0_15px_rgba(0,229,255,0.4)]`

## Tech Stack Recommendations

- **Motion Library:** Framer Motion (`motion/react`) for scroll reveals and micro-interactions.
- **Image Optimization:** Use WebP format for all raster images. Serve via a CDN with automatic format negotiation.
- **Hosting:** Vercel (recommended for Next.js/Vite React apps) or AWS Amplify.
- **CMS:** Headless CMS like Sanity or Strapi for managing News, Events, and Faculty profiles.

## Developer Checklist

### Semantic HTML & Accessibility (A11y)

- [x] Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` for semantic structure.
- [x] Ensure all interactive elements (`<a>`, `<button>`) have distinct `:focus-visible` states (e.g., `focus:ring-2 focus:ring-neon`).
- [x] Use `aria-label` on icon-only buttons (e.g., Search, Mobile Menu Toggle, Social Links).
- [x] Use `role="dialog"` and `aria-modal="true"` for the Faculty Profile and Gallery Lightbox modals.
- [x] Ensure images have descriptive `alt` text. Use `alt=""` for purely decorative images.
- [x] Maintain a logical tab order (DOM order should match visual order).

### 6 Test Cases for Accessibility & Responsiveness

1. **Keyboard Navigation:** Can a user navigate from the top of the page to the footer using only the `Tab` key? Are focus states clearly visible on all interactive elements?
2. **Modal Focus Trap:** When the Faculty Profile or Gallery Lightbox is open, does the focus remain trapped inside the modal? Does pressing `Escape` close the modal?
3. **Color Contrast:** Do all text elements meet the WCAG AA minimum contrast ratio of 4.5:1 against their backgrounds? (Verify the neon text on navy backgrounds).
4. **Mobile Menu:** On screens `< 1024px`, does the hamburger menu open correctly? Are the links easily tappable (minimum 44x44px touch target)?
5. **Horizontal Scrolling:** On mobile devices (320px width), is there any unintended horizontal scrolling outside of the designated carousel areas (Programs, Student Spotlight)?
6. **Screen Reader Verification:** Use VoiceOver or NVDA to read through the `AdmissionsWidget`. Are the steps announced logically?

## Assets & Figma

*Note: As an AI, I cannot directly export `.fig` files or generate physical `.png`/`.svg` files in a zip archive. However, the provided React codebase serves as a high-fidelity, production-ready implementation of the requested design system.*

- **Icons:** Implemented using `lucide-react` (SVG-based, highly customizable).
- **Images:** Placeholders are configured to fetch from `picsum.photos` with appropriate dimensions and blur effects. Replace these URLs with your optimized WebP assets.
- **Credit Placeholder:** Implemented in the `Footer` component as requested: `Built by {{AUTHOR_NAME}} — Student Web Lead (JCET)`.
