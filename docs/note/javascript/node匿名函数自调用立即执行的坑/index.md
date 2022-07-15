# node 匿名函数自调用立即执行的坑

js 习惯不写分号，在 node 里写了个匿名立即执行函数，然后一直报错：TypeError: require(...) is not a function，开始以为是是不是不支持匿名函数自调用，或者是和 node 里的 commonjs 模块 require 不兼容？

```js
// Error 版本
// TypeError: require(...) is not a function
const fs = require('fs')

(() => {
    console.log(123)
})()

// Nice 版本一
const fs = require('fs');

(() => {
    console.log(123)
})()

// Nice 版本二
const fs = require('fs')

;(() => {
    console.log(123)
})()

// 上面的 const fs = require('fs') 也可以换成其他js代码
```

排查了好久才发现原来是不加分号埋下的坑，匿名立即执行函数前面的代码不管是啥一定要加上分号 ;，这样就能正确告诉代码执行器这是个函数，不要和前面的乱搞在一起，不加分号会把前面一句和匿名函数合在一起执行，然后就可能会报错了。

