## iview数字输入组件InputNumber

### 基本使用

min、max可以控制最小最大值，precision 可以控制小数位数，active-change设为 false 体验更好

```vue
<template>
  <InputNumber
    v-model="form.weight"
    :min="0.01"
    :max="99999999.99"
    :precision="2"
    :active-change="false"
    :formatter="fmtNumber"
    placeholder="请输入重量"
  />
</template>
```

### 两位小数时00不显示出来

保留两位小数时，有时想输入整数，但是组件会自动在后面给你补上 .00，感觉比较别扭，可以通过formatter去自定义格式化显示
```vue
<template>
  <InputNumber
    v-model="form.weight"
    :min="0.01"
    :max="99999999.99"
    :precision="2"
    :active-change="false"
    :formatter="fmtNumber"
    placeholder="请输入重量"
  />
</template>
<script>
export default {
  methods: {
    fmtNumber(v) {
      if (v) {
        let list = v.split('.') || []
        if (list[1] && list[1] === '00') {
          return list[0]
        }
      }
      return v
    }
  }
}
</script>
```

### 自定义显示格式

可以通过 formatter 去自定义显示，不过如果有添加其他字符，需要配合 parser 一起使用，否则拿到的元数据会有问题

```vue
<template>
 <InputNumber
    v-model="form.weight"
    :min="0.01"
    :max="99999999.99"
    :precision="2"
    :active-change="false"
    placeholder="请输入重量"
    :formatter="value => fmtNumber(value, 'KG')"
    :parser="value => value.replace('KG', '')"
  />
</template>
<script>
export default {
  methods: {
    fmtNumber(v, unit) {
      if (v) {
        let list = v.split('.') || []
        if (list[1] && list[1] === '00') {
          return (list[0] + unit)
        }
      }
      return (v + unit)
    }
  }
}
</script>
```
