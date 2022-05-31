# 前端导出下载excel表格

**1、一般后端直接返回二进制文件流，前端直接处理文件流下载就行了**

```vue
<template>
  <div class="v-download-excel" @click="onExport">
    <slot>
      <Button
        class="v-download-excel-btn"
        v-bind="$attrs"
        :loading="downloading"
        :disabled="disabled"
      >
        {{ btnText }}
      </Button>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'DownloadExcel',
    props: {
      action: { // 接口地址，必填，完整url
        type: String,
        required: true,
      },
      params: { // 请求参数：根据查询参数导出所有数据一般用这个，否则需要用 beforeDownload 钩子函数自己组装参数
        type: Object,
        default: () => ({}),
      },
      method: { // 请求方式
        type: String,
        default: 'post',
      },
      fileName: { // 导出的文件名
        type: String,
        default: '导出的文件',
      },
      fileType: { // 导出的文件类型
        type: String,
        default: 'xlsx',
      },
      btnText: { // 按钮文字
        type: String,
        default: '导出',
      },
      disabled: { // 是否禁止导出按钮
        type: Boolean,
        default: false,
      },
      beforeDownload: Function, // 导出之前的钩子，可返回一个Promise（需返回接口请求参数），一般用来做权限判断和接口参数组装
    },
    data() {
      return {
        downloading: false,
      }
    },

    computed: {
      downloadUrl() {
        if (this.method === 'post') return this.action
        return this.setObj(this.action, {
          ...this.params,
          token: this.getCookie('token'),
        })
      },
    },

    methods: {
      onExport () {
        if (!this.beforeDownload) {
          return this.exportData()
        }
        const before = this.beforeDownload() // 注意外面的钩子函数如果加了 async，会被自动转成promise
        if (before && before.then) { // 返回一个promise，resolve回接口参数
          before.then(res => {
            res && this.exportData(res)
          })
        } else if (before) { // 普通函数直接返回接口参数
          this.exportData(before)
        }
      },

      async exportData(p) {
        let params = this.method === 'get' ? {} : (p || this.params || {})
        let xhr = new XMLHttpRequest()
        this.downloading = true
        this.$emit('on-loading', true) // 自定义Button时提供给外面使用

        let _this = this
        let type = this.fileType
        let fileName = this.fileName
        xhr.open(this.method, _this.downloadUrl, true)
        xhr.setRequestHeader('Token', this.getCookie('token'))
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.responseType = 'blob'
        xhr.onload = function() {
          if (this.status === 200) {
            // 接受二进制文件流
            let blob = this.response
            _this.downloadExportFile(blob, fileName, type)
          } else {
            _this.$Message.error('请求失败,请稍后重试！')
          }
          _this.downloading = false
          _this.$emit('on-loading', false)
        }
        xhr.onerror = function() {
          _this.downloading = false
          _this.$emit('on-loading', false)
          this.$Message.error('请求失败,请稍后重试！')
        }
        xhr.send(JSON.stringify(params))
      },

      downloadExportFile(blob, tagFileName, fileType) {
        tagFileName = tagFileName + '.' + fileType
        if (window.navigator.msSaveOrOpenBlob) {
          // IE浏览器下
          navigator.msSaveBlob(blob, tagFileName)
        } else {
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = tagFileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      },

      // 工具函数
      setObj(url, obj) {
        for (let [key, value] of Object.entries(obj)) {
          url = this.setParam(key, value, url)
        }
        return url
      },

      setParam(name, value, url) {
        if (typeof name === 'undefined' || typeof value === 'undefined' || typeof url === 'undefined') {
          return url
        }
        let reg = new RegExp('(^|&|\\?|#)' + name + '=([^&]*?)(&|#|$)')
        let hash = url.match(/#.*/) ? url.match(/#.*/)[0] : ''
        let separator
        url = url.replace(/#.*/, '')

        if (reg.test(url)) {
          url = url.replace(reg, function(m, r1, r2, r3) {
            return r1 + name + '=' + encodeURIComponent(value) + r3
          })
        } else {
          separator = url.indexOf('?') === -1 ? '?' : '&'
          url = url + separator + name + '=' + encodeURIComponent(value)
        }

        return url + hash
      },

      getCookie(key) {
        if (typeof document === 'undefined') return
        let arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
        return arr ? unescape(arr[2]) : ''
      },
    },
  }
</script>

<style lang="stylus" scoped>
.v-download-excel
  display inline-block
  .v-download-excel-btn
    padding 0 8px
    background #fff
    border 1px solid #1890FF
    color #1890FF
    height 24px
    border-radius 4px
    box-shadow none
</style>
```

**2、前端直接根据表格数据导出**

下载速度较快，前端可以直接处理要下载的数据，唯一不足图片样式不能自适应，导出来不咋美观

```js
function tableToExcel(colums = [], data = [], name = '表格') {
  // 列标题
  let head = colums.reduce((pev, cur) => {
    pev += `<td>${cur.title}</td>`
  }, '<tr style="font-weight:bold;">') + '</tr>'

  let tbody = ''
  for (let i = 0; i < data.length; i++) {
    let g = data[i]

    let tds = ''
    for (let j = 0; j < colums.length; j++) {
        let key = colums[j].key
        let td = g[key]

        // 图片链接
        if (key === 'pictureUrl' || key === 'imageUrl' || key === 'imgUrl' || key === 'imageSrc' || key === 'imgSrc') {
            let imgNode = td ? `<td style="width:200px;height:100px;"><img width="200" height="100" src="${td}" alt="我的图片" /></td>` : '<td></td>'
            tds += imgNode
        } else {
            tds += `<td>${td}</td>`
        }
    }
    tbody += `<tr>${tds}</tr>`
  }
  let str = head + tbody // 头部跟身体内容连接

  // Worksheet名
  let worksheet = name
  let uri = 'data:application/vnd.ms-excel;base64,'

  // 下载的表格模板数据
  let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
  xmlns:x="urn:schemas-microsoft-com:office:excel" 
  xmlns="http://www.w3.org/TR/REC-html40">
  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
    <x:Name>${worksheet}</x:Name>
    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
    </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head><body><table border="1" cellpadding="10px" cellspacing="10px">${str}</table></body></html>`

  // 下载模板
  let url = uri + window.btoa(unescape(encodeURIComponent(template)))
  downloadExcel(url)
}

function downloadExcel(path) {
  const a = document.createElement('a')
  a.setAttribute('download', '我的表格.xlsx')
  a.setAttribute('href', path)

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
```

**3、借助第三方插件 exceljs**

可以动态获取到每个图片的宽高，样式比较美观，但是因为前端遍历请求了一遍所有图片来获取宽高，速度较慢

```js
// npm i exceljs

function exportExcel(colums = [], data = [], seetName = '表格') {
  const tableData = colums.reduce((pev, cur, index) => {
    if (cur.key === 'pictureUrl' || cur.key === 'imageUrl' || cur.key === 'imgUrl' || cur.key === 'imageSrc' || cur.key === 'imgSrc') {
      pev.img.push({
        key: cur.url,
        index,
      })
    }
    return pev
  }, { img: [] })

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet(seetName)

  worksheet.columns = colums

  worksheet.getRow(1).font = { size: 13, bold: true }
  worksheet.getRow(1).border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  }
  worksheet.getRow(1).fill = {
    bgColor: { rgb: '#a6edaf' },
  }

  let promiseList = []
  data.map(async (m, i) => {
    worksheet.addRows([m])
    let worksheetRow = worksheet.getRow(i + 2)
    worksheetRow.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    if (tableData.img.length) {
      for (let k = 0; k < tableData.img.length; k++) {
        const curKey = tableData.img[k].key
        const curIndex = tableData.img[k].index
        if (m[curKey]) {
          let pro = loadImg(m[curKey])
          promiseList.push(pro)
          pro.then(img => {
            let height = (180 / img.width) * img.height
            const imageId = workbook.addImage({
              base64: img.base64,
              extension: 'png',
            })
            worksheet.addImage(imageId, {
              tl: { col: curIndex + 0.1, row: i + 1 + 0.3 },
              ext: { width: 180, height },
            })
            worksheetRow.height = (height * 72) / 96 + 10
            worksheetRow.alignment = { vertical: 'middle' }
          })
        }
      }
    }
  })

  if (promiseList.length) {
    Promise.all(promiseList).then(async () => {
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer])
      downloadExcel(window.URL.createObjectURL(blob))
    })
  } else {
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer])
    downloadExcel(window.URL.createObjectURL(blob))
  }
}

function downloadExcel(path) {
  const a = document.createElement('a')
  a.setAttribute('download', '我的表格.xlsx')
  a.setAttribute('href', path)

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function image2Base64(img) {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  let dataURL = canvas.toDataURL('image/png')
  return dataURL
}

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    let base64 = ''

    // 解决跨域
    img.src = url + `${url.includes('?') ? '&' : '?'}` + new Date().valueOf()
    img.setAttribute('crossOrigin', 'anonymous')

    img.onload = () => {
      base64 = image2Base64(img)
      resolve({
        base64,
        height: img.height,
        width: img.width,
      })
    }
    img.onerror = (e) => {
      reject(e)
    }
  })
}
```

直接导出和用exceljs插件(右)导出对比
<img src="./1.png">