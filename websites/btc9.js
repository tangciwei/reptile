const util = require('../util');
let S = require('string');

const cheerio = require('cheerio');
let url = 'https://btc9.com/Art/index/id/1.html';
let baseUrl = 'https://btc9.com';

module.exports = {
    async get() {
        let html = await util.get({
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Cookie': 'PHPSESSID=2svdv1hlkfmval6a881t6cgcj2; UM_distinctid=15d9950c51810d-0bf38382276333-30667808-13c680-15d9950c5198cc; CNZZDATA1258868758=1514159728-1501513923-%7C1501513923'
            }
        });
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        let target = $(html).find('.article-main .list-group li')[0];
        let href = baseUrl + $(target).find('a').attr('href');
        let title = $(target).find('a').text().trim();
        let time = $(target).find('span').text().trim();

        return {href, title, time};
    }
};
