# 开发安卓APP踩坑记

## 一、字体图标在app上不显示
直接在iconfont上生成的代码，url链接里是以 // 开头的，不是完整的网址路径。
解决方案：在字体图标引用路径前面要加上https:，否则在app上不显示

```css
@font-face {
  font-family: "iconfont";
  src: url('https://at.alicdn.com/t/font_2369472_6tnopvzz2av.woff2?t=1640081434915') format('woff2'),
       url('https://at.alicdn.com/t/font_2369472_6tnopvzz2av.woff?t=1640081434915') format('woff'),
       url('https://at.alicdn.com/t/font_2369472_6tnopvzz2av.ttf?t=1640081434915') format('truetype');
}
```

## 二、安卓模拟器打不开
问题描述：用 android studio 的模拟器添加各种手机打开后报错：The emulator process for AVD Pixel_2_API_30 has terminated
解决方案：是磁盘内存不足造成的，清理不要的软件和文件，重新打开就好了，模拟器运行也超级吃内存，用一会可以在模拟器管理那看 Size on Disk 看占用的内存（那破玩意用一会就9G、10G的），太大了可以直接删了自己再重新加下

## 三、app上获取不到路径参数
问题描述：用第三方插件this.$Route.query在app上取不到参数
解决方案：自己在 onLoad 生命周期里去取，如果是要在onShow里取参数，可以用vuex或者localStorage

## 四、app上登录页提示：打包时未添加OAuth模块
问题描述：调用wx.login（uni.login）去获取code，在app上会触发弹窗：打包时未添加OAuth模块
解决方案：不需要平台的登录的情况，获取code时加上相应判断

## 五、showNavigationBarLoading导航栏的loading动画跑到页面中间去了
问题描述：showNavigationBarLoading导航栏的loading动画在uni文档上写的不支持app（不过下方又备注了：App平台调用此API时会在屏幕中间悬浮显示loading），
实际在app上会有个loading动画跑到页面中间去了，如果页面里有自定义的请求loading动画，会造成和页面自定义的loading动画重合（项目里http.js里封装的请求里有用到这个）
解决方案：自己加个条件编译判断，去掉app上的showNavigationBarLoading动画

## 六、uView 1.x版本压窗屏无效
在app中想要做一些能盖住状态栏和tabbar的强提示弹窗，普通的Popup弹窗层无法实现，uView 1.x版本提供的压窗屏组件，官方文档上有说明，使用的时候无效

<img src="./1.png">