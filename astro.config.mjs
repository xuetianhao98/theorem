import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import theoremTheme from './src/lib/shiki-theme.js';

export default defineConfig({
  site: 'https://xuethlovelicy.xyz',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'never' },
  markdown: {
    shikiConfig: { theme: theoremTheme, wrap: false },
  },
});
