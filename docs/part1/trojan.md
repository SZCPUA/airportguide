# Trojan

> 本文来自 [tlanyan.me](https://tlanyan.me/trojan-tutorial/).



Trojan 简介
---------

**trojan** 是近两年兴起的网络工具，项目官网 [https://github.com/trojan-gfw](https://github.com/trojan-gfw)。与强调加密和混淆的 SS/SSR 等工具不同，trojan 将通信流量伪装成互联网上最常见的 https 流量，从而有效防止流量被检测和干扰。在敏感时期，基本上只有 trojan 和 [v2ray 伪装](https://tlanyan.me/v2ray-traffic-mask/) 能提供稳如狗的体验。

v2ray 和 trojan 有如下区别及特点：

1.  v2ray 是一个网络框架，功能齐全；trojan 只是一个绕过防火墙的工具，轻量级、功能简单；都使用 TLS 加密的情况下，理论上 trojan 比 V2ray 性能更好；
2.  v2ray 和 trojan 都能实现 https 流量伪装；
3.  v2ray 内核用 go 语言开发，trojan 是 c++ 实现；
4.  v2ray 名气大，使用的人多，客户端很好用；trojan 关注和使用的人少，官方客户端简陋，生态完善度不高。

本教程先介绍 trojan 服务端的安装部署，然后以 windows 系统为例讲解客户端使用。下载客户端请访问：[trojan 客户端下载](https://tlanyan.me/trojan-clients-download/)。

> 1.  trojan 无法配合 CDN 使用，如需过 CDN 请使用加强版的 [trojan-go](https://github.com/p4gefau1t/trojan-go)，一键脚本参考 [trojan-go 一键脚本](https://tlanyan.me/go.php?key=trojan-go-script)
> 2.  V2ray 发布了新一代 VLESS 协议，配合 XTLS 和 direct 模式性能大大超过 trojan，详情请参考 [VLESS 协议介绍和使用教程](https://tlanyan.me/introduce-v2ray-vless-protocol/)
> 3.  **2020.12.28 更新**：XTLS 目前在 Xray 项目中被支持，详情参考 [Xray 教程](https://tlanyan.me/xray-tutorial/)

安装 trojan
---------

### 准备事项

按照本教程部署 trojan 需要如下前提条件：

1. 有一台运行 Linux 的境外 vps；购买 vps 可参考：[一些 VPS 商家整理](https://tlanyan.me/vps-merchant-collection/)；

2. 有一个域名；购买域名可参考：[Namesilo 域名注册和使用教程](https://tlanyan.me/namesilo-domain-tutorial/) 或从 [适合国人的域名注册商推荐](https://tlanyan.me/domain-register-for-mainland/) 选购；

       3. 将域名的某个子域名 (伪装域名) 解析道境外 VPS 的 IP；

4. 为域名申请一个证书；请参考 [从 Let’s Encrypt 获取免费证书](https://tlanyan.me/use-lets-encrypt-certificate/) 或 [从阿里云获取免费 SSL 证书](https://tlanyan.me/get-free-ssl-certificates-from-aliyun/) (伪装域名用来做站推荐使用)；

5. 通过 ssh 终端连接到 vps；Windows 系统请参考 [Bitvise 连接 Linux 服务器教程](https://tlanyan.me/go.php?key=bitvise-tutorial)，mac 用户请参考 [Mac 电脑连接 Linux 教程](https://tlanyan.me/go.php?key=mac-ssh-tutorial)。

> 新手建议使用 [trojan 一键脚本](https://tlanyan.me/go.php?key=trojan-script)，能自动申请证书、开启 BBR 加速

### 安装 trojan 服务端

本教程服务端系统是 CentOS 7，其他系统的命令基本类似，请自行转换。

连到 VPS 后，终端输入如下命令安装 trojan：

```
sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/trojan-gfw/trojan-quickstart/master/trojan-quickstart.sh)"

```

该命令会下载最新版的 trojan 并安装。安装完毕后，trojan 配置文件路径是 `/usr/local/etc/trojan/config.json`，其初始内容为：

```
{
    "run_type": "server",
    "local_addr": "0.0.0.0",
    "local_port": 443,
    "remote_addr": "127.0.0.1",
    "remote_port": 80,
    "password": [
        "password1",
        "password2"
    ],
    "log_level": 1,
    "ssl": {
        "cert": "/path/to/certificate.crt",
        "key": "/path/to/private.key",
        "key_password": "",
        "cipher": "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384",
        "cipher_tls13": "TLS_AES_128_GCM_SHA256:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384",
        "prefer_server_cipher": true,
        "alpn": [
            "http/1.1"
        ],
        "reuse_session": true,
        "session_ticket": false,
        "session_timeout": 600,
        "plain_http_response": "",
        "curves": "",
        "dhparam": ""
    },
    "tcp": {
        "prefer_ipv4": false,
        "no_delay": true,
        "keep_alive": true,
        "reuse_port": false,
        "fast_open": false,
        "fast_open_qlen": 20
    },
    "mysql": {
        "enabled": false,
        "server_addr": "127.0.0.1",
        "server_port": 3306,
        "database": "trojan",
        "username": "trojan",
        "password": "",
        "key": "",
        "cert": "",
        "ca": ""
    }
}

```

请重点关注配置文件中的如下参数：

1.   `local_port`：监听的端口，默认是 443，除非端口被墙，不建议改成其他端口；
2.   `remote_addr`和`remote_port`：非 trojan 协议时，将请求转发处理的地址和端口。可以是任意有效的 ip / 域名和端口号，默认是本机和 80 端口；
3.  `password`：密码。需要几个密码就填几行，最后一行结尾不能有逗号；
4.  `cert`和`key`：域名的证书和密钥，Let’s Encrypt 申请的证书可用 `certbot certificates` 查看证书路径。注意不是 mysql 里面的 key 和 cert！
5.  `key_password`：默认没有密码（如果证书文件有密码就要填上）；
6.  `alpn`：建议填两行：http/1.1 和 h2，保持默认也没有问题。

根据自己的需求修改配置文件（大部分参数保持默认即可），保存，然后设置开机启动：`systemctl enable trojan`，并启动 trojan： `systemctl start trojan`。

检查 trojan 是否在运行：`ss -lp | grep trojan`，如果输出为空，可能的原因包括：

1.  config.json 文件有语法错误：请注意是否少了逗号，有特殊字符等；
2.  开启了 selinux： `setenforce 0`关闭再启动 trojan。

软件运行没问题的话，最后一步是防火墙放行端口（如果开了防火墙的话）：

```
firewall-cmd --permanent --add-service=https # 端口是443
firewall-cmd --permanent --add-port=端口号/tcp # 其他端口号
firewall-cmd --reload # 重新加载防火墙

```

### trojan 服务端注意事项

以下是一些注意事项：

1. 为了让伪装更正常，配置文件中的 `remote_addr` 和 `remote_port` 请认真填写。如果使用默认的 127.0.0.1 和 80，请运行以下命令安装 Nginx 并放行 80 端口：

```
yum install -y epel-release && yum install -y nginx
systemctl enable nginx; systemctl start nginx
firewall-cmd --permanent --add-service=http
firewall-cmd --reload

```

完成后打开浏览器输入域名，应该出现 Nginx 欢迎页。更换伪装网站页面只需上传文件到 `/usr/share/nginx/html` 目录即可。

2. `remote_addr` 和 `remote_port`也可以填其他 ip / 域名和端口。例如将所有请求转发到本站，`remote_addr` 填 tlanyan.me，`remote_port` 填 443。**做大死的行为**是 remote_addr 填 facebook/google/twitter 等敏感域名，GFW 过来一看可能就直接把你的 ip 安排得明明白白。

3. 如果 vps 网页后台有防火墙（阿里云 / 谷歌云 / aws 买的服务器），请记得放行相应端口。

到此服务端应该已经安装好并运行正常，接下来是配置客户端使用。

trojan windows 客户端使用教程
----------------------

本节以 windows 系统为例，讲解 trojan 客户端的配置和使用。

> 本文介绍 trojan 官方 windows 客户端的使用教程，配置较为麻烦，建议使用 clash，参考：[clash for windows 配置 trojan 教程](https://tlanyan.me/go.php?key=trojan-clash-win-config)

### 运行 trojan 客户端

首先 [下载 trojan 客户端](https://tlanyan.me/trojan-clients-download/)，解压压缩包，进入 trojan 文件夹。用记事本打开 `config.json` 文件，做如下修改：

[![](https://tlanyan.me/wp-content/uploads/2020/03/trojan客户端配置文件-1-1024x586.png)](https://tlanyan.me/trojan-tutorial/trojan%e5%ae%a2%e6%88%b7%e7%ab%af%e9%85%8d%e7%bd%ae%e6%96%87%e4%bb%b6-2/)trojan 客户端配置文件

> remote_addr 可以设置成 vps 的 ip，这时 verify 和 verify_hostname 需要设置成 false

改好后保存并关闭文件，双击文件夹内的 trojan.exe 文件，trojan 程序运行，出现如下黑窗口：

[![](https://tlanyan.me/wp-content/uploads/2020/03/trojan运行窗口.png)](https://tlanyan.me/trojan-tutorial/trojan%e8%bf%90%e8%a1%8c%e7%aa%97%e5%8f%a3/)trojan 运行窗口

> 如果无法运行，先双击 “VC_redist.x86.exe” 安装依赖，然后再运行。

与 SS/SSR/v2ray 等客户端不同，trojan 运行出现上述界面后，浏览器无法直接上外网，需要进行额外的设置。本文介绍两种方式：1. 设置系统代理；2. 借助 v2rayN。

### 设置系统代理上网

1. 打开 windows 设置 -> 网络和 Internet -> 代理，出现如下界面：

[![](https://tlanyan.me/wp-content/uploads/2020/03/windows系统代理设置-1024x703.png)](https://tlanyan.me/trojan-tutorial/windows%e7%b3%bb%e7%bb%9f%e4%bb%a3%e7%90%86%e8%ae%be%e7%bd%ae/)windows 系统代理设置

2. 设置 pac 方式上网（**推荐！**）：关闭 “自动检测设置”，打开“使用设置脚本”，在脚本地址一栏填入“https://tlanyan.me/trojan-pac.php?p = 端口号”（端口号改成电脑上 trojan 配置文件中的 local_port，例如 1080），然后点击” 保存”：

[![](https://tlanyan.me/wp-content/uploads/2020/03/windows设置pac.png)](https://tlanyan.me/trojan-tutorial/windows%e8%ae%be%e7%bd%aepac/)

3. 如果你需要全局代理模式，请这样设置：关闭 “自动检测设置” 和“使用设置脚本”，打开“使用代理服务器”，地址填入 127.0.0.1，端口填入 trojan 配置文件中的 local_port，下面一栏填入以下内容：

```
localhost;127.*;10.*;172.16.*;172.17.*;172.18.*;172.19.*;172.20.*;172.21.*;172.22.*;172.23.*;172.24.*;172.25.*;172.26.*;172.27.*;172.28.*;172.29.*;172.30.*;172.31.*;172.32.*;192.168.*

```

[![](https://tlanyan.me/wp-content/uploads/2020/03/windows系统设置全局代理.png)](https://tlanyan.me/trojan-tutorial/windows%e7%b3%bb%e7%bb%9f%e8%ae%be%e7%bd%ae%e5%85%a8%e5%b1%80%e4%bb%a3%e7%90%86/)windows 系统设置全局代理

然后点击保存。

无论哪种方式，配置正确的话都能上外网。

### 借助 v2rayN 上网

设置系统代理方式不能方便的切换 pac 和全局模式，本节介绍使用 v2rayN 客户端达到灵活上外网。

1. 从 [v2ray 客户端](https://tlanyan.me/v2ray-clients-download/) 下载 v2rayN，解压进入 v2rayN-Core 文件夹。双击文件夹内的 v2rayN.exe 启动，在桌面右下角找到 v2rayN 的图标（logo 是 V），双击打开配置界面，按下图添加 socks5 服务器：

[![](https://tlanyan.me/wp-content/uploads/2020/03/v2rayN添加socks服务器.png)](https://tlanyan.me/trojan-tutorial/v2rayn%e6%b7%bb%e5%8a%a0socks%e6%9c%8d%e5%8a%a1%e5%99%a8/)v2rayN 添加 socks 服务器

2. 弹出来的配置界面分别填入 127.0.0.1 和设置的端口，别名随便填一个，比如 trojan，然后点击保存：

[![](https://tlanyan.me/wp-content/uploads/2020/03/v2rayN设置服务器信息.png)](https://tlanyan.me/trojan-tutorial/v2rayn%e8%ae%be%e7%bd%ae%e6%9c%8d%e5%8a%a1%e5%99%a8%e4%bf%a1%e6%81%af/)v2rayN 设置服务器信息

3. 右下角找到 v2rayN 图标，点右键，在”Http 代理” 中选择 PAC 模式或者全局模式：

[![](https://tlanyan.me/wp-content/uploads/2020/03/v2rayN切换代理模式.png)](https://tlanyan.me/trojan-tutorial/v2rayn%e5%88%87%e6%8d%a2%e4%bb%a3%e7%90%86%e6%a8%a1%e5%bc%8f/)v2rayN 切换代理模式

接下来，就可以愉快的上外网了。

其他事项
----

1. 可以用 SwitchOmega 等插件、浏览器设置代理等方式达到同样效果；

2. v2rayN 界面的服务器列表栏点右键可以测试延迟，设置活动服务器等。

本教程到此结束，如有问题请留言。

参考
--

1.[V2ray 教程](https://tlanyan.me/v2ray-tutorial/)

2. [trojan – An unidentifiable mechanism that helps you bypass GFW.](https://trojan-gfw.github.io/trojan/overview)

3. [网络上的 HTTPS 加密](https://transparencyreport.google.com/https/overview)