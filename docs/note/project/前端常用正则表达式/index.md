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

```
^*+-$?[](){}/\|
```

[JavaScript正则表达式需要转义的字符](https://blog.csdn.net/weixin_44100002/article/details/114373990?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~default-6-114373990-blog-108361305.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~default-6-114373990-blog-108361305.pc_relevant_default&utm_relevant_index=10)

## 中文特殊字符

|  序号  |  符号名称          | 符号形式  |  unicode |
|  ----- |  ----------------  | --------  | -------- |
|  1     |  句号              | 。        |  \u3002  |
|  2     |  问号              | ？        |  \uff1f  |
|  3     |  叹号              | ！        |  \uff01  |
|  4     |  逗号              | ，        |  \uff0c  |
|  5     |  顿号              | 、        |  \u3001  |
|  6     |  分号              | ；        |  \uff1b  |
|  7     |  冒号              | ：        |  \uff1a  |
|  8     |  左双引号          | “         |  \u201c  |
|  9     |  右双引号          | ”         |  \u201d  |
|  10    |  左单引号          | ‘         |  \u2018  |
|  11    |  右单引号          | ’         |  \u2019  |
|  12    |  左双引号2         | 『        |  \u300e  |
|  13    |  右双引号2         | 』        |  \u300f  |
|  14    |  左单引号2         | 「        |  \u300c  |
|  15    |  右单引号2         | 」        |  \u300d  |
|  16    |  上双引号          | ﹃        |  \ufe43  |
|  17    |  下双引号          | ﹄        |  \ufe44  |
|  18    |  左括号            | （        |  \uff08  |
|  19    |  右括号            | ）        |  \uff09  |
|  20    |  左中括号          | 【        |  \u3010  |
|  21    |  右中括号          | 】        |  \u3011  |
|  22    |  左中括号2         | [         |  \u005b  |
|  23    |  右中括号2         | ]         |  \u005d  |
|  24    |  左中括号3         | 〔        |  \u3014  |
|  25    |  右中括号3         | 〕        |  \u3015  |
|  26    |  破折号            | ——        |  \u2014  |
|  27    |  专名号            | ___       |  \u005f  |
|  28    |  省略号            | ……        |  \u2026  |
|  29    |  着重号/间隔号     | ·         |  \u0026\u0023\u0031\u0038\u0033\u003b  |
|  30    |  分隔号            | /         |  \u002f  |
|  31    |  左书名号          | 《        |  \u300a  |
|  32    |  右书名号          | 》        |  \u300b  |
|  33    |  左书名号2         | 〈        |  \u3008  |
|  34    |  右书名号2         | 〉        |  \u3009  |
|  35    |  连接号            | —         |  \u2014  |
|  36    |  连接号2           | -         |  \u002d  |
|  37    |  连接号3           | ～        |  \uff5e  |
|  38    |  下波浪线          | ﹏        |  \ufe4f  |

其他在键盘上中文输入法下能敲出来的符号：
```
·~！@#￥%……&*（）——-+=、|【】{}；：“”‘’，。、《》？./*
```
除去和上面中文标点重复的：
|  序号       | 符号形式  |  unicode |
|  ---------  | --------  | -------- |
|  1          | @         |  \u0040  |
|  2          | #         |  \u0023  |
|  3          | ￥        |  \uffe5  |
|  4          | %         |  \u0025  |
|  5          | &         |  \u0026  |
|  6          | *         |  \u002a  |
|  7          | \|        |  \u007c  |
|  8          | +         |  \u002b  |
|  9          | {         |  \u007b  |
|  10         | }         |  \u007d  |
|  11         | .         |  \u002e  |