module.exports = {
  base: '/vuepress-note/', // 部署站点的基础路径
  lang: 'zh-CN',
  title: 'NOTE',
  description: '我的前端笔记',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/logo.png',
    repo: 'cafehaus', // 你的仓库
    repoLabel: 'GitHub', // 导航栏上的文本
    docsRepo: 'cafehaus/vuepress-note',
    docsDir: 'docs/note',
    editLink: false, // 是否启用 编辑此页链接
    lastUpdatedText: '最近更新',
    contributorsText: '贡献者',
    sidebarDepth: 0,
    navbar: [
      // { text: '关于我', link: '/about/' }
    ],
    sidebar: [
      { text: '首页', link: '/' },
      {
        text: 'vue',
        collapsible: true,
        children: [
          { text: '用vuepress2搭建自己的github网站', link: '/note/vue/用vuepress2搭建自己的github网站/index.md' },
        ]
      },
      {
        text: 'uni',
        collapsible: true,
        children: [
          { text: '开发字节抖音小程序踩坑记', link: '/note/uni/开发字节抖音小程序踩坑记/index.md' },
          { text: '安卓模拟器接口抓包教程', link: '/note/uni/安卓模拟器接口抓包教程/index.md' },
        ]
      },
    ]
  },
}