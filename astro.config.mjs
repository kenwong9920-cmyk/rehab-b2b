// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jdrehab.com',

  // i18n 多语言路由配置
  i18n: {
    locales: ['en', 'fr', 'de', 'es', 'ko', 'ja', 'ar'],
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

  integrations: [sitemap({
    // i18n 自动处理 hreflang 在 sitemap 中
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en-US',
        fr: 'fr-FR',
        de: 'de-DE',
        es: 'es-ES',
        ko: 'ko-KR',
        ja: 'ja-JP',
        ar: 'ar-SA',
      },
    },
  })],

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
