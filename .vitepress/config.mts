import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/yanglyuyou-blog/',
  lang: 'zh-CN',
  title: '前端博客',
  description: 'Code, Design, Repeat',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    outline: {
      level: [2, 3],
      label: '目录',
    },
    logo: '/favicon.ico',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'CSS 相关', link: '/test' },
      { text: 'JS 相关', link: '/docs/js/basic/basicKnowledge.md' },
    ],
    sidebar: {
      '/docs/js/': [
        {
          text: 'JS 相关',
          items: [{ text: '基础知识', link: '/docs/js/basic/basicKnowledge.md' }],
        },
      ],
    },
    search: {
      provider: 'local',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/yanglvyou/yanglyuyou-blog' }],
  },
  lastUpdated: true,
})
