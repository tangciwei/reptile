let common = require('../common');
let url = 'https://www.jubi.com/gonggao/';
let baseUrl = 'https://www.jubi.com';

module.exports = {
    async get() {
        let {$, html} = await common.get(url);
        let list = $(html).find('.new_list ul li');
        let first = $(list[0]).find('a');
        let href = baseUrl + first.attr('href');
        let title = first.text();

        return {href, title};
    }
};
