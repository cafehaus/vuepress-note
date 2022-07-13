# 前端查看后端日志

xShell、Tabby，推荐使用 Tabby 登录服务器，后端微服务架构，一般各个服务会在 /data/${各个服务}，日志会在服务里面的 log 目录里，比如 cafe-user 微服务下面实时日志 cafe-user.log

```bash
cd /data/cafe-user/log
```

查看日志
```bash
tail -f cafe-user.log
# tailf cafe-user.log
```

下载日志
```bash
sz cafe-user.log
```