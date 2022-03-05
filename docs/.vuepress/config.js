
const { path } = require('@vuepress/utils')
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
    notFound: ['骚蕊，此页被狗给吃了...'],
    backToHome: '返回首页',
    sidebarDepth: 0,
    navbar: [],
    sidebar,
  },
  plugins: [
    ['@vuepress/plugin-register-components', { componentsDir: path.resolve(__dirname, './components') }],
    ['@vuepress/plugin-search', { locales: {'/': { placeholder: '搜索' }} }]
  ]
}