import * as validate from './validate.mjs'

// xlsx 前端直接读取 excel 表格内容
// 可以拿到单独的表头 header 和表格行数据 results
// header：包括所有表头名数组，空格表头会显示 UNKNOWN 17，表头名可重复
// results：所有表格行对象数组数据，键为表头名，值为空的单元格不会出现在对象中，如表头名重复的项，对象中的键会直接在后面拼上 _1 这种序号保证唯一

let header = ['*订单号', '*中文名', '*英文名', '*数量', '*姓名', '*电话', '*邮箱', '地址']
let list = [
  {
    '*订单号': 'KF6677858004',
    '*中文名': '拖鞋',
    '*英文名': 'shoe',
    '*数量': 2,
    '*姓名': 'Burning',
    '*电话': 1345102704,
    '*邮箱': '232323@12.com',
  },
  {
    '*订单号': 'KF6677858005',
    '*中文名': '裤子',
    '*英文名': 'pants',
    '*数量': 2,
    '*姓名': 'cafehaus',
    '*电话': 1345102704,
    '*邮箱': '232323@163.222@333',
  },
  {
    '*订单号': 'AC6677858005',
    '*英文名': '未知',
    '*数量': 2,
    '地址': '深圳市南山区'
  },
]

// 校验规则，key 直接用序号去对应，否则表头名字修改了容易导致对应不上，表头加一个字段，这里就要对应加一条
let rules = {
    0: { required: true, validator: validate.orderId },
    1: { required: true, validator: validate.name },
    2: { required: true, validator: validate.englishName },
    3: { required: true, validator: validate.quantity },
    4: { required: true, validator: validate.userName },
    5: { required: true, validator: validate.phone },
    6: { required: true, validator: validate.email },
    7: { required: false },
}

let errors = {}
list.map((row, i) => {
    let keys = Object.keys(rules)
    keys.map(m => {
        // row, m, i, errors 这四个是通用参数，如果根据业务逻辑还需其他参数传入校验，建议放到下面的 other 对象里传入
        let other = {}

        // 示例其他参数：如需求需要校验不通过定位到具体的单元格，额外传入每个单元格的坐标
        // 单元格 X 和 Y 轴坐标，Y轴一般第一行是表头，第二行就是数据
        other.x = covertToAlphabet(+m + 1) // 注意：这里的 m 是 rules 对象的 key，实际是 string
        other.y = i + 2

        if (rules[m].required && rules[m].validator) {
            rules[m].validator(row, header[m], i, errors, other)
        }
    })
})
console.log(errors)

// 数字序号转英文字母：1-A 26-Z 29-AC
function covertToAlphabet(n) {
    // charCodeAt：返回字符串第一个字符的 Unicode 编码
    // 参数 index 必需：表示字符串中某个位置的数字，即字符在字符串中的下标
    let codeA = 'A'.charCodeAt(0) // 65
    let codeZ = 'Z'.charCodeAt(0) // 90
    let len = codeZ - codeA + 1 // 26 字母表的字母个数

    let res = ''
    while(n) {
        n -= 1

        // fromCharCode：将 Unicode 编码转为一个字符
        res = String.fromCharCode(n % len + codeA) + res
        n = parseInt(n / 26)
    }
    return res
}

// 英文字母序号转数字：A-1 AC-29
function covertToNumber(str) {
    // charCodeAt：返回字符串第一个字符的 Unicode 编码
    // 参数 index 必需：表示字符串中某个位置的数字，即字符在字符串中的下标
    let codeA = 'A'.charCodeAt(0) // 65
    let codeZ = 'Z'.charCodeAt(0) // 90
    let len = codeZ - codeA + 1 // 26 字母表的字母个数

    let num = 0
    for (let x of str) {
        num *= len
        num += x.charCodeAt(0) - (codeA - 1)
    }

    return num
}