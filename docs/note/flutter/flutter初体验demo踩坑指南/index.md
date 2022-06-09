## flutter初体验demo踩坑指南

### New Flutter Project 创建项目不成功

报错提示：Flutter create command was unsuccessful，然后打开项目文件里面就一个 .idea 文件夹，项目压根没创建成功。这个问题就是 flutter 没弄好，跟着下面一个问题就能解决了。

### 执行 flutter 命令，cmd终端直接闪退

按步骤下载了 flutter 的最新SDK文件（3.0.1版本，2022/5/20发布），也添加好了系统环境变量 path，在终端运行 where flutter dart 没问题，但是一运行 flutter doctor 命令时直接闪退了

**解决办法**

去放 flutter SDK文件的目录下运行 flutter doctor（直接在那个目录顶部的路径输入框输 cmd，小黑窗执行路径就会直接是当前目录）。等都设置好了，直接在默认的 C:\Users\Administrator> 里运行 flutter doctor 就不闪退了。

### Visual Studio not installed

成功运行 flutter doctor 后又发现报错提示：

::: danger
Visual Studio not installed
this is necessary for Windows development.
Download at https://visualstudio.microsoft.com/downloads/.
Please install the "Desktop development with C++" workload, including all of its default components
:::

晃眼一看以为是去 vscode 搜索安装 flutter 插件，心想这玩意咱熟悉呀，安装了重启 vscode，眼睛一闭一睁，flutter doctor 依然报错，才发现人让安装的是 Visual Studio（* 适用于 Windows 上 .NET 和 C++ 开发人员的最佳综合 IDE。 完整打包了一系列丰富的工具和功能，可提升和增强软件开发的每个阶段），并不是我们每天都在用的那个蓝色图标的 Visual Studio Code。

下载安装 [Visual Studio](https://visualstudio.microsoft.com/zh-hans/downloads/)，选中“使用C++的桌面开发”和“使用C++的移动开发”，这东西安装有点费内存：

<img src="./1.png">

这个报错其实不管不安装 Visual Studio 也没问题的，直接安装好 [Android Studio](https://developer.android.com/studio) 打开，安装 flutter 和 dart 插件，设置好安卓模拟器设备，然后 New Flutter Project 等待一会，再运行 main.dart 就能跑起来那个计数器 demo 应用了：

<img src="./2.png">

### HTTP host "https://maven.google.com/" is not reachable. Reason: An error occurred while checking the HTTP host:信号灯超时时间已到

这个需要修改 https://maven.google.com/ 到国内的镜像源，如果不改 demo 也能跑起来。

**解决步骤**

1. 找到放置 flutter SDK文件目录，打开 flutter\packages\flutter_tools\lib\src\http_host_validator.dart，注意不同的版本这个文件有可能不一样，我的是 windows10 上安装的 flutter3.0.1
2. 将里面的 https://maven.google.com/ 修改为 https://maven.aliyun.com/repository/google，也可以修改为其他的国内镜像源，只要能访问就行
3. 找到 flutter\bin 目录，删除里面的 cache 文件夹
4. 重新打开 cmd 小黑窗，运行 flutter doctor 检验一下