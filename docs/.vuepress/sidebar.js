const sidebar = [
  { text: '首页', link: '/note/guide' },
  {
    text: 'js',
    collapsible: true,
    children: [
      { text: '日期字符串直接比较的坑', link: '/note/js/日期字符串直接比较的坑/index.md' },
    ]
  },
  {
    text: 'vue',
    collapsible: true,
    children: [
      { text: '用vuepress2搭建自己的github网站', link: '/note/vue/用vuepress2搭建自己的github网站/index.md' },
      { text: 'vue中的v-model刨根问底', link: '/note/vue/vue中的v-model刨根问底/index.md' },
    ]
  },
  {
    text: 'uni',
    collapsible: true,
    children: [
      { text: '各端开发打包发布完整指南', link: '/note/uni/各端开发打包发布完整指南/index.md' },
      { text: '开发字节抖音小程序踩坑记', link: '/note/uni/开发字节抖音小程序踩坑记/index.md' },
      { text: '安卓模拟器接口抓包教程', link: '/note/uni/安卓模拟器接口抓包教程/index.md' },
    ]
  },
  {
    text: '小程序',
    collapsible: true,
    children: [
      { text: 'video视频高度设置百分比在微信小程序中直接不显示', link: '/note/小程序/video视频高度设置百分比在微信小程序中直接不显示/index.md' },
    ]
  },
  {
    text: '项目配置',
    collapsible: true,
    children: [
      { text: 'Git使用技巧', link: '/note/项目配置/Git使用技巧/index.md' },
    ]
  },
]

module.exports =  sidebar