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

fis.match('{' + ignoreList + '}', {
        release: false
    })
    .match('**.js', {
        parser: [
            fis.plugin('babel-5.x', {
                optional: ['es7.decorators', 'es7.classProperties']
            })
        ]
    });
