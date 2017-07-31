const util = require('../util');
let S = require('string');

const cheerio = require('cheerio');
let url = 'https://www.yuanbao.com/news/';
let baseUrl = 'https://www.yuanbao.com';

module.exports = {
    async get() {
        let html = await util.get({
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Cookie': 'USER_UNI=4b5bfc47890506dc50dd80c6d99800a2; PHPSESSID=b7251c7295504dd60f080abe194c1dc6; __jsluid=84c284540534bc2d91d06f9e9adbc098; Hm_lvt_7ba7fad219b0db5b6c7b4e1b97aa31de=1501512998; Hm_lpvt_7ba7fad219b0db5b6c7b4e1b97aa31de=1501512998'
            }
        });
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        let list = $(html).find('#main #list li');
        let href = '';
        let title = '';
        let time = '';
        let lock = false;

        for (let i = 0; i < list.length; i++) {
            let a = $(list[i]).find('a');
            if (a.length > 0) {
                let style = $(a).attr('style');
                // 取第一个
                if (!style && !lock) {
                    href = baseUrl + $(a).attr('href');
                    time = $(a).find('span').text().trim();
                    title = S($(a).text()).collapseWhitespace().s;
                    title = S(title).replaceAll(time, '').s;
                    lock = true;
                    break;
                }
            }

        }
        return {href, title, time};
    }
};
