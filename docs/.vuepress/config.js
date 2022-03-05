module.exports = {
  // base: '/vuepress-note/', // 部署站点的基础路径
  lang: 'zh-CN',
  title: 'NOTE',
  description: '前端笔记',
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    repo: 'cafehaus', // 你的仓库
    repoLabel: 'GitHub', // 导航栏上的文本
    docsRepo: 'cafehaus/vuepress-note',
    docsDir: 'docs/note',
    editLink: false, // 是否启用 编辑此页链接
    navbar: [
      // { text: '关于我', link: '/about/' }
    ],
    sidebar: [
      // { text: '首页', link: '/' },
      {
        text: 'uni',
        collapsible: true,
        children: [
          { text: '安卓模拟器接口抓包教程', link: '/note/uni/android-proxy/index.md' },
        ]
      },
    ]
  },
}