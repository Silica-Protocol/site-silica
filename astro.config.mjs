import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://silica.network',
  output: 'static',
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: ['javascript', 'typescript', 'rust', 'bash', 'json']
    }
  },
  vite: {
    optimizeDeps: {
      include: ['mermaid', 'prismjs']
    }
  }
});