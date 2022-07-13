# 前端查看后端日志

xShell、Tabby，推荐使用 Tabby 登录服务器，后端微服务架构，一般各个服务会在 /data/${各个服务}，日志会在服务里面的 log 目录里，比如 cafe-user 微服务下面实时日志 cafe-user.log

```bash
cd /data/cafe-user/log
```

查看日志
```bash
tail -f cafe-user.log

# 也可以用下面这个
# tailf cafe-user.log

# 分页查看，可以通过键盘上上下箭头翻页
less cafe-user.log

# 通过管道符 | 和 grep 过滤数据，--color 可以高亮关键字
less cafe-user.log | grep '1345102704' | grp 'zhou' --color

# 直接通过绝对路径，联合查询，grep -v 反向过滤
grep '1345102704' /data/cafe-user/log/cafe-user.log | grep -v 'zhou' | tail -n 10
```

下载日志
```bash
sz cafe-user.log
```