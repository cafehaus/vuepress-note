# 前端pdf预览下载和图片下载、压缩

**PDF文件预览**
① 直接用 iframe 标签，体验较好，唯一不足滚动条样式没法自定义

② 用第三方插件，如 pdfjs

**下载PDF文件**
在浏览器中直接用a标签模拟点击下载pdf文件，如果是跨域资源，浏览器会自动新开tab打开预览而不是下载，在网上找到几种解决方案：

① 在 pdf 资源路径后添加 ?response-content-type=application/octet-stream 参数

此种解决方案会将请求的资源当成二进制文件流，所以确实可以直接下载，但是如果路径是这样的格式：'https://xxx.oss-cn-shenzhen.aliyuncs.com/HiheABZFpdf'，下载的文件名会直接是 HiheABZFpdf，要自己手动在后面加上 .pdf才可以正常预览。

② 用第三方插件，如：FileSaver

③ 用new XMLHttpRequest()发起请求转成二进制文件流，再本地下载

可以实现跨域下载，但资源服务器也要设置了可以跨域获取才可以，否则前端怎么做都是无用功：

```js
function getBlob() {
    let xhr = new XMLHttpRequest()
    let _this = this
    xhr.open('get', url, true)
    xhr.setRequestHeader('Content-Type', `application/pdf`)
    xhr.responseType = 'blob'
    xhr.onload = function() {
        if (this.status === 200) {
        // 接受二进制文件流
        // var blob = xhr.response
        var blob = this.response
        // 下载
        downloadExportFile(blob, '文件名', 'pdf')
        }
    }
    xhr.send()
}

function downloadExportFile(blobData, fileName, fileType = 'xlsx', callback) => {
  fileName = fileName + '.' + fileType

  if (window.navigator.msSaveOrOpenBlob) {
    // IE浏览器下
    navigator.msSaveBlob(blobData, fileName)
  } else {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blobData)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
  if (callback) {
    callback()
  }
}
```

**跨域图片下载**
直接用a标签下载，如果图片路径跨域浏览器也会自动打开而不是下载

① 绘制到 canvas 上再下载

```js
function downImg (){
  let imgsrc = 'https://images.pexels.com/photos/11495860/pexels-photo-11495860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  let image = new Image()

  // 解决跨域
  image.setAttribute('crossOrigin', 'anonymous')
  image.src = imgsrc
  image.onload = function() {
    let canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    let context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    let url = canvas.toDataURL('image/png') // 得到图片的base64编码数据

    let a = document.createElement('a') // 生成一个a元素
    let event = new MouseEvent('click') // 创建一个单击事件
    a.download = '我的图片' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
}
```

② 用new XMLHttpRequest()发起请求转成二进制文件流，再本地下载

这个和上面的pdf下载思路一样
```js
function getBlob() {
    let xhr = new XMLHttpRequest()
    let _this = this
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function() {
        if (this.status === 200) {
        // 接受二进制文件流
        // var blob = xhr.response
        var blob = this.response
        // 下载
        downloadExportFile(blob, '文件名', 'image/jpeg')
        }
    }
    xhr.send()
}

function downloadExportFile(blobData, fileName, fileType = 'xlsx', callback) => {
  fileName = fileName + '.' + fileType

  if (window.navigator.msSaveOrOpenBlob) {
    // IE浏览器下
    navigator.msSaveBlob(blobData, fileName)
  } else {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blobData)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
  if (callback) {
    callback()
  }
}
```

**小程序base64图片下载**

动态生成的小程序码需要后端去调用wx的接口，返回的是base64数据，前端实现下载代码：
```js

function download() {
  // 此示例路径是一个无效路径
  let url = 'data:image/jpg;base64,eyJlcnJjb2RlIjo0ODAwMSwiZXJybXNnIjoiYXBpIHVuYXV0aG9yaXplZCByaWQ6IDYyNjY0ZTVkLTRkN2EyMTM4LTIyMzQzNDg2In0='

  let myBlob = this.dataURLtoBlob(url)
  let myUrl = URL.createObjectURL(myBlob)
  this.downloadFile(myUrl, '小程序码.png')
}

// 转 blob
function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

function downloadFile(url, name = '小程序码') {
  let a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', name)
  a.setAttribute('target', '_blank')
  let clickEvent = document.createEvent('MouseEvents')
  clickEvent.initEvent('click', true, true)
  a.dispatchEvent(clickEvent)
}
```

**图片压缩**

利用canvas，先绘制到canvas上再实现压缩
```js
function compressImage(file, success, error) => {
  // 图片小于1M不压缩
  if (file.size < Math.pow(1024, 2)) {
    return success(file)
  }

  const name = file.name // 文件名
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    const src = e.target.result

    const img = new Image()
    img.src = src
    img.onload = e => {
      const w = img.width / 1.5
      const h = img.height / 1.5
      const quality = 0.7 // 默认图片质量为0.92
      // 生成canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 创建属性节点
      const anw = document.createAttribute('width')
      anw.nodeValue = w
      const anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)

      // 铺底色 PNG转JPEG时透明区域会变黑色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, w, h)

      ctx.drawImage(img, 0, 0, w, h)
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/jpeg', quality) // 图片格式jpeg或webp可以选0-1质量区间

      // 去掉url的头，并转换为byte
      const bytes = window.atob(base64.split(',')[1])
      // 处理异常,将ascii码小于0的转换为大于0
      const ab = new ArrayBuffer(bytes.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      let newFile = new File([ab], name, { type: 'image/jpeg' })
      success(newFile)
    }
    img.onerror = e => {
      error(e)
    }
  }
  reader.onerror = e => {
    error(e)
  }
}
```