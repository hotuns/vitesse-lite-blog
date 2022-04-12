---
title: 使用vscode远程连接Linux服务器进行开发---使用工具remote-ssh
date: 2020-09-10 17:25:27
---


[toc]



## 介绍

研究如何在本地Mac上使用vscode进行远程开发。这里介绍下其中的细节。

## 开始

具体实现通过vscode中的Remote-SSH插件完成的，这个插件是微软帝国亲自操刀编写的，官方介绍说是可以让你通过SSH连接远程服务器作为本地的开发环境，接下来就一步步了解Remote-SSH的安装、配置以及使用。

### 安装Remote-SSH

直接打开vscode中的插件搜索SSH找到Remote-SSH直接安装即可。

 

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTEwMTNmYjQ1YmU4Mjg5NmYucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvNTMxL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

安装Remote-SSH.png

### 配置Remote-SSH

安装完成后会出现一个远程资源管理器图标，其中可以选择SSH Targets。

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTRjODRlYzE4OWU4MTUyZGMucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvNDExL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

SSH Targets.png


然后点击配置：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LWNlZTcxMGI0NGFiZjMzNGIucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvMTAzMS9mb3JtYXQvd2VicA?x-oss-process=image/format,png)

配置服务器.png


此时打开一个config配置文件，让你输入HostName和User：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LWE0YjI5M2MxZTk0OGJmNDEucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvODU4L2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

填写服务器信息.png


自此配置工作就完成了。

 

### 连接远程服务器

在这之前需要对vscode进行配置，具体文件-首选项-设置-扩展找到Remote-SSH中将其中的Show Login Terminal选中：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTlmMjk3NTdhNGQ5NjhkMTQucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvODg0L2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

vscode中配置.png


此时你在vscode的远程资源管理器中就看到一个你配置好了的远程服务器，就可以连接了：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTgzMmU0NWZmMGI5OWRkZTYucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvMzg5L2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

连接远程服务器.png


点击后会打开一个新的vscode窗口，在其下的终端中要求你输入远程服务器的密码：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTk0OTA0NjNjZmExM2U3OWUucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvMTAyMi9mb3JtYXQvd2VicA?x-oss-process=image/format,png)

登录远程服务器.png


登录完成后会打开一个Check remote终端这个终端并不能操作是用来保持SSH连接的，并且左下角提示SSH:centos说明连接成功：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTNlMTE3NjQ2NjhiMmM4MDMucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvMTAxOS9mb3JtYXQvd2VicA?x-oss-process=image/format,png)

连接成功.png

 

### 工作在远程服务器中

此时你的vscode就工作在远程服务器中了，让我们来打开一个文件夹：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTMxNmEwZmNmZmU5ZmFmZTIucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvNzIxL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

在远程服务器中打开文件夹.png


点击后就打开了家目录，此时我们就可以像平常那样直接用vscode的资源管理器来管理我们的文件了。

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LWRiYzI4NmU4MjcyOTlmMjcucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvMjc2L2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

编辑文件.png


如果我们想要打开远程服务器的shell，那么可以像在本地那样直接在终端中打开就好了：

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTg2MTMxYmUxNWQxYWMwZmMucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvODY2L2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

打开终端.png


本机中的插件是无法在远程服务器中使用的，这就需要我们从新安装插件，这个也比较简单，在连接上远程服务器后在vscdoe的插件侧边栏中就可以看到一个专为远程服务器显示 安装插件的区域，此后的操作与本地安装基本一样。

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTg4MjAxOGE2NmI2ZThjMjYucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvMzIyL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

搜索插件.png

 

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LTNkZTQ0NzBjMjA2OTViZDEucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvMjgwL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

安装插件.png

 

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8yNTM3NDI5LWYwNzMyODhlNzIwOWQ5N2QucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXB8aW1hZ2VWaWV3Mi8yL3cvMjg0L2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

安装完成.png

 

## 总结

自此你就可以尽情在vscode中使用远程服务器作为本地环境来进行开发了。

## 拾遗

这里用来写一些使用过程中会出现的问题：

**问题一：**在使用过程中包括使用putty来SSH连接远程服务器的时候出现一段时间不操作连接断开的解决方法：

1. 找到sshd_config配置文件进行编辑：

> sudo vim /etc/ssh/sshd_config

1. 在其中找到以下配置项目：

 

```
#ClientAliveInterval 0



#ClientAliveCountMax 3
```

1. 去除注释并修改

 

```
ClientAliveInterval 60



ClientAliveCountMax 3
```

ClientAliveInterval指定了服务器端向客户端请求消息 的时间间隔, 默认是0, 不发送.而ClientAliveInterval 60表示每分钟发送一次, 然后客户端响应, 这样就保持长连接了.ClientAliveCountMax, 使用默认值3即可.ClientAliveCountMax表示服务器发出请求后客户端没有响应的次数达到一定值, 就自动断开. 正常情况下, 客户端不会不响应。

1. 重启sshd service

> sudo /etc/init.d/ssh restart

**问题二：**并不是所有的本地插件都无法使用，发现一些编辑相关的操作都可以使用，例如我的vim插件，而类似Project Manager，python，path Intellisense这样的可能使用到服务器内容的插件都需要安装到远程服务器上。





[原文]{https://blog.csdn.net/weixin_42096901/article/details/105062195}

