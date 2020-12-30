# Shadowsocks

> This article is from [Wikipedia](https://zh.wikipedia.org/wiki/Shadowsocks).

## 简介

**Shadowsocks**（简称 **SS**）是一种基于 [Socks5](/wiki/SOCKS#SOCK5 "SOCKS") 代理方式的加密传输协议，也可以指实现这个协议的各种开发包。目前包使用 [Python](/wiki/Python "Python")、[C](/wiki/C%E8%AA%9E%E8%A8%80 "C语言")、[C++](/wiki/C%2B%2B "C++")、[C#](/wiki/C%E2%99%AF "C♯")、[Go 语言](/wiki/Go%E8%AF%AD%E8%A8%80 "Go语言")、[Rust](/wiki/Rust "Rust") 等编程语言开发，大部分主要实现（[iOS](/wiki/IOS "IOS") 平台的除外）采用 [Apache 许可证](/wiki/Apache%E8%AE%B8%E5%8F%AF%E8%AF%81 "Apache许可证")、[GPL](/wiki/GPL "GPL")、[MIT 许可证](/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89 "MIT许可证")等多种[自由软件](/wiki/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94 "自由软件")许可协议[开放源代码](/wiki/%E9%96%8B%E6%94%BE%E5%8E%9F%E5%A7%8B%E7%A2%BC "开放源代码")。Shadowsocks 分为服务器端和客户端，在使用之前，需要先将服务器端程序部署到服务器上面，然后通过客户端连接并创建本地代理。

在中国大陆，本工具广泛用于突破[防火长城](/wiki/%E9%98%B2%E7%81%AB%E9%95%BF%E5%9F%8E "防火长城")（GFW），以浏览被封锁、遮蔽或干扰的内容。2015 年 8 月 22 日，Shadowsocks 原作者 Clowwindy 称受到了[中华人民共和国政府的压力](/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E7%BD%91%E7%BB%9C%E5%AE%A1%E6%9F%A5 "中华人民共和国网络审查")，宣布停止维护此计划（项目）并移除其个人页面所存储的源代码 [[4]](#cite_note-4)[[5]](#cite_note-effchinacoder-5)。

为了避免[关键词过滤](/wiki/%E5%85%B3%E9%94%AE%E8%AF%8D%E8%BF%87%E6%BB%A4 "关键词过滤")，网民会根据[谐音](/wiki/%E8%AB%A7%E9%9F%B3_(%E8%AA%9E%E8%A8%80%E5%AD%B8) "谐音 (语言学)")将 ShadowsocksR 称为 “酸酸乳”[[注 1]](#cite_note-6)（SSR），将 Shadowsocks 称为 “酸酸”（SS）。另外 Shadowsocks 的标志为纸飞机，而专门提供 Shadowsocks 或类似软件（如 V2Ray）服务器的网站也被称为 “机场”。

运行原理
----

Shadowsocks 的运行原理与其他代理工具基本相同，使用特定的中转服务器完成数据传输。例如，用户无法直接访问 [Google](/wiki/Google "Google")，但代理服务器可以访问，且用户可以直接连接代理服务器，那么用户就可以通过特定软件连接代理服务器，然后由代理服务器获取网站内容并回传给用户，从而实现代理上网的效果。服务器和客户端软件会要求提供密码和加密方式，双方一致后才能成功连接。连接到服务器后，客户端会在本机构建一个本地 Socks5 代理（或 VPN、透明代理等）。浏览网络时，客户端通过这个 Socks5（或其他形式）代理收集网络流量，然后再经混淆加密发送到服务器端，以防网络流量被识别和拦截，反之亦然。

### 特点

*   Shadowsocks 使用自行设计的协议进行加密通信。[[6]](#cite_note-7) 加密算法有 [AES](/wiki/%E9%AB%98%E7%BA%A7%E5%8A%A0%E5%AF%86%E6%A0%87%E5%87%86 "高级加密标准")、[Blowfish](/wiki/Blowfish_(%E5%AF%86%E7%A0%81%E5%AD%A6) "Blowfish (密码学)")、[ChaCha20](/wiki/ChaCha20 "ChaCha20")、[RC4](/wiki/RC4 "RC4") 等，除创建 [TCP](/wiki/%E4%BC%A0%E8%BE%93%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE "传输控制协议") 连接外无需[握手](/wiki/%E6%8F%A1%E6%89%8B_(%E6%8A%80%E6%9C%AF) "握手 (技术)")，每次请求只转发一个连接，无需保持 “一直连线” 的状态，因此在移动设备上相对较为省电。
*   所有的流量都经过算法加密，允许自行选择算法。
*   Shadowsocks 通过[异步 I/O](/wiki/%E5%BC%82%E6%AD%A5I/O "异步I/O") 和[事件驱动程序](/wiki/%E4%BA%8B%E4%BB%B6%E9%A9%85%E5%8B%95%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88 "事件驱动程序设计")运行，响应速度快。
*   客户端覆盖多个主流操作系统和平台，包括 [Windows](/wiki/Windows "Windows")、[macOS](/wiki/MacOS "MacOS")、[Android](/wiki/Android "Android")、[Linux](/wiki/Linux "Linux") 和 [iOS](/wiki/IOS "IOS") 系统和路由器（OpenWrt）等 [[7]](#cite_note-8)。

### 安全性及加密方式的改进

Shadowsocks 的最初设计目的只是为了绕过 GFW，而不是提供密码学意义的安全，所以 Shadowsocks 自行设计的加密协议对双方的身份验证仅限于[预共享密钥](/w/index.php?title=%E9%A2%84%E5%85%B1%E4%BA%AB%E5%AF%86%E9%92%A5&action=edit&redlink=1)（英语：[Pre-shared key](https://en.wikipedia.org/wiki/Pre-shared_key "en:Pre-shared key")），亦无[完全前向保密](/wiki/%E5%AE%8C%E5%85%A8%E5%89%8D%E5%90%91%E4%BF%9D%E5%AF%86 "完全前向保密")，也未曾有安全专家公开分析或评估协议及其实现。如果是在监听类型的国家内想更加安全的上网，基本上 Shadowsocks 功能不够完善，应该使用隐密性更高的工具。[[8]](#cite_note-9)[[需要非第一手来源](/wiki/Wikipedia:PSTS "Wikipedia:PSTS")]

Shadowsocks 本质上只是设置了密码的[网络代理](/wiki/%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8 "代理服务器")协议，不能替代 [TLS](/wiki/TLS "TLS") 或者 [VPN](/wiki/VPN "VPN")，不能用作[匿名](/wiki/%E5%8C%BF%E5%90%8D "匿名")通信方案，该协议的目标不在于提供完整的通信安全机制，主要是为了协助上网用户在[严苛的网络环境中](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E5%AE%A1%E6%9F%A5 "互联网审查")突破封锁。不过，在匿名通信能够被识别或封锁的情况下，也可将 Shadowsocks 与其他匿名方案配合使用（例如 [Tor](/wiki/Tor "Tor")），同时满足突破封锁和匿名的需求。

在某些极端的环境下，通过[深度包检测](/wiki/%E6%B7%B1%E5%BA%A6%E5%8C%85%E6%A3%80%E6%B5%8B "深度包检测")（DPI）也有可能识别出协议特征。2017 年 9 月 21 日，一篇名为《The Random Forest based Detection of Shadowsock's Traffic》的论文在 [IEEE](/wiki/IEEE "IEEE") 发表，该论文介绍了通过随机森林算法检测 Shadowsocks 流量的方法，并自称可达到 85％的检测精度 [[9]](#cite_note-10)，虽然该论文的有效性遭到网友质疑 [[10]](#cite_note-11)，但[机器学习](/wiki/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0 "机器学习")配合 GFW 已经实现的深度数据包检测来识别网络流量特征的做法是实际可行的，而且还适用于任何网络代理协议而不仅仅局限于 Shadowsocks。[[11]](#cite_note-12) 为了确保安全，Shadowsocks 加入 [AEAD](/wiki/%E8%AE%A4%E8%AF%81%E5%8A%A0%E5%AF%86 "认证加密") 加密方式（AES-[GCM](/wiki/%E8%A8%8A%E6%81%AF%E9%91%91%E5%88%A5%E7%A2%BC "消息认证码")、[Chacha20-poly1305](/wiki/Poly1305 "Poly1305")），取代之前 AES CFB、AES CTR、[RC4](/wiki/RC4 "RC4")、[Chacha20](/wiki/Salsa20 "Salsa20") 等没有认证的加密。

### 实现

目前 Shadowsocks 有多个实现支持，以自由软件形式发布的主要有原始 Shadowsocks（以 Python 语言编写）、Shadowsocks-libev（分支项目 openwrt-Shadowsocks）、Shadowsocks-rust、Shadowsocks-go/go-Shadowsocks2、libQtShadowsocks、Shadowsocks-qt5（仅作为客户端）、Shadowsocks-android（仅作为客户端）、Shadowsocks-windows（仅作为客户端）、ShadowsocksX-NG（仅作为客户端）、Shadowsocks-R、Outline[[12]](#cite_note-13)、V2Ray[[13]](#cite_note-14)、Brook[[14]](#cite_note-15)、Trojan[[15]](#cite_note-16) 等等，还有为数甚多的免费软件及专有软件。

### 插件及流量混淆

Shadowsocks 在 [SIP003 提案](https://shadowsocks.org/en/spec/Plugin.html)（[页面存档备份](//web.archive.org/web/20191017214806/https://shadowsocks.org/en/spec/Plugin.html)，存于[互联网档案馆](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86 "互联网档案馆")）中支持了插件系统，插件系统让 Shadowsocks 的流量可以通过不同的插件进行二次混淆加密。目前使用较多的插件有 [simple-obfs](https://github.com/shadowsocks/simple-obfs)（[页面存档备份](//web.archive.org/web/20190827005506/https://github.com/shadowsocks/simple-obfs)，存于[互联网档案馆](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86 "互联网档案馆")）、[v2ray-plugin](https://github.com/shadowsocks/v2ray-plugin)（[页面存档备份](//web.archive.org/web/20190827005631/https://github.com/shadowsocks/v2ray-plugin)，存于[互联网档案馆](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86 "互联网档案馆")）。通过插件对 Shadowsocks 进行流量混淆后，通常可以降低被 [GFW](/wiki/GFW "GFW") 识别出来的几率，从而达到更稳定地突破网络封锁的目的。

项目转手
----

2015 年 8 月 22 日，其作者 Clowwindy 在 GitHub 上称，警察在两日前要求他停止开发 Shadowsocks 项目并删除其所有代码。[[16]](#cite_note-17) 之后，作者停止维护 Shadowsocks，其 [GitHub](/wiki/GitHub "GitHub") 项目页面已被清空。[[17]](#cite_note-18)[[18]](#cite_note-19) 消息传出后，许多中国大陆和外国开发商，以及 Shadowsocks 用户，在 GitHub 中对作者表示了致谢，对已清空源代码的项目页面加星标，因此在当时 Shadowsocks 成为了 GitHub 上的热门项目（Trending）。[[19]](#cite_note-20) 但另有消息，原作者曾作出的据称 “透露中国社会现状” 的发言可能遭到某些中华人民共和国政府支持者的检举，从而为后来被要求撤下项目源代码的事件埋下伏笔，而类似的因个人网络发言而被检举的事件在中国大陆也“时有发生”。[[20]](#cite_note-21)

8 月 25 日，另一个用于突破网络审查的 [GoAgent](/wiki/GoAgent "GoAgent") 项目也被作者自行删除。删除后几小时之内，[GitHub](/wiki/GitHub "GitHub") 遭到了来自中国大陆的 [DDoS](/wiki/DDoS "DDoS") 攻击。据报这次攻击与中华人民共和国政府有关，因为当局此前曾要求 Github 移除两个反对网络审查的项目但没有被接受。[[21]](#cite_note-22)

2015 年 8 月 28 日，[电子前哨基金会](/wiki/%E7%94%B5%E5%AD%90%E5%89%8D%E5%93%A8%E5%9F%BA%E9%87%91%E4%BC%9A "电子前哨基金会")针对 Shadowsocks 和 GoAgent 被删除一事发表评论，对中华人民共和国政府针对翻墙软件作者的打击表示 “强烈谴责”。[[5]](#cite_note-effchinacoder-5)

尽管如此，[Git](/wiki/Git "Git") 仓库的日志显示该项目被移除以前就有大量的复刻副本，不少副本仍然有用户维护。Shadowsocks 项目页本身也陆续恢复了内容，并转交由多人维护，各大 [Linux 包](/wiki/Linux%E5%A5%97%E4%BB%B6 "Linux包")的软件仓库均有各式 Shadowsocks 的实现的包仍持续更新可用，目前的 Shadowsocks 更新基本上来自这些匿名作者运行。

ShadowsocksR
------------

ShadowsocksR（简称 SSR）是网名为 breakwa11 的用户发起的 Shadowsocks 分支，在 Shadowsocks 的基础上增加了一些资料混淆方式，称修复了部分安全问题并可以提高 [QoS](/wiki/QoS "QoS") 优先级。[[22]](#cite_note-23) 后来贡献者 Librehat 也为 Shadowsocks 补上了一些此类特性，[[23]](#cite_note-ssr-sec-gpl-24) 甚至增加了类似 [Tor](/wiki/Tor "Tor") 的可插拔传输层功能。[[24]](#cite_note-25)

ShadowsocksR 开始时曾有过违反 [GPL](/wiki/GNU%E9%80%9A%E7%94%A8%E5%85%AC%E5%85%B1%E8%AE%B8%E5%8F%AF%E8%AF%81 "GNU通用公共许可证")、发放二进制时不发放源码的争议，使得原开发作者不满 [[25]](#cite_note-ssr-gpl-26)。不过后来 ShadowsocksR 项目由 breakwa11 转为了与 Shadowsocks 相同的 GPL、Apache 许可证、MIT 许可证等多重自由软件许可协议。

2017 年 7 月 19 日，ShadowsocksR 作者 breakwa11 在 Telegram 频道 ShadowsocksR news 里转发了深圳市启用 SS 协议检测的消息并被大量用户转发，引发恐慌 [[26]](#cite_note-27)。7 月 24 日，breakwa11 发布了闭源的 SS 被动检测程序，引发争议 [[27]](#cite_note-28)。7 月 27 日，breakwa11 遭到自称 “ESU.TV”（恶俗 TV）的不明身份人士人身攻击，对方宣称如果不停止开发并阻止用户讨论此事件将发布更多包含个人隐私的资料 [[28]](#cite_note-29)，随后 breakwa11 表示遭到对方人肉搜索并公开个人资料的是无关人士，为了防止对方继续伤害无关人士，breakwa11 将删除 GitHub 上的所有代码、解散相关交流群组，停止 ShadowsocksR 项目。但项目已被多人 fork，并有人在其基础上继续发布新的版本，例如较为知名的 [SSRR](https://github.com/shadowsocksrr) [页面存档备份](//web.archive.org/web/20180816160703/https://github.com/shadowsocksrr)，存于[互联网档案馆](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86 "互联网档案馆")（ShadowsocksRR）。

参考资料
----

1.  **[^](#cite_ref-1 "跳转")** [发一个自用了一年多的翻墙工具 Shadowsocks](https://web.archive.org/web/20120422191812/http://www.v2ex.com/t/32777). web.archive.org. [2016-12-15]. （[原始内容](https://www.v2ex.com/t/32777)存档于 2012-04-22）. 
2.  **[^](#cite_ref-2 "跳转")** [Shadowsocks 的前世后生](http://www.chinagfw.org/2016/08/shadowsocks_31.html). GFW BLOG. [2016-12-15]. （原始内容[存档](https://web.archive.org/web/20161220174919/http://www.chinagfw.org/2016/08/shadowsocks_31.html)于 2016-12-20）. 
3.  **[^](#cite_ref-Release_3-0 "跳转")** [shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows/releases). [2020-06-20]. 
4.  **[^](#cite_ref-4 "跳转")** [IT-eNews](http://www.itenews.com/itplus/开源翻墙软件shadowsocks作者宣布停止项目更新/). 2015-08-20 [2016-02-03]. （原始内容[存档](https://web.archive.org/web/20160203220427/http://www.itenews.com/itplus/%E5%BC%80%E6%BA%90%E7%BF%BB%E5%A2%99%E8%BD%AF%E4%BB%B6shadowsocks%E4%BD%9C%E8%80%85%E5%AE%A3%E5%B8%83%E5%81%9C%E6%AD%A2%E9%A1%B9%E7%9B%AE%E6%9B%B4%E6%96%B0/)于 2016-02-03）. 
5.  ^ [跳转至： **5.0**](#cite_ref-effchinacoder_5-0) [**5.1**](#cite_ref-effchinacoder_5-1) O'Brien, Danny. [Speech that Enables Speech: China Takes Aim at Its Coders](https://www.eff.org/deeplinks/2015/08/speech-enables-speech-china-takes-aim-its-coders). 电子前哨基金会. [2016-05-28]. （原始内容[存档](https://web.archive.org/web/20160624091157/https://www.eff.org/deeplinks/2015/08/speech-enables-speech-china-takes-aim-its-coders)于 2016-06-24） （英语）. （[中文翻译](https://zh.wikisource.org/wiki/Translation:Speech_that_Enables_Speech:_China_Takes_Aim_at_Its_Coders "s:Translation:Speech that Enables Speech: China Takes Aim at Its Coders")）
6.  **[^](#cite_ref-7 "跳转")** [Shadowsocks - spec](https://web.archive.org/web/20151204034044/https://shadowsocks.org/en/spec/protocol.html). [2015 年 12 月 11 日]. （[原始内容](https://Shadowsocks.org/en/spec/protocol.html)存档于 2015 年 12 月 4 日） （英语）. 
7.  **[^](#cite_ref-8 "跳转")** [Shadowsocks - Clients](http://Shadowsocks.org/en/download/clients.html). [2015-09-05]. （原始内容[存档](https://web.archive.org/web/20150904143216/http://shadowsocks.org/en/download/clients.html)于 2015-09-04） （英语）. 
8.  **[^](#cite_ref-9 "跳转")** [关于一些基本问题的讨论：Shadowsocks 有没有（以及要不要）提供密码学意义的安全？ · Issue #64 · shadowsocks/shadowsocks-org - GitHub](https://github.com/shadowsocks/shadowsocks-org/issues/64). [2018-12-26]. （原始内容[存档](https://web.archive.org/web/20180518173839/https://github.com/shadowsocks/shadowsocks-org/issues/64)于 2018-05-18）. 
9.  **[^](#cite_ref-10 "跳转")** Deng, Z.; Liu, Z.; Chen, Z.; Guo, Y. [The Random Forest Based Detection of Shadowsock's Traffic](http://ieeexplore.ieee.org/document/8048116/). 2017 9th International Conference on Intelligent Human-Machine Systems and Cybernetics (IHMSC). August 2017, **2**: 75–78 [2018-02-05]. [doi:10.1109/IHMSC.2017.132](https://dx.doi.org/10.1109%2FIHMSC.2017.132). （原始内容[存档](https://web.archive.org/web/20180206131453/http://ieeexplore.ieee.org/document/8048116/)于 2018-02-06）. 
10.  **[^](#cite_ref-11 "跳转")** [如何评价 2017 年 IHMSC 上发表的探测流量的论文？ - 知乎](https://www.zhihu.com/question/66531978). www.zhihu.com. [2018-02-05]. （原始内容[存档](https://web.archive.org/web/20180206073623/https://www.zhihu.com/question/66531978)于 2018-02-06） （中文）. 
11.  **[^](#cite_ref-12 "跳转")** VV, 特约撰稿人. [道高一尺，牆高一丈：互聯網封鎖是如何升級的｜端傳媒 Initium Media](https://theinitium.com/article/20150904-mainland-greatfirewall/). 端传媒 Initium Media. [2018-04-07]. （原始内容[存档](https://web.archive.org/web/20180628044051/https://theinitium.com/article/20150904-mainland-greatfirewall/)于 2018-06-28） （中文（香港）‎）. 
12.  **[^](#cite_ref-13 "跳转")** [Outline - Making it safer to break the news](https://getoutline.org/en/home). getoutline.org. [2018-04-06]. （原始内容[存档](https://web.archive.org/web/20180330124327/https://getoutline.org/en/home)于 2018-03-30） （英语）. 
13.  **[^](#cite_ref-14 "跳转")** [Shadowsocks · Project V 官方网站](https://v2ray.com/chapter_02/protocols/shadowsocks.html). v2ray.com. [2020-06-11]. （原始内容[存档](https://web.archive.org/web/20200611224009/https://v2ray.com/chapter_02/protocols/shadowsocks.html)于 2020-06-11）. 
14.  **[^](#cite_ref-15 "跳转")** [txthinking/brook](https://github.com/txthinking/brook). GitHub. [2018-06-05]. （原始内容[存档](https://web.archive.org/web/20180617100732/https://github.com/txthinking/brook)于 2018-06-17） （英语）. 
15.  **[^](#cite_ref-16 "跳转")** [trojan-tutor](https://trojan-tutor.github.io/index.html). trojan-tutor. [2020-07-06]. （原始内容[存档](https://web.archive.org/web/20200706041652/https://trojan-tutor.github.io/index.html)于 2020-07-06） （中文（中国大陆）‎）. 
16.  **[^](#cite_ref-17 "跳转")** clowwindy. [Adopting iOS 9 network extension points · Issue #124 · shadowsocks/shadowsocks-iOS](https://web.archive.org/web/20150822042959/https://github.com/shadowsocks/shadowsocks-iOS/issues/124#issuecomment-133630294). GitHub. [2015-08-22]. （[原始内容](https://github.com/shadowsocks/shadowsocks-iOS/issues/124#issuecomment-133630294)存档于 2015-08-22） （英语）. Two days ago the police came to me and wanted me to stop working on this. Today they asked me to delete all the code from GitHub. I have no choice but to obey. 
17.  **[^](#cite_ref-18 "跳转")** clowwindy. [remove · shadowsocks/shadowsocks@938bba3](https://github.com/shadowsocks/shadowsocks/commit/938bba32a4008bdde9c064dda6a0597987ddef54). GitHub. 2015-08-22 [2015-08-22]. （原始内容[存档](https://web.archive.org/web/20150822224155/https://github.com/shadowsocks/shadowsocks/commit/938bba32a4008bdde9c064dda6a0597987ddef54)于 2015-08-22）. 
18.  **[^](#cite_ref-19 "跳转")** clowwindy. [shadowsocks/shadowsocks](https://github.com/shadowsocks/shadowsocks). GitHub. 2015-08-22 [2015-08-22]. （原始内容[存档](https://web.archive.org/web/20150822142142/https://github.com/shadowsocks/shadowsocks)于 2015-08-22） （英语）. 
19.  **[^](#cite_ref-20 "跳转")** percy. [中国开发者被警察要求删除软件](https://zh.greatfire.org/blog/2015/aug/chinese-developers-forced-delete-softwares-police). 2015-08-26 [2016-01-16]. （原始内容[存档](https://web.archive.org/web/20151002154126/https://zh.greatfire.org/blog/2015/aug/chinese-developers-forced-delete-softwares-police)于 2015-10-02） （中文）. 
20.  **[^](#cite_ref-21 "跳转")** Vergil. [翻墙 = 犯法？从许东翻墙第一案说起](https://pao-pao.net/article/292). pao-pao.net. [2016-08-18]. （原始内容[存档](https://web.archive.org/web/20160808032902/https://pao-pao.net/article/292)于 2016-08-08）. （中文）
21.  **[^](#cite_ref-22 "跳转")** Catalin Cimpanu. [Recent GitHub DDOS Linked to Chinese Government and Two GitHub Projects](http://news.softpedia.com/news/recent-github-ddos-linked-to-chinese-government-and-two-github-projects-490405.shtml). Softpedia. 2015-08-29 [2016-01-16]. （原始内容[存档](https://web.archive.org/web/20160506081126/http://news.softpedia.com/news/recent-github-ddos-linked-to-chinese-government-and-two-github-projects-490405.shtml)于 2016-05-06） （英语）. 
22.  **[^](#cite_ref-23 "跳转")** [ShadowsocksR](https://web.archive.org/web/20170207153230/https://breakwa11.github.io/). breakwa11.github.io. [2017-03-24]. （[原始内容](https://breakwa11.github.io/)存档于 2017-02-07）. 
23.  **[^](#cite_ref-ssr-sec-gpl_24-0 "跳转")** Librehat. [关于 ShadowsocksR 和 Shadowsocks 的安全性 – Librehat 的部落格](https://www.librehat.com/about-shadowsocks-r-and-the-security-of-shadowsocks/). [2017-03-24]. （原始内容[存档](https://web.archive.org/web/20170325024638/https://www.librehat.com/about-shadowsocks-r-and-the-security-of-shadowsocks/)于 2017-03-25）. 
24.  **[^](#cite_ref-25 "跳转")** [Shadowsocks Plugin Spec](http://shadowsocks.org/en/spec/Plugin.html). shadowsocks.org. [2017-03-24]. （原始内容[存档](https://web.archive.org/web/20170325024513/http://shadowsocks.org/en/spec/Plugin.html)于 2017-03-25） （英语）. 
25.  **[^](#cite_ref-ssr-gpl_26-0 "跳转")** [奇文共赏，关于 ShadowsocksR 事件 – Xiaodu Blog](https://t.du9l.com/2015/08/qi-wen-gong-shang/). t.du9l.com. [2017-03-24]. （原始内容[存档](https://web.archive.org/web/20170325025333/https://t.du9l.com/2015/08/qi-wen-gong-shang/)于 2017-03-25） （中文（中国大陆）‎）. 
26.  **[^](#cite_ref-27 "跳转")** KPCN. [From Weibo, not veri. yet:"Confirmed Shenzhen has begun using Shadowsocks protocol inspection tool. SS users wb cut off broadband cntn"](https://www.reddit.com/r/China/comments/6ofsw6/from_weibo_not_veri_yetconfirmed_shenzhen_has/). Riddit. [2017-08-17]. （原始内容[存档](https://web.archive.org/web/20180816155030/https://www.reddit.com/r/China/comments/6ofsw6/from_weibo_not_veri_yetconfirmed_shenzhen_has/)于 2018-08-16）. 
27.  **[^](#cite_ref-28 "跳转")** breakwa11. [SS 被动检测 1.0 版 #868](https://github.com/breakwa11/shadowsocks-rss/issues/868). GitHub. [2017-06-24]. （原始内容[存档](https://web.archive.org/web/20170725120602/https://github.com/breakwa11/shadowsocks-rss/issues/868)于 2017-07-25）. 
28.  **[^](#cite_ref-29 "跳转")** CK、吴晶、瑞哲. [国内网络青年开发翻墙软件遭 “人肉” 威胁](https://www.rfa.org/mandarin/yataibaodao/meiti/ck-01252018100414.html). Radio Free Asia. 2018-01-25 [2019-03-31]. （原始内容[存档](https://web.archive.org/web/20190331151152/https://www.rfa.org/mandarin/yataibaodao/meiti/ck-01252018100414.html)于 2019-03-31）. 

注解
--

1.  **[^](#cite_ref-6 "跳转")** “酸酸乳” 原本指中国乳制品公司[蒙牛](/wiki/%E8%92%99%E7%89%9B "蒙牛")生产的含乳饮品。

外部链接
----

*   [Shadowsocks - A secure socks5 proxy](https://shadowsocks.org/en/) [页面存档备份](//web.archive.org/web/20150516151646/https://shadowsocks.org/en/)，存于[互联网档案馆](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86 "互联网档案馆")
*   [Shadowsocks 在 github 的主页](https://github.com/shadowsocks)[页面存档备份](//web.archive.org/web/20150601112349/https://github.com/shadowsocks)，存于[互联网档案馆](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86 "互联网档案馆")
*   [shadowsocks-windows 在 github 的下载页面](https://github.com/Shadowsocks/Shadowsocks-windows/releases)[页面存档备份](//web.archive.org/web/20190612050908/https://github.com/Shadowsocks/Shadowsocks-windows/releases)，存于[互联网档案馆](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86 "互联网档案馆")
*   [SSRR-Windows 在 github 的下载页面](https://github.com/Anankke/SSRR-Windows/releases)[页面存档备份](//web.archive.org/web/20190724123836/https://github.com/Anankke/SSRR-Windows/releases)，存于[互联网档案馆](/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86 "互联网档案馆")

<table><tbody><tr><td><img class="" src="http://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikibooks-logo.svg/40px-Wikibooks-logo.svg.png"></td><td><a href="/wiki/%E7%B6%AD%E5%9F%BA%E6%95%99%E7%A7%91%E6%9B%B8" title="维基教科书">维基教科书</a>中的相关电子教程：<b><a href="https://zh.wikibooks.org/wiki/Special:Search/Shadowsocks" title="b:Special:Search/Shadowsocks">Shadowsocks</a></b></td></tr></tbody></table>

