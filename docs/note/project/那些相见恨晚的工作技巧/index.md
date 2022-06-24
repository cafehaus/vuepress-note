# 那些相见恨晚的工作技巧

## 通过mixins来混入vue组件的js逻辑

适合页面逻辑比较复杂的，可以这样拆分，将页面结构和js独立出来
```vue
<template>
  <div class="page">
    Hello，world
  </div>
</template>

<script>
  // 通过 mixins 来混入 js 逻辑
  import curPageJs from "./cur-page.js"
  export default {
	mixins:[curPageJs]
  }
</script>
<style>
.page {
  width: 100%;
  height: 100%;
}
</style>
```

## 用index.js导入导出当前组件

一般vue组件，如果我们全部用index.vue去命名开发，会导致编辑器里一堆的index，不好区分，而不用 index.vue 的话引入组件的时候又需要多写一层路径

```js
// 其他页面引入时只需像下面这样
// import Comp from '@components/comp'

// index.js
import Comp from './comp.vue'
export default Comp
```
* 注意在uniapp的vue组件中，用上面的简写方式会导致在小程序中加载不到组件，需要写成完整的路径：import Comp from '@components/comp/comp'

## 按键盘上的上下箭头↑↓可以快捷切换历史终端命令

以前都傻傻的自己一遍一遍地敲，直接通过上下箭头就可以快捷切换选择

## 敲键盘上的Tab键可以自动补全路径

一般node开发中比较有用，如果在windows中无效，需要自己修改下注册表

## 在电脑文件夹路径中直接输入cmd，可以在当前目录打开小黑窗

每次 win + R ，然后 cmd 打开的小黑窗都是在c盘目录，要运行其他目录的文件要 cd 一堆路径，十分不方便。直接在 windows 电脑顶部的文件夹路径输入框中输入 cmd 一回车，会自动定位到当前目录。

PowerShell也有同样的技巧，在当前目录下按住Shift键，然后点击鼠标右键，就会在菜单中看到：在此处打开 PowerShell 窗口(S)