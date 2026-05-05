import { defineConfig } from 'astro/config';

// Static output for Vercel / Netlify static hosting
export default defineConfig({
  output: 'static',
  site: 'https://twosevenbuilders.ca',
  build: {
    assets: 'assets'
  }
});
