## 前端常用css样式代码

### radial-gradient 径向渐变去做外圆角

适合需要外圆角的各种背景图标

```vue
<template>
  <div>
    <span class="tag">推荐</span>
  </div>
</template>

<style lang="stylus" scoped>
.tag
  position absolute
  right 0
  top 0
  background #FFBD09
  border-radius 0 7px 0 16px
  padding 6px 8px
  font-size 12px
  color #FFF
  font-weight normal
  line-height 1
  &::before
    content ''
    position absolute
    width 10px
    height 10px
    left -10px
    top 0
    background #000
    // 左上角
    background radial-gradient(circle at 0 100%, transparent 10px, #FFBD09 10px)
    // 左下角
    // background radial-gradient(circle at 0 0, transparent 10px, #FFBD09 10px)
    // 右上角
    // background radial-gradient(circle at 100% 100%, transparent 10px, #FFBD09 10px)
    // 右下角
    // background radial-gradient(circle at 100% 0, transparent 10px, #FFBD09 10px)
</style>
```
