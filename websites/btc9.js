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
                // 'Cookie': 'UM_distinctid=15c6cdb56ad4a0-090501aaccb291-30627509-13c680-15c6cdb56aeb7a; PHPSESSID=qjcrrc2809isrflig1jontuov0; keycookie=9cf8a7cf6d; expirecookie=1501842590; preurl=/; captchaNum=9243; captchaKey=415f09d5a3; captchaExpire=1501866412; CNZZDATA1258868758=46968657-1497749673-null%7C1501865176'
                'Cookie': 'UM_distinctid=15c6cdb56ad4a0-090501aaccb291-30627509-13c680-15c6cdb56aeb7a; PHPSESSID=qjcrrc2809isrflig1jontuov0; keycookie=9cf8a7cf6d; expirecookie=1501842590; CNZZDATA1258868758=46968657-1497749673-null%7C1501858118; preurl=/; captchaNum=9243; captchaKey=415f09d5a3; captchaExpire=1501866412'
                // 'Cookie': 'PHPSESSID=58ou7ekqma56dmjnptggkd6824; UM_distinctid=15dadda0c331df-0735f735f11b29-30667808-13c680-15dadda0c349ba; CNZZDATA1258868758=1150427937-1501855660-https%253A%252F%252Fbtc9.com%252F%7C1501855660'
            }
        });
        console.log(html)
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
// 二维码
// https://btc9.com/get-captcha.do
// 提交
