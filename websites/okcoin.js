const util = require('../util');
const cheerio = require('cheerio');
let url = 'https://www.okcoin.cn/service.html';
let baseUrl = 'https://www.okcoin.cn';

module.exports = {
    async get() {
        let html = await util.get({
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Cookie': 'coin_session_id_o=64e9030c-e15b-4cfd-a6f0-af8b11747a5dwGSC; JSESSIONID=CFD4783F84323AA0E8D53F260BCB32FA; Hm_lvt_5244adb4ce18f1d626ffc94627dd9fd7=1501433010; Hm_lpvt_5244adb4ce18f1d626ffc94627dd9fd7=1501433010; locale=zh_CN; perm=42A6147D970749CD7ADFBB712B66855E; lp="https://www.okcoin.cn/service.html"; language=0'
            }
        });
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        let list = $('.newDynamic .newsList li');
        let target = $(list[0]).find('.spanOne a');
        let href = $(target).attr('href');
        let title = $(target).text();
        let time = $(list[0]).find('.spanTwo').text();

        return {href, title, time};
    }
};
