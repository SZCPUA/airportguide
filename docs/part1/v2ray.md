# V2Ray

> This article is from [Wikipedia](https://zh.wikipedia.org/wiki/V2Ray).

## 简介

**V2Ray**(简称 **V2**)，是 Victoria Raymond 开发的 **Project V** 下的一个工具。Project V 是一个工具集合，它可以帮助你打造专属的基础通信网络。Project V 的核心工具称为 V2Ray，其主要负责网络协议和功能的实现，与其它 Project V 通信。V2Ray 可以单独运行，也可以和其它工具配合，以提供简便的操作流程。开发过程主要使用 [Go 语言](/wiki/Go%E8%AF%AD%E8%A8%80 "Go语言")，Core 采用 [MIT 许可协议](/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89 "MIT许可证")授权并开放源代码。


在中国大陆，本工具广泛用于突破[防火长城](/wiki/%E9%98%B2%E7%81%AB%E9%95%BF%E5%9F%8E "防火长城")（GFW），以访问被封锁和屏蔽的内容。

运行原理
----

V2Ray 的运行原理与其他代理工具 [[2]](#cite_note-2) 基本相同，使用特定的中转服务器完成数据传输。例如，用户无法直接访问 Google，YouTube 等网站，但代理服务器可以访问，且用户可以直接连接代理服务器，那么用户就可以通过特定软件连接代理服务器，然后由代理服务器获取网站内容并回传给用户，从而实现代理上网的效果。服务器和客户端软件会要求提供密码和加密方式，双方一致后才能成功连接。连接到服务器后，客户端会在本机构建一个本地 Socks5 代理（或 VPN、透明代理等）。浏览网络时，客户端通过这个 Socks5（或其他形式）代理收集网络流量，然后再经混淆加密发送到服务器端，以防网络流量被识别和拦截，反之亦然。其他代理工具定位只是一个简单的代理工具，而 V2Ray 定位为一个平台，任何开发者都可以利用 V2Ray 提供的模块开发出新的代理软件。

主要特性
----

多入口多出口：一个 V2Ray 进程可并发支持多个入站和出站协议，每个协议可独立工作。

定制化路由：入站流量可按配置由不同地出口发出。轻松实现按区域或按域名分流，以达到最优的网络性能。

多协议支持：V2Ray 可同时开启多个协议支持，包括 Socks、HTTP、Shadowsocks 和 VMess 等。每个协议可单独设置传输载体，比如 TCP、mKCP 和 WebSocket 等。

隐蔽性：V2Ray 的节点可以伪装成正常的网站（HTTPS），将其流量与正常的网页流量混淆，以避开第三方干扰。

反向代理：通用的反向代理支持，可实现内网穿透功能。

多平台支持：原生支持所有常见平台，如 Windows、macOS 和 Linux，并已有第三方支持移动平台。

历史事件
----

### 专利事件

[北京理工大学](/wiki/%E5%8C%97%E4%BA%AC%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%B8 "北京理工大学")教授罗森林和两名学生王帅鹏、潘丽敏，于 2019 年 3 月 25 日申请名为 “基于长短期记忆网络的 V2ray 流量识别方法” 的专利。2019 年 10 月 25 日，该专利的法律状态修改为“发明专利申请公布后的撤回”。[[3]](#cite_note-3)

V2Ray 项目组表示，专利并不会保证方法的有效性，专利仅仅是保护方法本身。其次，该专利的描述存在一些问题。专利中提到：“V2ray 服务端与客户端进行每次通信时需要预先交换密钥，因而每次通信较为靠前的数据包具有显著特征”。实际上，VMess 协议并不存在 “预先交换密钥” 这个步骤。即使将 V2Ray 与需要进行 “预先交换密钥” 的协议配合使用，那么进行 “预先交换密钥” 时的数据包也不会有 V2Ray 的数据特征，因为此时还没有开始发送有效数据，即使有特征也是配合使用的协议的特征。2. 专利中将 V2Ray 拼写成了 V2ray。[[4]](#cite_note-4)

### 原作者失踪

2019 年 2 月，V2Ray 项目创始人 Victoria Raymond 突然消失，其 Twitter[[5]](#cite_note-5)、Telegram[[6]](#cite_note-6) 以及知乎 [[7]](#cite_note-7) 全部停止更新。

随后开源社区进行重组成立 V2Fly 社区，并于 2019 年 6 月 2 日表示：“由于原开发者长期不上线，其他维护者没有完整权限。为了方便维护，我们创建了新的 organization：[https://github.com/v2fly](https://github.com/v2fly) 原 organization 中的仓库：[v2ray/v2ray-core](https://github.com/v2ray/v2ray-core) 将会一直同步更新。”[[8]](#cite_note-8)

2019 年 8 月 2 日，原作者 Victoria Raymond 的 Telegram 频道提示：“创建此频道的用户的帐户在过去 5 个月中处于非活动状态。如果它在接下来的 30 天内仍然不活动，那么该账户将自动销毁，并且这个频道将不再拥有创建者。”[[9]](#cite_note-9)

但是，原作者的 Github 账号依然保持更新直到 2019 年 11 月最后一次提交 commits。

### 衍生项目

#### Project X

2020 年 11 月，因为开源许可证等原因 XTLS 被 V2Ray 拒绝合并，一些开发者基于 V2Ray 另行组建了 [Project X 组织](https://github.com/XTLS)。

参考文献
----

1.  **[^](#cite_ref-1 "跳转")** [VictoriaRaymond](https://github.com/VictoriaRaymond). GitHub （英语）. 
2.  **[^](#cite_ref-2 "跳转")** [V2Ray 跟 Shadowsocks 有什么区别？](https://toutyrater.github.io/#v2ray-%E8%B7%9F-shadowsocks-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F). [2020-08-29]. （原始内容[存档](https://web.archive.org/web/20200911135854/https://toutyrater.github.io/#v2ray-%E8%B7%9F-shadowsocks-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)于 2020-09-11）. 
3.  **[^](#cite_ref-3 "跳转")** [基于长短期记忆网络的 V2ray 流量识别方法](https://www.zhangqiaokeyan.com/patent-detail/06120101065187.html). www.zhangqiaokeyan.com （中文）. 
4.  **[^](#cite_ref-4 "跳转")** [V2Fly 项目组 官方 Telegram 频道](https://t.me/v2fly/18). Telegram. 
5.  **[^](#cite_ref-5 "跳转")** [Victoria Raymond 的 Twitter](https://twitter.com/projectv2ray). Twitter. 
6.  **[^](#cite_ref-6 "跳转")** [Project V 官方公告](https://t.me/v2msg). Telegram. 
7.  **[^](#cite_ref-7 "跳转")** [Victoria Raymond](https://www.zhihu.com/people/victoriaraymond). www.zhihu.com. [2020-12-22]. 
8.  **[^](#cite_ref-8 "跳转")** [V2Fly - Notification and Updates, V2Ray the second new](https://t.me/v2fly/14). Telegram. 
9.  **[^](#cite_ref-9 "跳转")** [Project V 官方公告](https://t.me/v2msg/131). Telegram. 

