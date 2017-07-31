/**
 * @file FIS 配置
 * @author
 */

fis.config.set('namespace', 'reptile');
var ignoreList = [
    '*.{md, sh, idea, DS_Store}',
    'fis-conf.js',
    'package.json',
    'package-lock.json',
    '.git/**'
].join(',');
var es6List = [
    '**.js',
    ''
];
fis.match('{' + ignoreList + '}', {
        release: false
    })
    .match('{' + es6List + '}', {
        parser: [
            fis.plugin('babel-6.x', {
                plugins: [
                    'async-to-promises',
                    'array-includes'
                ]
            })
        ]
    })
