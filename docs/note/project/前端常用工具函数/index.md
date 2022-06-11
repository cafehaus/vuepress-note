# 前端常用工具函数

收集一些项目中常用的前端工具函数

**将内容中的网址替换成可直接点击的 a 标签**

```js
function fmtLink(content) {
  if (!content) return ''

  // 过滤掉js和style标签（style里的样式会影响到全局）
  const regJs = /<script[^>]*?>[\s\S]*?<\/script>/ig
  const regStyle = /<style[^>]*?>[\s\S]*?<\/style>/ig
  content = content.replace(regJs, '').replace(regStyle, '')

  // let urlPattern = /(https?:\/\/|www\.)[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[\(\)~#&\-=?\+\%/\.\w]+)?/g
  // 上面的正则如果是 dev-www.xxx.com 这样的二级域名无法正确匹配出来，所以直接用 http 或 https 去匹配比较好
  const urlPattern = /https?:\/\/[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[\(\)~#&\-=?\+\%/\.\w]+)?/g
  content = content.replace(urlPattern, function (match) {
    let href = match
    // if (match.indexOf('http') === -1) {
    //   href = 'http://' + match
    // }
    return '<a style="color:#1890ff;text-decoration:underline;cursor:pointer;" target="_blank" href="' + href + '">' + match + '</a>'
  })
  return content
}
```

**浏览器中复制文本内容**

```js
function copyText(text) { // from zhangxinxu
  if (!text) return
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    let textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    textarea.value = text
    textarea.select()
    document.execCommand('copy', true)
    document.body.removeChild(textarea)
  }
}
```

也可以用知名的复制粘贴库 clipboard.js，但是需要自己提前初始化，只用简单的复制用上面那个就好了

