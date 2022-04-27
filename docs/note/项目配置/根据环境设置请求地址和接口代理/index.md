# 根据环境设置请求地址和接口代理

## 配置项目接口请求地址

一般开发项目除了正式的生产环境，还会有对应的开发环境、测试环境和预发布环境，每个环境所访问的接口地址肯定不一样，如果自己一个个手动修改那就太不程序猿了。

有人可能首先想到根据命令行参数 process.env.NODE_ENV 环境变量来设置，但是一般前端本地开发和部署到开发环境上连接的都是开发环境，用环境变量并不能区分开来，但是直接用域名前缀就能很好区分开来，本地一般都运行在 localhost 或 192 开头的局域网 ip 地址上。

```js
// 项目 config 请求地址配置模板

export const isProd = process.env.NODE_ENV === 'production'
export let env = 'pro'
export let apiUrl = '/api/'

// 根据域名设置接口地址
switch (location.hostname.split('.')[0]) {
  case '192': // 局域网 (本地开发跨域可以配置代理)
  case 'localhost':
    env = 'dev'
    apiUrl = '/api-dev'
    break
  case 'dev':
    env = 'dev'
    apiUrl = 'http://dev.cafe123.cn/api/'
    break
  case 'test': // 测试环境
    env = 'test'
    apiUrl = 'http://test.cafe123.cn/api/'
    break
  case 'pre': // 预发布
    env = 'pre'
    apiUrl = 'http://pre.cafe123.cn/api/'
    break
}
```

## 配置本地接口代理

之所以要区分开是不是本地开发，当后端接口不能跨域访问的时候，我们就可以用到 webpack 提供的代理设置，利用本地起一个代理服务器来解决跨域问题

```js
// vue.config.js 配置代理

module.exports = {
  // ...

  // 设置代理解决跨域问题
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api-dev': {
        target: 'http://dev.cafe123.cn/api/',
        changeOrigin: true,
        pathRewrite: { '^/api-dev': '' },
      },
    },
  },
}
```

注意：proxy 工作原理实质上是利用 node 的 http-proxy-middleware 这个http代理中间件，实现请求转发给其他服务器，特别需要注意的是这个只能用作于开发阶段，临时解决本地请求服务器产生的跨域问题，并不适用于线上环境哟！

除了解决跨域，当后端接口还没有全部开发完，或者来不及部署到开发环境上时，我们也可以通过代理配置来直接用 ip 地址访问后端的电脑本地起的服务器，实现接口联调，很长一段时间我是拒绝后端这样的要求的，强硬地要让他们部署到开发环境上去，因为我特么不会设置代理去访问呀，嘿嘿...

当后端在本地起了一个服务器让你访问时，会给你个ip地址，前端拿到 ip 再去 vue.config.js 里的 proxy 设置对应的拦截接口和代理地址就行了

```js
// vue 文件
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      async getData() {
        let params = { userId: '1345102704' }
        const res = this.$axios.get('sys-user/get-user-info', params)
        // ...
      }
    }
  }
</script>

// vue.config.js
module.exports = {
  // ...
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api-dev/sys-user/get-user-info': {
        // 注意：
        // ① 要放在下面 /api-dev 那个统一的代理拦截前面，否则就走到下面那个代理里去了
        // ② 一般接口请求路径里的 /api 和 /sys-user 服务名这些都是在后端框架或Nginx里统一设置的
        // 当后端自己起的本地服务器一般也就设置了一个端口，所以是不需要这些的（当然，最终以后端发给你的完整路径为准）
        target: 'http://192.168.1.110:8080/',
        changeOrigin: true,
        pathRewrite: { '^/api-dev': '' },
        // 路径重写后的实际访问地址 http://192.168.1.111:8080/get-user-info
      },
      '/api-dev': {
        target: 'http://dev.cafe123.cn/api/',
        changeOrigin: true,
        pathRewrite: { '^/api-dev': '' },
      },
    },
  },
}
```

## 网络补充

同一个局域网里大家通过 ip 是可以实现相互访问的，这也是为什么后端在他本地起了一个服务，前端可以通过 ip 去访问，同样的地址你在家里的时候再去访问肯定就是打不开的，因为不在同一个局域网。

平时开发前端项目，不管是要在手机上查看实际效果，还是要分享给他人查看，我们也是可以直接通过 Network 那个 ip 地址分享给同事的（一般我们在vscode里打包运行起来后,复制到浏览器里打开的那个是 localhost）。

windows 上查看本机ip命令：ipconfig，mac和linux上终端命令是：ifconfig