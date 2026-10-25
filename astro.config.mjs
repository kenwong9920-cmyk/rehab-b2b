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
    // 按页型拆分 sitemap，便于在 Search Console 里分类型看收录率
    // （哪一类页面没被收录，一眼就能定位，而不是在 519 个 URL 里翻）
    chunks: {
      products: (item) => (/\/products\//.test(item.url) ? item : undefined),
      blog: (item) => (/\/blog\//.test(item.url) ? item : undefined),
      landing: (item) =>
        /\/(certifications|moq-pricing|manufacturers|markets)\//.test(item.url) ? item : undefined,
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
