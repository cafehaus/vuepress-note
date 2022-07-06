## iview 组件默认样式覆盖

### DatePicker 时间日期组件右侧日历图标改成实心三角形

直接去修改日历图标的 content，值改成 iview 图标组件 Icon 里的下三角的值：\F33D，然后再通过激活转态的类名 ivu-date-picker-focused 去控制旋转

```vue
<template>
  <div class="date-picker">
    <DatePicker placeholder="请选择时间" />
  </div>
</template>

<style lang="stylus" scoped>
.date-picker
  >>>.ivu-date-picker
    .ivu-icon-ios-calendar-outline
      cursor pointer
      transition all .3s
      &:before
        content '\F33D'
        font-size 20px
  >>>.ivu-date-picker-focused
    .ivu-icon-ios-calendar-outline
      transform rotate(180deg)
</style>
```

### Select 组件右侧下拉箭头改成实心三角形

**方案一：修改图标的 content**

直接去修改下拉箭头图标的 content，值改成 iview 图标组件 Icon 里的下三角的值：\F33D
```vue
<template>
  <div class="select">
    <Select filterable clearable>
      <Option :value="-1">全部</Option>
      <Option :value="1">选项一</Option>
    </Select>
  </div>
</template>

<style lang="stylus" scoped>
.select
  >>>.ivu-icon-ios-arrow-down:before // 覆盖下拉框右侧箭头图标
    content '\F33D'
    font-size 18px
</style>
```

**方案二：用 Select 组件的 prefix 插槽去覆盖右侧图标**

这个其实算一个障眼法，好处是右侧的图标可以自己随意自定义
```vue
<template>
  <div class="select">
    <Select>
      <i slot="prefix" class="iconfont icon-triangle" />
      <Option value="0">默认</Option>
      <Option value="1">价格最低</Option>
      <Option value="2">时间最快</Option>
    </Select>
  </div>
</template>

<style lang="stylus" scoped>
.select
  >>>.ivu-icon-ios-arrow-down:before // 骚操作修改下拉框右侧箭头图标：隐藏默认的，用提供的prefix去覆盖
    content ''
  >>>.ivu-select-prefix
    position absolute
    top 50%
    right 6px
    line-height 1
    -webkit-transform translateY(-50%)
    transform translateY(-50%)
    -webkit-transition all 0.2s ease-in-out
    transition all 0.2s ease-in-out
    .icon-triangle
      font-size 18px
      color $black
  >>>.ivu-select-visible .ivu-select-prefix
    -webkit-transform translateX(3px) translateY(-50%) rotate(180deg)
    transform translateX(3px) translateY(-50%) rotate(180deg)
</style>
```

**方案三：通过 iview 提供的全局配置去修改**

iview 有提供一些组件的全局配置，不过这样改了会影响项目里所有用到的组件

* select.arrow：Select 下拉箭头图标
* select.customArrow：Select 自定义下拉箭头图标
* select.arrowSize：Select 下拉箭头尺寸