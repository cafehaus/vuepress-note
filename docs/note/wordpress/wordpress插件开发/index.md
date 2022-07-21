# wordpress插件开发

想要使用 REST API 需要自己额外安装插件：WordPress REST API，现在 WordPress 5.0以上的版本已经默认支持 REST API了，不需要额外去安装插件。

新站首次用 Postman 去 访问 REST API 接口，如：http://www.cafe123.cn/wp-json/wp/v2/posts，会发现返回的是 404，需要自己在管理后台将：设置-固定链接-常用设置，设置为除“朴素”外的其他选项(建议选数字型)，再去请求就可以拿到数据了。

## 遇到的问题

新加了一些 api 路由遇到的报错：

**1. 未找到匹配URL和请求方式的路由**
```json
{
    "code": "rest_no_route",
    "message": "未找到匹配URL和请求方式的路由。",
    "data": {
        "status": 404
    }
}
```
这种情况就是路径或请求方式有问题，仔细去核对下

**2. 此路由的句柄无效**
```json
{
    "code": "rest_invalid_handler",
    "message": "此路由的句柄无效。",
    "data": {
        "status": 500
    }
}
```
这种情况就是有请求到路由，但是路由的回调函数有问题，我这里是在类 class 里注册的路由，路由自身的方法要用 $this->funcName 这样去调用
