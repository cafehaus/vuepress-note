const sidebar = [
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

module.exports =  sidebar