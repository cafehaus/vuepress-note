# 日常工作每日记录

## 2019年9月3日
超出可以滚动并且隐藏滚动条
```css
.box {
   overflow-x: hidden;
   overflow-y: scroll;
}
.box::-webkit-scrollbar {
   display none
}
```

伪元素的父盒子设置了 z-index后，伪元素的z-index会失效，所以如果用 ::after来给盒子做阴影时，只用给伪元素设置z-index为负数就可以了


## 2019年9月5号
所有用到的组件要在plugins文件夹下的iview.js里注册引入

## 2019年9月18号
ivew修改组件的默认样式必须用深度选择器才有效 >>>

## 2019年9月20日
css :not选择器性能不好？

not选择器排除列表元素最后一个会造成页面抖动，在弹出框里特别明显，它的规则是先全部选出来在排除，在v-for的外面层再加一个判断：v-if="data.length"，就不会出现抖动了

Collapse 折叠面板用v-for异步请求渲染的数据，第一次进入会有bug，不管点哪个都会展开第一行，要点第二次后才会恢复正常，也是在外面层再加一个判断：v-if="data.length"，就不会有这个bug了

iview框架table的行禁选，动态渲染render

v-for和v-if同时使用

Vue报错 Duplicate keys detected: 'xxx'. This may cause an update error. 
情况一、错误信息展示为关键字‘keys‘,此时应该检查for循环中的key，循环的key值不为唯一性 （很普通）
情况二、有两个相同的for循环，而这两个for循环的key值是一样的，此时可以将一个的key值加一个数字或者加一个字符串

## 2019年10月17号
window.open在vue中跳转会自动添加本地服务器的地址，需要完整的https才可以，http也不行
window.open('https://www.baidu.com','_blank')

## 2019年11月6号
不能这样判断 this.arr === []，复杂类型全等比较的是类型和引用地址，可以这样判断 if (!this.arr.length)

map方法不能用来过滤掉数据，过滤用filter

## 2019年11月14日
限制弹窗高度
```js
// 方法一：
max-height 80vh
overflow auto

// 方法二：
mounted() {
    let h = window.innerHeight
    this.screenHeight = h - 500
},
// 给元素动态绑定最大高度
:style="{maxHeight: screenHeight+'px', overflow: 'auto'}"
```

## 2019年12月18日

全数字时间日期格式化（正则替换）
```js
let date = '20191218175924'.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6')
console.log(date) 2019-12-18 17:59:24
```

时间戳转格式要是数值类型的才行，字符串的会NaN  
new Date('num')   ->  NaN

## 2019年12月24日
动态路由传参 query 和 params  
param -> params

params传参的坑

1、要在路由定义的时候带上参数 path: 'user/:id'
2、this.$route.push的时候只能用name，而且要和定义路由时的name对应
3、params 这个单词别拼错了

## 2019年12月25日
用vue-scrollwatch模拟鼠标滚轮滑动一下 滚动一屏

```js
window.addEventListener('mousewheel', this.setScrollTop, { passive: false })
window.addEventListener('DOMMouseScroll', this.setScrollTop, { passive: false }) // 兼容firefox
```

如果把浏览器的缩放比调整了（不是正常的100%），会出现监听错误，造成滚动错乱（害我找了半天bug）


## 2019年12月31日
清除缓存
```bash
npm cache clean --force
yarn cache clean
```

## 2020年3月4日
```css
justify-content: space-around;    /* 两边的间距是中间间距的1/2 */
justify-content: space-evenly;    /* 所有间距相等 */
```

## 2020年3月6日
在渲染多个元素时候可以把一个template元素作为包装元素，并在上面使用v-if进行条件判断，template最终不会被渲染

* 注意：v-show不支持 template 语法（注意，v-show 不支持 template 元素，也不支持 v-else。关于这一点vue官方文档有说明https://cn.vuejs.org/v2/guide/conditional.html#v-show）

## 2020年3月10日
vscode 快捷键

1. 折叠所有区域代码的快捷: ctrl + k ctrl + 0 ; 先按下 ctrl 和 K,再按下 ctrl 和 0 ; ( 注意这个是零,不是欧 )
2. 展开所有折叠区域代码的快捷:ctrl +k ctrl + J ; 先按下 ctrl 和 K,再按下 ctrl 和 J

position: sticky，可以做粘性布局，吸顶交互效果

v-click-outside-x：vue插件，可以监听元素外部得事件（如iview里的Poptip 气泡提示组件，点击元素外部区域，关闭当前组件）

## 2020年3月12日
vee-validate表单验证插件

表单项双向绑定的初始值要保证为一个空字符串或默认值，不可以是 undefined，否则再blur、change事件里绑定验证的时候第一次必定返回“false”，要第二次触发验证才恢复正常
```js
// 不要
formData:  {}

// 要
formData:  {
    name: '',
    age: ''
}
```

## 2020年3月13日
iview Input组件on-change事件默认返回当前值，如果要在事件中传递自己的参数，$event就代表默认的参数：
```js
@on-change="onChange"                   // 不传参数第一个参数就是默认的当前值 onChange(val) { console.log(val) }
@on-change="onChange(item, $event)"     // 第二个参数是默认的当前值
@on-change="onChange($event, item)"     // 第一个参数是默认的当前值
```

父子组件传值 sync 修饰符

## 2020年3月18日
iview开关组件 switch 不要使用switch 或 Switch 作为组件名，如果没有使用 iview-loader 时会报错

vue组件名不能乱起，组件名不能是html标签，svg标签等，还不能是component和slot，注意，其中svg标签和component，slot是大小写都不允许存在（例如,Switch,SWITCH都不行）；html标签是不能存在小写，大些可以(例如,button不行,Button可以)

## 2020年3月19日
下载流文件
```js
let blob = new Blob([res], { type: 'application/vnd.ms-excel;application/octet-stream' })
let href = URL.createObjectURL(blob)
```

## 2020年3月30日
iview的 InputNumber组件同时限制 :min="2000"和:max="6000"，默认值一变化就会去验证（on-change），操作体验超级差，值来回在2000和6000切换
不用min和max限制，在失去焦点时on-blur里校正又没法监听到步骤器的加减

解决方案：用min和max限制，添加一个属性 :active-change="false"

（iview文档里又说明，InputNumber组件属性的最后一个：active-change	是否实时响应数据，设置为 false 时，只会在失焦时更改数据），
就会在失去焦点时才会去验证是否符合最大最小值

## 2020年3月30日
iview的table组件添加固定列 fixed：'right'，如果第一列宽度 width: 60（大于和小于都没事），会造成右边fixed固定列错位

## 2020年11月2日
用伪元素渲染单选图标
```css
.radio
    margin-right 30rpx
    font-size 28rpx
    color #333333
    &.on
    font-weight 500
    &:before
        color #1890FF
        content "\e84b"
    &:before
    display inline-block
    font-family "iconfont" !important
    font-size 16px
    font-style normal
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    content "\e823"
    margin-right 8rpx
    color #979797
```

## 2020年11月26日
vue文档上有说：https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%B1%BB%E5%9E%8B

props default 数组／对象的默认值应当由一个工厂函数返回

如果你的 type 是 Object，你需要这么写  
default: () => ({})  
而不是  
default: () => {}  
不加括号的话应该是一个空函数体，没有返回值了  

## 2021年1月11日
上个月替换加盟商小程序接口 api.51.xxx.com => api-51.yungehuo.com，忘记在管理后台添加服务器域名了

小程序修改任何东西都要提交给测试验证（测试、线上）

## 2021年02月10日
iview的select组件开启远程搜索后，直接放在用modal组件封装的弹窗内，弹出弹窗回显默认值的时候，界面上不显示，要在外面用v-if去控制modal显隐的时候才会有效（周颖发现的，原因后面有空探究下）

## 2021年03月23日

狗日的，又废接口：wx.getUserInfo => wx.getUserProfile
<button class="btn-login" open-type="getUserInfo" :data-mtaid="'login.button.submit'" @getuserinfo="getWxUserInfo">登录</button>

<button class="btn-login" @click="getWxUserInfo">登录</button>

```js
// 获取用户微信信息
getWxUserInfo() {
    let _this = this
    wx.getSetting({
        success (res) {
            if (res.authSetting['scope.userInfo']) {
                // 已经授权
                wx.getUserInfo({
                    success: function(res) {
                        _this.wxUserInfo = res.userInfo
                        _this.$storage('wxUserInfo', res.userInfo)
                        _this.setWxUserInfo()

                        _this.login()
                    }
                })
            } else {
                _this.$tips.toast('为了更好的使用体验，请允许授权！')
            }
        }
    })
},

getWxUserInfo() {
    wx.getUserProfile({
        lang: 'zh_CN',
        desc: '登录后个人信息展示',
        success: res => {
            this.wxUserInfo = res.userInfo
            this.$storage('wxUserInfo', res.userInfo)
            this.setWxUserInfo()

            this.login()
        }
    })
}
```
## 2021年4月16日
后端把Long类型数据传给前端，会出现精度丢失的问题

let n = 1290850452280250366  
console.log(n)  
1290850452280250400  
像列表id之类的，要让后端返字符串，数值类型过大会出现精度丢失，id错误问题

## 2021年9月2日
用v-html渲染富文本，里面的style标签样式会影响到页面里的样式

```js
// 富文本内容，过滤掉js和style标签（style里的样式会影响到全局）
if (key === 'cost_channel_reparation_rule' && value) { // 赔付方案
  let regJs = /<script[^>]*?>[\s\S]*?<\/script>/ig
  let regStyle = /<style[^>]*?>[\s\S]*?<\/style>/ig
  let val = value.replace(regJs, '').replace(regStyle, '')
  tableItem[key] = val
}
```

## 2021年11月9日
iview校验一直不通过：prop的字段要先写到form里的，不能是动态添加的（vue不能监听到动态新增的属性？？？）

## 2021年11月10日
交互小优化：
1、能点击的地方加上 cursor pointer，
2、表单输入选择框加上可清除属性 clearable（ivu的select选中后没法清除，加了filterable支持搜索敲键盘上清除键删完了失去焦点又会默认选到之前的选项，所以对于一些非必填选择框要加上clearable让用户可以删除），
3、input输入框注意自动去掉首尾的空格 v-model.trim，maxlength限制最长输入
4、对于段落文字加上 text-align: justify 排版更整齐
5、小程序适配字体：段落文字可以直接写px，像标题之类的描述文字用rpx，适配出来不同屏幕更符合UI效果图

## 2022年5月21日
注意：console.log('0' == false) // true

和js一样弱类型的php也是一样的结果


## 2022年6月1日

小程序上拉加载更多每次push数据，带参数过来记得先清空数据和查询条件

onLoad、onShow、mounted、created这些生命周期初始化数据，尽量放到一个里处理，否则也会造成重复

弹窗里渲染富文本内容，如果UI弹窗宽度太小图片容易被压缩显得模糊（评需求的时候注意有相关的报价表格类的图片需要比较情绪的，可以考虑单独上传图片或弹窗宽度不能太小）

小程序用 <img />图片标签 裁切属性mode无效，要用<image />
小程序textarea放到弹窗里，默认的placeholder设置无效，要先设置个值然后清空才会生效，hack：弹窗弹出先赋值，然后再用定时器清空
mp-vue和uni-app小程序里路由里的参数，要去onLoad生命周期里取this.$route.query，直接在data里这样赋值会是undefined

【uniapp打包命令】
"build:mp-weixin-test": "cross-env VUE_APP_ENV=test NODE_ENV=production UNI_PLATFORM=mp-weixin vue-cli-service uni-build --minimize --watch",
UNI_INPUT_DIR=指定源代码绝对路径
UNI_OUTPUT_DIR=dist/release/h5

uni-app组件绑定props的时候，不能用data开头的驼峰（如 dataList ），data-是原生小程序在节点上绑定参数的方式

uni-app 新项目运行 stylus 报错，可能是 stylus-loader 版本太高，可以降到 @3.x.x 试下，uview-ui 2.x 版本cli在 vue.config.js 里配置了  transpileDependencies: ['uview-ui'] 还是提示报错，可能是 node 版本太高，降到 @12.x 试下

网络图片转base64报跨域错误前端解决方案：
1、要求图片资源服务器端已经设置了允许跨域访问，否则下面的都是无用功
2、设置 img.setAttribute('crossOrigin', 'anonymous')
3、图片url缓存还是会偶尔报跨域，所以在路径参数后面加个动态参数 img.src = url + `${url.includes('?') ? '&' : '?'}` + new Date().valueOf()
参考：https://stackoverflow.com/questions/46609800/canvas-crossorigin-anonymous-cors-chrile-mac-osx

this.$wj.cookie('inviteCode', query.inviteCode, { expires: 7 })
this.$wj.cookie('inviteCode', '') // 有一个过期参数 expires，直接这样清除无效

让浏览器滚动条不占用页面宽度（不会挤压布局0）：overflow：overlay
行为与auto相同，但滚动条绘制在内容之上而不是占用空间。 仅在基于WebKit（例如，Safari）和基于Blink的（例如，Chrome或Opera）浏览器中受支持。

iview modal弹窗里放select下拉框组件，不加transfer属性有时下拉框层级会出问题，被弹窗挡住了

iview的form表单校验：

1、form表单中带有prop属性的子组件进行校验规则绑定时，是在vue声明周期mounted生命周期里完成的，如果想用v-if来动态控制表单项会出现校验错误失效的问题，动态动态校验
同样也会出现这个问题，iview官网的动态表单校验是通过额外的一个status标识去判断该不该渲染（不是直接去splice数组，如果后面要提交参数还要自己再去filter一下），要解决这个校验出错的问题可以直接用 v-show 去控制动态
表单，然后自己自定义 validator（不过required参数好像不能动态修改，待再验证）
2、注意 v-show 控制显示隐藏校验会生效，因为校验域其实还在页面上

抖音小程序获取用户手机号的api需要企业主体，而且要先申请审核通过了才可以用

## 2022年3月9日
user-select 属性规定是否能选取元素的文本  
auto	默认。如果浏览器允许，则可以选择文本。  
none	防止文本选取。  
text	文本可被用户选取。  
all	单击选取文本，而不是双击。  
有时我们加了user-select all让单击选中文本，但是想按钮之类的并不需要选中，需要设置user-select none

flex 布局会将直接子元素是行内元素的自动转换成块元素（可以在Chrome浏览器调试面板“计算样式”里看到变化），transform动画对行内 inline 元素无效，要转成 inline-block 或 block（前一点flex布局会自动转成block，所以有时不容易发现这个问题）
文件名中尽量不要包含中文和一些特殊字符，有个文件名中包含好几个\，从github上克隆仓库时就一直报错，应该是/被判断成路径了，找不到此文件所以一直报错：invalid path，实在要用应该要加个转义符的\，像这样 \\

文字按钮加 hover 效果字体变粗，整体宽度会边长，造成布局抖动，找到下面两个
① 可变字体，部分浏览器不支持，font-variation-settings，需要字体支持，https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide
② 用字体阴影来模拟加粗，视觉上看着稍微有点不足 text-shadow -0.06ex 0 black, 0.06ex 0 black
③ 用伪元素来将字体加粗，原本的字体颜色改为透明或和背景色一样，伪元素 content 想取到文字内容，直接在元素上绑定一个属性如 data-hover="我是文字"，content: attr(data-hover) 就能取到了

iview里的 menu 组件如果是动态去设置的菜单列表数据，在子菜单里刷新当前页面默认自动折叠起来了，open-names 有值也不生效，要自己用这个方法 updateOpened 手动展开下

windows
刷新本地DNS缓存：ipconfig /flushdns
显示dns缓存：ipconfig /displaydns

程序员沟通很重要
大家是一个团队，自己很久也解决不了的问题可以找同事、领导协助解决
大家的目标都是一致的，齐心协力把产品做好，说话的艺术：
1、没有这么做的、没见过这样的 => 我建议是xx这样比较好，你可以去对比下，参考下
2、咱们不支持、没有这些功能 => 这个因为咱现有的系统没有，需要额外开发，我的建议是在目前资源比较紧张的情况下可以先xx
不要带着个人情绪工作，高情商，脾气发出来是本能，压下去是本事


空值合并操作符（??） 是一个逻辑操作符，与逻辑或操作符 || 类似，不过只有 ?? 左侧为 null 或 undefined 时，才会返回右侧的值，而 || 只要左侧是 false、null、undefined、0、NaN、'' 这6个都会返回右侧的值

2022-05-16T18:35:48.906Z 这种格式是 UTC世界时间，与北京时间相差8个时区，格式化时要用 dayjs.utc，直接用 dayjs 格式化要减去 8 个小时才对
dayjs.utc().format()   // 2022-05-18T01:54:50Z
dayjs().format()        // 2022-05-18T09:54:50+08:00
new Date()              // Wed May 18 2022 09:54:50 GMT+0800 (中国标准时间)

excel 制作模板要固定表头：视图 - 冻结窗格，禁止编辑单元格：① 点左上角全选整张表，设置单元格格式 - 保护，取消掉勾选“锁定”，② 选中要禁止的单元格，设置单元格格式 - 保护，勾选上“锁定”，③ 审阅 - 保护工作表 -设置密码（下面的那些可以都勾选上）

## 2022年6月20日
页面路由守卫 beforeRouteLeave(to, from, next)，在页面子组件中并不会触发
