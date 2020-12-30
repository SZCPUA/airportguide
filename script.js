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

            title: '包和类',
            children: [{
                    title: '实例1',
                    link: '/part1/examples1'
                }, {
                    title: '斐波那契数列',
                    link: '/part1/fibonacci'
                }, {
                    title: '应用题',
                    link: '/part1/applications'
                }, {
                    title: 'Scanner的用法',
                    link: '/part1/input'
                },

            ]
        }, /*开始*/

    ],
})