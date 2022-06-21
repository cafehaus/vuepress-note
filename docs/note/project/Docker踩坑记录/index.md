# Docker踩坑记录

## Docker Desktop stopped...

明明用得好好的，突然某一天再打开，就看到了下面这样的：
<img src="./1.png">

然后重启 Docker，卸载重装...依然不行。

## Not enough memory to start Docker Desktop

重装Docker后又出现了上面这个报错提示：没用足够的内存运行 Docker，按照度娘的卸载重装、安装低版本、重启电脑都试了，依然无效。

<img src="./2.png">

**解决办法**

1. 下载微软官方的 [RAMMap](https://docs.microsoft.com/zh-cn/sysinternals/downloads/rammap)

> 你曾经想知道Windows是如何分配物理内存、RAM 中缓存多少文件数据，还是内核和设备驱动程序使用多少 RAM？ RAMMap 可以轻松回答这些问题。 RAMMap 是一种高级物理内存使用情况分析实用工具，适用于 Windows Vista 及更高版本。 它在多个不同的选项卡上以不同的方式显示使用情况信息。使用 RAMMap 了解Windows管理内存的方式、分析应用程序内存使用情况，或回答有关 RAM 分配方式的具体问题。 RAMMap 的刷新功能使你能够更新显示，并且它包括对保存和加载内存快照的支持。
2. 解压压缩包，点击运行里面的 RAMMap.exe
3. 点击 Empty => Empty Working Sets
4. 按F5刷新
5. 重启 Docker 就可以了

<img src="./3.png">