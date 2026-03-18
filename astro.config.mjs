import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.mercuriusdream.com',
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'rose-pine',
    },
  },
});
