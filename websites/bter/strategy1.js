// 策略1，请求首页头部查看通知选项
let common = require('../../common');
const S = require('string');

let url = 'https://bter.com/';
let baseUrl = 'https://bter.com';

module.exports = {
    async get() {
        let {$, html} = await common.get(url);
        // 目标字符串
        let start = `$("#siteNoty").noty({`;
        let end = `type:`;
        let target = S(html).between(start, end).s;
        // 进一步筛选
        let target2 = S(target).between('<a', '>').s;
        let target3 = '<a  ' + target2 + '></a>';
        let href = baseUrl + $(target3).attr('href');
        return {
            href
        };
    }
};
