/* globals Docute */

new Docute({
    layout: 'left',
    target: '#docute',
    sourcePath: './docs/',
    nav: [{
            title: 'Home',
            link: '/README'
        },
        {
            title: 'About',
            link: '/about'
        }
    ],
    detectSystemDarkTheme: true,
    darkThemeToggler: true,
    highlight: ['java'],
    /* 导航栏 */
    sidebar: [{
            /*第一组*/

            title: '常用协议简介',
            children: [{
                title: 'Shadowsocks(R)',
                link: '/part1/shadowsocks'
            }, {
                title: 'V2Ray',
                link: '/part1/v2ray'
            }, {
                title: 'Trojan',
                link: '/part1/trojan'
            }, ]
        }, /*开始*/ {

            title: '客户端使用教程',
            children: [{
                title: 'Windows SSR',
                link: '/part2/windows'
            }]
        },

    ],
})