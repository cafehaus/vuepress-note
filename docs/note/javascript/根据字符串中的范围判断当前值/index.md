# 根据字符串中的范围判断当前值

需求场景：因为业务中需要去调用第三方的接口，某些字段需要做校验，但是接口返回的规则都是一些提示，像这样的： '金额区间: 140≤x≤350USD'、'最低金额: x≥140.89USD'、'三边之和: 10.0cm≤x≤20.0cm'...需要自己去里面提取规则和上下限值来判断。

**范围总共有 16 种情况：**
1. min ≤ x ≤ max
2. min ≤ x < max
3. min < x ≤ max
4. min < x < max
5. max ≥ x ≥ min
6. max ≥ x > min
7. max > x ≥ min
8. max > x > min
9. x ≤ max
10. x < max
12. x ≥ min
12. x > min
13. min ≤ x
14. min < x
15. max ≥ x
16. max > x

```js
function isRangeIn(x, str) {
  if (!/^[+-]?(0|([1-9]\d*))(\.\d+)?$/.test(x)) {
    console.log('当前值非数字')
    return
  }
  if (!str || (str && typeof str !== 'string')) return true // 规则字符串不存在默认通过
  const arr = str.match(/\d+(\.\d+)?/g)
  if (!arr || !arr.length) return true // 未提取到范围数据默认通过

  const numFirst = +arr[0]
  const numTwo = +arr[1]
  let isVali = true

  if (str.includes('≤x≤')) {
    isVali = (numFirst <= x) && (x <= numTwo)
  } else if (str.includes('≤x<')) {
    isVali = (numFirst <= x) && (x < numTwo)
  } else if (str.includes('<x≤')) {
    isVali = (numFirst < x) && (x <= numTwo)
  } else if (str.includes('<x<')) {
    isVali = (numFirst < x) && (x < numTwo)
  } else if (str.includes('≥x≥')) {
    isVali = (numFirst >= x) && (x >= numTwo)
  } else if (str.includes('≥x>')) {
    isVali = (numFirst >= x) && (x > numTwo)
  } else if (str.includes('>x≥')) {
    isVali = (numFirst > x) && (x >= numTwo)
  } else if (str.includes('>x>')) {
    isVali = (numFirst > x) && (x > numTwo)
  } else if (str.includes('x≤')) {
    isVali = x <= numFirst
  } else if (str.includes('x<')) {
    isVali = x < numFirst
  } else if (str.includes('x≥')) {
    isVali = x >= numFirst
  } else if (str.includes('x>')) {
    isVali = x > numFirst
  } else if (str.includes('≤x')) {
    isVali = numFirst <= x
  } else if (str.includes('<x')) {
    isVali = numFirst < x
  } else if (str.includes('≥x')) {
    isVali = numFirst >= x
  } else if (str.includes('>x')) {
    isVali = numFirst > x
  }

  return isVali
}

// 测试
// const a = isRangeIn(6.9999999999, '第三长边: 4.0cm<x<7.0cm')
// const a = isRangeIn(11, 'x>10.0cm')
// const a = isRangeIn(9, '两长边之和: 10.0cm≤x≤20.0cm')
// const a = isRangeIn('141', '金额区间: 140≤x≤350USD')
// console.log(a)
```

面对这种很无奈的需求，一定要自己从逻辑上梳理清楚，不要漏掉任何一种可能的情况

## TODO

规则里如果有数字，上面提取出来的 numFirst 和 numTwo 会不对，如：两短边之和*2：x≤120cm，方法里的数字提取需优化

