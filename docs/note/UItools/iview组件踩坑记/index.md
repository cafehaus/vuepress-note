## iview 组件踩坑记

### page 分页组件

切换页数的 on-page-size-change 事件监听页数改变，我们一般会直接将传过来的 size 赋值给页数，然后手动载获取一下数据。但是这里 iview 有坑：在页码非第一页时会自动去触发页码改变事件获取数据，如果我们手动再去获取一次，其实会调用两次接口，如果是第一页，iview又不会主动去获取数据，通过查看组件源码：

```js
// 页码改变
changePage (page) {
    if (this.disabled) return;
    if (this.currentPage != page) { // 在第一页改变页码时不会主动去获取数据
        this.currentPage = page;
        this.$emit('update:current', page);
        this.$emit('on-change', page);
    }
},

// 页数改变
onSize (pageSize) {
    if (this.disabled) return;
    this.currentPageSize = pageSize;
    this.$emit('on-page-size-change', pageSize);
    this.changePage(1);
},
```

改变页码获取数据时，最好加一个判断 this.page.index === 1 的判断再手动去获取数据或者自己手动改下 index = 1 再去获取数据，否则 在末尾几页触发 handlePageSize 在 index 还没变的时候去获取实际没有的页数数据会返回空（而这次的异步接口如果比自动触发的晚显示可能造成页面暂无数据）

```js
handlePage(pageNum) {
    this.page.index = pageNum
    this.getList()
},

handlePageSize(size) {
    this.page.size = size

    // 页码为非1时会自动触发获取数据
    if (this.page.index === 1) this.getList()

    // 或者下面这样（不过非第一页会调两次接口，不推荐）
    // this.page.index = 1
    // this.getList()
},
```

### Form 表单里的 InputNumber 组件校验一直不通过

明明输入框里已经有值了，校验一直报红，看控制台还报错：
```js
[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number with value 1, got String with value "1"
```

<img src="./1.png" />

这里就是因为初始赋值的时候，直接将数值字符串直接赋值给了 InputNumber，Form 表单里的校验规则 rules 里又有指定 type 为 number，类型不一致导致校验不通过。