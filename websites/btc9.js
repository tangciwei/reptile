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
                'Cookie': 'PHPSESSID=fu0ukpahvgvrjn5rg83ige3ll7; UM_distinctid=15dad56a4e4402-0aa016bfc0cb2-30667808-13c680-15dad56a4e562c; CNZZDATA1258868758=921587905-1501847318-%7C1501847318'
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
