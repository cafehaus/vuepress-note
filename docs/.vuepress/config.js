const sidebar = require('./sidebar.js')

module.exports = {
  base: '/vuepress-note/', // 部署站点的基础路径
  lang: 'zh-CN',
  title: 'NOTE',
  description: '我的前端笔记',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/logo.png',
    repo: 'cafehaus',
    repoLabel: 'GitHub',
    docsRepo: 'cafehaus/vuepress-note',
    docsDir: 'docs/note',
    editLink: false,
    lastUpdatedText: '最近更新',
    contributorsText: '贡献者',
    sidebarDepth: 0,
    navbar: [],
    sidebar,
  },
}