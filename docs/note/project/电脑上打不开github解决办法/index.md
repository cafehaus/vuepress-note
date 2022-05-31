# 电脑上打不开github解决办法

电脑上github速度慢、甚至直接打不开怎么办，如果会科学上网，直接用科学了就能访问，不会的话就只能试试下面的修改本地 hosts 文件方法。

**windows 10解决方案**

1. 找到你电脑的这个文件夹 C:\Windows\System32\drivers\etc
2. 用编辑器打开里面的 hosts 文件
3. 把下面这段代码加到最后，然后保存（注意要管理员权限，否则没有修改权限会修改不成功，还有 ip 会变，自己找个查 ip 的网站获取下那两个网址最新的 ip，如：https://www.ipaddress.com/）

```json
# Added by zhou Github
20.205.243.166 github.com
140.82.113.4 github.com
20.205.243.165 codeload.github.com
```

4. 在终端里输入命令刷新下本地 dns 缓存：ipconfig/flushdns

**Mac 解决方案**

1. 找到你电脑的这个文件夹 /private/etc（点击finder,  顶部菜单栏：前往-前往文件夹，输入 /private/etc/hosts）
2. 将里面的 hosts 文件复制一份（因为不能直接修改，然后修改了之后再覆盖原来的 hosts）
3. 跟 windows 一样，在 hosts 里加入 ip 映射地址
4. 刷新dns：sudo killall -HUP mDNSResponde