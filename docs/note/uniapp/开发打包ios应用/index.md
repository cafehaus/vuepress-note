# 开发打包ios应用

## 获取iphone手机的UDID

**UDID**：iOS 设备的一个唯一识别码，每台 iOS 设备都有一个独一无二的编码，这个编码，我们称之为识别码，也叫做UDID（ Unique Device Identifier）。

之所以要获取这个东西，因为在真机上调试和开发时，需要在苹果开发者中心添加了的设备才可以安装和预览应用。

> Your device has been registered and can now be included in provisioning profiles for app development and installation. Registered devices are also eligible to install pre-release versions of iOS.(您的设备已注册，现在可以包含在用于应用程序开发和安装的配置文件中。 已注册的设备也有资格安装 iOS 的预发布版本。)

**获取方式**：通过 [蒲公英网站获取](https://www.pgyer.com/udid)


## 申请开发者账号

可以申请个人的和企业的，需要支付 $99，企业的还需要邓白氏码，注意第一次申请的时候，千万不要申请了一半，然后换另外一台设备，辣鸡苹果会认为你是在倒卖开发者账号，然后你就会神奇地发现，你的账号会一直出现提示：你的账号可能存在问题...

<img src="./1.jpg" width="400">

之后不管你怎么发邮件、打客服电话、求爹爹告奶奶申诉都没用，你的账号、设备和身份信息都已经被 Apple 拉黑了，如果你也不幸中招，我劝你不要留念，赶紧找个新设备新身份申请个新账号重新注册，其他的一切都是无用功。


## plus is not defined

>uni-app App 端内置 HTML5+ (opens new window)引擎，让 js 可以直接调用丰富的原生能力，小程序及 H5 等平台是没有 HTML5+ 扩展规范的，因此在 uni-app 调用 HTML5+ 的扩展规范时，需要注意使用条件编译。否则运行到h5、小程序等平台会出现 plus is not defined错误

```js
let cid = ''
// #ifdef APP-PLUS
cid = plus.push.getClientInfo().clientid
// #endif
```

[uni-app使用plus注意事项](https://uniapp.dcloud.io/tutorial/use-html5plus.html)