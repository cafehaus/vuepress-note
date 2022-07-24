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

## 知识点

**1. 变量设置默认值**

javascript 中给变量设置默认值可以直接用或运算符 ||，但是在 php 中或运算符 || 只能用来判断，会返回布尔值，要像js中设置默认值只能用if判断或者三元运算符

```php
$a = "";
$b = $a ? $a : "Hello"

// 可简写成下面的这种形式：
// $b = $a ?: "Hello"
```

**2. Object 对象**

在PHP 中，有三种类型的数组：
```php
// 数值数组：以数字为键的数组，键从0开始自增
$arr = ['zhou', 'xiao', 'hei'];

// 关联数组：带有指定的键的数组，每个键关联一个值
$list = ['id'=>1, 'name'=>'周小黑'];

// 多维数组：包含一个或多个数组的数组
```
其实关联数组就是 javascript 中的对象 Object

**3. 数组取值**

php 中要获取数组（或"对象"，即上面说到的关联数组，也就是前端js中的object）的属性值，要用 ["xx"]，不能用 -> ，横线箭头这个是 class 类对象才能这样获取

```php
$arr = array(
    "name": "zhou",
    "age": 18,
);

// 获取属性正确方式
$name = $arr["name"];

// 错误方式
$name = $arr->name;
```

**4. WP_Query 和 WP_Comment_Query 中的 no_found_rows 参数**

WP_Query 和 WP_Comment_Query 这两个查询类里，其实都有这个参数no_found_rows，是用来禁止 SQL_CALC_FOUND_ROWS 查询（这个玩意就是用来计算咱分页查询的总条数的，据说性能不高）。

如果 no_found_rows 为 false， 最大页 max_num_pages、总条数found_posts/found_comments 就不会去被计算，我们直接获取就都是0。

但是主要注意 WP_Query 文档上并没有写 no_found_rows 这个参数，翻源码可以发现是有的，WP_Comment_Query 文档上有写 no_found_rows 参数，但是要注意它的默认值是 true。

[WP_Query 文档](https://developer.wordpress.org/reference/classes/wp_query/__construct/)

[WP_Comment_Query 文档](https://developer.wordpress.org/reference/classes/WP_Comment_Query/__construct/)
