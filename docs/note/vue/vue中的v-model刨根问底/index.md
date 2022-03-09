# vue中的v-model刨根问底

关于v-model用过vue的应该都知道，用着那是相当的丝滑，但很多人可能并没有深究过其原理，而且随着vue版本的更新，也有些新的用法被大家遗漏，所以就有了这一篇对v-model的刨根问底。

## v-model的前世今生
v-model是vue中的一个指令，可以在表单控件或者组件上创建双向绑定。

实际上它只是一个语法糖，vue会自动在元素或者组件上添加value属性和input事件

```html
<!-- vue表单控件写法 -->
<input v-model="val" />
<!-- 等价于 -->
<input :value="val" @input="($event) => val = $event.target.value" />


<!-- vue组件写法 -->
<MyComponent v-model="val" />
<!-- 等价于 -->
<MyComponent :value="val" @input="(e) => val = e" />
```

在input之类的表单控件上使用大家都很熟悉，但很多人可能会遗漏掉v-model在自定义组件上的使用。

在子组件中，通过props中的value来接收父组件中传的值，同时可以通过 $emit('input', e) 来同步更改父组件中的值。

可能也就是上面这个约定的value和input事件限制了大家在组件上的使用，在实际开发中value和input这两个名字可能并不能很好的表达我们的语义（vue后面的版本已经帮我们解决掉这个问题了）。

在组件中使用v-model通过props接收值和$emit传值，同我们自己在父组件上绑定一个属性和$emit传值可以少一步在父组件中监听@input的操作，所以在组件使用v-model也是很丝滑的。

## vue 2.2.0版本新增的model组件选项

默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但很多时候我们并不想用这两个名字，在vue 2.2.0版本就新增了model组件选项，允许一个自定义组件在使用 v-model 时定制 prop 和 event：

```js
// my-child
<script>
export default {
  model: {
    prop: 'city', // 对应父组件中绑定的属性（即子组件中接收的props）
    event: 'change'// 对应父组件中监听的事件（即子组件中的$emit）
  },
  props: {
    city: {
      type: String,
      default: '深圳'
    }
  }
}
</script>
```

```html
<my-child :city="curCity" @change="(value) => curCity = value" />
```

## v-model在开发中的一些应用

* 最常用的表单控件双向绑定
* 自定义组件数据传值双向绑定
* 在iview之类的UI框架中组件二次封装，如根据业务二次封装弹窗 Modal 组件，可以直接用v-model来控制显隐（注意iview的Modal组件是一开始就渲染在父组件中的，通过display:none隐藏了，所以不能用Modal的created生命周期来做数据初始化，要自己监听value的变化来做相应的初始化逻辑）

## v-model的亲戚sync和update

vue从1.0版本就提供了.sync 绑定修饰符，组件 prop 默认是单向绑定的，加上 .sync 后会把子组件的 prop 属性同步回父组件。

但是vue 2.0里为了避免对父组件产生反向影响，子组件需要显式地传递一个事件而不是依赖于隐式地双向绑定，所以次修饰符被无情地移除了。

这个世界就是这么奇妙，不知是不是大家一致反馈双向绑定太丝滑了，**vue 2.3.0+** 又把 .sync 以编译时语法糖的形式新增回去了：

```js
// my-child
<script>
export default {
  props: {
    city: {
      type: String,
      default: '深圳'
    }
  },
  methods: {
    changeCity() {
      this.$emit('update:city', '东莞')
    }
  }
}
</script>
```

```html
<!-- .sync 修饰符写法 -->
<my-child :city.sync="curCity" />
<!-- 等价于 -->
<my-child :city="curCity" @update:city="(value) => curCity = value" />
```

天下大势，合久必分，分久必合，在最新的 vue 3.0 版本中，.sync 修饰符又被无情地移除了，且听下面部分更加精彩的分析。

## vue 3 中的v-model

对于.sync 修饰符再次被移除，江湖众说纷纭，实际上也没那么玄乎，仅仅是它的功能都被亲戚v-model全盘收编了，它也就跟35岁的程序员一样被光荣劝退了。

>在 Vue 2.0 发布后，开发者使用 v-model 指令时必须使用名为 value 的 prop。如果开发者出于不同的目的需要使用其他的 prop，他们就不得不使用 v-bind.sync。此外，由于v-model 和 value 之间的这种硬编码关系的原因，产生了如何处理原生元素和自定义元素的问题。  
在 Vue 2.2 中，我们引入了 model 组件选项，允许组件自定义用于 v-model 的 prop 和事件。但是，这仍然只允许在组件上使用一个 v-model。  
在 Vue 3 中，双向数据绑定的 API 已经标准化，以减少开发者在使用 v-model 指令时的混淆，并且更加灵活。

### 1、vue 3 中单独区分出了组件v-model
组件上的 v-model 使用 modelValue 作为 prop 和 update:modelValue 作为事件：

```html
<!-- 组件v-model写法 -->
<my-child v-model="city" />

<!-- vue 1 和 vue 2 中等同于 -->
<my-child :value="curCity" @input="(value) => curCity = value" />

<!-- vue 3 中等同于 -->
<my-child :model-value="curCity" @update:model-value="(value) => curCity = value" />
<my-child :modelValue="curCity" @update:modelValue="curCity = $event" />

```

### 2、vue 3 中组件上可以绑定多个v-model
v-model可以接收参数，并且可以绑定多个值（这个王炸就直接干掉了.sync），向下面这样:
```html
<my-child v-model:city="curCity" v-model:country="curCountry" />

<!-- 等价于 -->
<my-child
  :city="curCity"
  :country="curCountry"
  @update:city="curCity = $event"
  @update:country="curCountry = $event"
/>
```
在子组件中通过 $emit('update:city', e)、$emit('update:country', e)来更改父组件中的值

::: tip 扩展
**vue 3 中新增了一个emits选项**：和现有的 props 选项类似，这个选项可以用来定义一个组件可以向其父组件触发的事件。props作为传入，正好可以用emits来对应作为传出，并且也合props一样支持传出参数的校验，vue官方建议我们在组件中所有的emit事件都能在组件的emits选项中声明。
:::