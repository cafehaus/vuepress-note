# ES模块导入引发的vue未定义变量报错

vue组件里，明明变量已经在 data 中定义好了，但控制台还是一直报错：
::: danger
[Vue warn]: Property or method "xxx" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.
::: 

```javascript
// config.js
export const version = process.env.VUE_APP_VERSION
export const source = 3 // 请求来源：1-安卓  2-IOS  3-web
export const isProd = process.env.NODE_ENV === 'production'
export const isOnline = location.hostname === 'www.cafe123.cn' // 线上环境

export let apiUrl = 'https://www.cafe123.cn/api/' // 接口地址
switch (location.hostname.split('.')[0]) {
  case '192': // 局域网
  case 'localhost': // 本地环境
    apiUrl = 'api-dev'
    break
  case 'dev-www': // 开发环境
    apiUrl = 'http://dev-www.cafe123.cn/api/'
    break
  case 'test-www': // 测试环境
    apiUrl = 'https://test-www.cafe123.cn/api/'
    break
}
```

```vue
<template>
  <div>Hello, {{ userName }}!</div>
</template>
<script>
  // 导入 config 配置文件
  import config from '@/config'
  export default {
    name: 'ZHOU',
    data() {
      const baseUrl = config.api
      return {
        baseUrl,
        userName: '周小黑',
        age: 18
      }
    }
  }
</script>
```

首先定义了一个常见的 vue 项目配置文件 config.js，然后在组件中导入 config，按理说代码没问题，但是运行会一直报错 userName、age...未定义，data 里明明已经定义好了！

通过一行一行删代码最后才排查出是 import 导致的问题，vue 的报错提示也是瞎提示，不过也怪自己对 ES模块 掌握不牢固。

## 导致报错的原因

未分清 export default 和 export 两种导出方式导入时的不同，上面代码里 import 进来的 config 其实是 undefined，config.api 按理应该报错 Uncaught TypeError: Cannot read properties of undefined，结果 vue 这里一直提示后面的变量未定义，一开始就被误导了。

## ES模块注意事项

1. ES模块导出有两种方式：export 和 export default，一个文件可以有多个 export，但是只能有一个 export default
2. export default 后面不能用 const/let/var（*本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字）
3. export 导入时有3种方式：
    - 单个导入：import { apiUrl } form '@/config.js'
    - 多个导入，可用 as 关键字改名：import { apiUrl, source as mySource } form '@/config.js'
    - 整体导入：import * as config form '@/config.js'
4. export default 导入方式：import config from '@/config'

## 解决报错正确的导入方式
1. 用 export 的单个导入方式：import { apiUrl } from '@/config'
2. 用 export 的整体导入并命名：import * as config from '@/config'
3. 兼容 export default 的导入方式：在 config.js 里向下面那样再加一个 export default，这样就可以使用：import config from '@/config'

```javascript
// config.js
export const version = process.env.VUE_APP_VERSION
export const source = 3 // 请求来源：1-安卓  2-IOS  3-web
export const isProd = process.env.NODE_ENV === 'production'
export const isOnline = location.hostname === 'www.cafe123.cn' // 线上环境

export let apiUrl = 'https://www.cafe123.cn/api/' // 接口地址
switch (location.hostname.split('.')[0]) {
  case '192': // 局域网
  case 'localhost': // 本地环境
    apiUrl = 'api-dev'
    break
  case 'dev-www': // 开发环境
    apiUrl = 'http://dev-www.cafe123.cn/api/'
    break
  case 'test-www': // 测试环境
    apiUrl = 'https://test-www.cafe123.cn/api/'
    break
}

// 兼容这种导入方式：import config from '@/config'
export default {
  version,
  source,
  isProd,
  isOnline,
  apiUrl
}
```