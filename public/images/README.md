# Images

## Data Center Land Investment hero

To use your own hero image on the **Data Center Land Partnership & Investment** page:

1. Save your image as: **`data-center-land-development-hero.png`** in this folder (`public/images/`).
2. In `src/app/[locale]/services/data-center-land-investment/page.tsx`, change:
   ```ts
   const HERO_IMAGE = "https://images.unsplash.com/...";
   ```
   to:
   ```ts
   const HERO_IMAGE = "/images/data-center-land-development-hero.png";
   ```

Recommended: landscape, min. 1200px wide. Alt text (with SEO keywords) is set in `messages/*.json` under `DataCenterLandInvestment.heroImageAlt`.
