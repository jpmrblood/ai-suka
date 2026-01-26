// @ts-check

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import { pluginFrames } from '@expressive-code/plugin-frames';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jpmrblood.github.io',
  base: '/ai-suka',
  integrations: [
    expressiveCode({
      plugins: [
        pluginFrames({
          showCopyButton: true,  // Enable copy button
        }),
        pluginLineNumbers(),
      ],
      themes: ['github-dark'],
      styleOverrides: {
        borderRadius: '8px',
        borderWidth: '1px',
        borderColor: 'var(--expressive-code-border-color)',
      },
    }),
    mdx(),
    sitemap()
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});