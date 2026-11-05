# Changelog — Next Level Gaming & Esports Arena Website

All notable changes, features, and fixes for the **Next Level Gaming & Esports Arena** web platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-09-30

### Fixed
- **Navigation & Routing Collision:** Resolved root routing conflicts by purging redundant index entry points and aligning navigation paths across header/footer links.
- **Asset Loading & Font Rendering:** Fixed custom web font loading (`Montserrat` and `Inter` via Google Fonts API) to prevent flash of unstyled text (FOUT) across Chrome, Firefox, and Safari.
- **Layout Overflow:** Fixed horizontal scroll bugs on mobile viewports (< 768px) caused by oversized gaming card containers.

### Changed
- **Pricing Calculator Logic:** Updated the client-side JS package calculator to dynamically calculate sub-totals, apply 15% VAT (South African standard), and display volume discount tiers transparently.
- **Hero Banner Performance:** Compressed high-resolution background assets and implemented lazy loading for media galleries to improve initial page load times.

---

## [1.0.0] - 2026-09-25

### Added
- **Core Pages Structure:**
  - `index.html` — High-impact hero section with arena stats counter, feature highlights, and quick CTA buttons.
  - `about.html` — Story of Next Level Gaming, arena specs (high-refresh monitors, RTX hardware, fiber connectivity), and mission statement.
  - `packages.html` — Interactive gaming tiers, pass selections (Hourly, Day Pass, VIP, Tournament Entry), and volume discount breakdowns.
  - `fees.html` — Comprehensive pricing matrix including membership fees, console/PC hourly rates, and VR room add-ons with tax breakdowns.
  - `contact.html` — Integrated inquiry form with input validation, arena operating hours, map coordinates, and social media links.
- **Design System & Aesthetics:**
  - Implemented centralized dark cyber-gaming theme (`#0A0E17` background, `#00FF66` neon green accents, and `#121824` card surfaces).
  - Built fully responsive Flexbox & CSS Grid layouts for Desktop, Tablet, and Mobile breakpoints.
  - Integrated custom interactive hover effects and neon glow states for navigation buttons and CTA elements.
- **Documentation:**
  - Added initial `README.md` with setup guides, browser compatibility details, and IIE Harvard Anglia reference citations.


  ## For Team 
  **Changes**
  any updates to code please log here so before we comit on github we know who did what last then we can continue 
  

## [1.3.0] - 2026-11-05

### Added
- Added detail pages for each gaming package and individual experience.
- Added a calculate button, URL preselection from detail pages, and contact social link slots.

### Fixed
- Connected each summary listing to its matching detail page and linked between detail pages.
- Added phone number format validation to the quote form.
