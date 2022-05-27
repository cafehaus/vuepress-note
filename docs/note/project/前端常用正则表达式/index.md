# 前端常用正则表达式

## 正则工具
1. [RegExr 正则在线测试](https://regexr.com/)
2. [菜鸟工具正则在线测试](https://c.runoob.com/front-end/854)
3. [正则可视化](https://jex.im/regulex/)

## email 邮箱验证

没找到比较权威的，网上找的部分版本像 1345102704@qq.com1234 也能匹配成功，项目中推荐使用校验库 vee-validate 的版本
```js
// vee-validate
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// async-validator
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/

// 网上找的版本 1
/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

// 网上找的版本 2
/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

// 网上找的版本 3
/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

// 网上找的版本 4
/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/

// 网上找的版本 5
/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/

// 网上找的版本 6
/^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/
```

## 网址 url

匹配网址 url，项目中一般只用精准去匹配 https 或 http 开头的 url 就可以了，其他的 ip 地址、ftp...这些一般用不到
```js
// async-validator
new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i',
)

// 网上找的版本 1
/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

// 网上找的版本 2
/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

// 网上找的版本 3
/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/

// 自己项目中用的版本
// 只用匹配 https 和 http，http://www.cafe123.cn、http:dev-www.cafe123.cn
/^https?:\/\/[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[\(\)~#&\-=?\+\%/\.\w]+)?/g
```

翻 vee-validate 源码的时候发现 url 不是用正则去匹配的，直接用 URL() 构造函数去看会不会抛出错误，实在是高明

```js
import { getSingleParam, isEmpty } from './utils';

const urlValidator = (value: unknown, params: [string | RegExp | undefined] | { pattern?: string | RegExp }) => {
  if (isEmpty(value)) {
    return true;
  }

  let pattern = getSingleParam(params, 'pattern');
  if (typeof pattern === 'string') {
    pattern = new RegExp(pattern);
  }

  try {
    // eslint-disable-next-line no-new
    new URL(value as string);
  } catch {
    return false;
  }

  return pattern?.test(value as string) ?? true;
};

export default urlValidator
```

> URL() 构造函数返回一个新创建的 URL 对象，表示由一组参数定义的 URL，如果给定的基本 URL 或生成的 URL 不是有效的 URL 链接，则会抛出一个TypeError，[MDN URL介绍链接](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL)

## 数字正则

```js
// 数字
/^[+-]?(0|([1-9]\d*))(\.\d+)?$/

// 大于 0 的整数
/^[1-9]\d*$/
```

## 正则需要转义的字符

^*+-$?[](){}/\|

[JavaScript正则表达式需要转义的字符](https://blog.csdn.net/weixin_44100002/article/details/114373990?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~default-6-114373990-blog-108361305.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~default-6-114373990-blog-108361305.pc_relevant_default&utm_relevant_index=10)