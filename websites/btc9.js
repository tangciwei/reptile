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
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/4.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Cookie': 'PHPSESSID=58ou7ekqma56dmjnptggkd6824; UM_distinctid=15dadda0c331df-0735f735f11b29-30667808-13c680-15dadda0c349ba; CNZZDATA1258868758=1150427937-1501855660-https%253A%252F%252Fbtc9.com%252F%7C1501855660'
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
