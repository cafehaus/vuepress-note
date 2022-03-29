# Git使用技巧

## commit 规范

type 为必填项，用于指定 commit 的类型，约定了 feat、fix 两个主要 type，以及 docs、style、build、perf、refactor、revert 六个特殊 type

**主要 type**  
feat:     增加新功能  
fix:      修复bug

**特殊 type**  
docs:     只改动了文档相关的内容  
style:    代码格式修改，例如去掉空格、改变缩进、增删分号  
build:    构造工具的或者外部依赖的改动，例如webpack，npm  
perf:     提高性能的改动  
refactor: 代码重构时使用  
revert:   执行 git revert 打印的 message  

**完整的 commit message 示例：**


```bash
git add .
git commit -m "build(package.json):升级vue版本到v3.0.2"
git push origin dev
```

## Git批量删除本地分支

开发一段时间后，我们本地会有很多无用的分支，一个一个的
git branch -D branchName 又感觉太费时间了，如果要批量删除，可以用下面的命令：

```bash
git checkout master
git branch | grep -v 'master' | xargs git branch -D
```

**具体执行步骤是：**

1、切换到master分支，因为当前的分支不能删除，要保留哪个就先切换到哪个分支  
2、将git branch的结果进行筛选，除去master分支  
3、将处理后的结果作为git branch -D的参数来进行批量删除


**grep 查找命令**  
grep name 表示查看包含name这个关键字的内容  
grep -v name 反向查找，表示查看除了含有name之外的内容

**xargs**  
xargs（英文全拼： eXtended ARGuments），是给命令传递参数的一个过滤器，也是组合多个命令的一个工具

**管道命令符**  
管道命令符 | 的作用是将前一个命令的标准输出当作后一个命令的标准输入，格式为“命令A|命令B"