// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jdrehab.com',

  // i18n 多语言路由配置
  i18n: {
    locales: ['en', 'fr', 'de', 'es', 'ko', 'ja'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  // Vite 插件
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],

  // 图片优化 (Astro 5 内置)
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Markdown 配置
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
