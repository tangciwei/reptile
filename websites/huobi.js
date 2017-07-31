const util = require('../util');
const cheerio = require('cheerio');
let url = 'https://www.huobi.com/p/content/notice';
let baseUrl = 'https://www.huobi.com';

module.exports = {
    async get() {
        let html = await util.get({
            url
        });
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        let list = $('.main_wrap>ul li');
        let target = $(list[0]).find('.tit a');
        let href = baseUrl + $(target).attr('href');
        let title = $(target).text();
        let time = $(list[0]).find('span').text();
        return {href, title, time};
    }
};
