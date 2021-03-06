const util = require('../util');
const cheerio = require('cheerio');
// let url = 'https://www.btcchina.com/exc/trade/cnybtc';
let url = 'https://www.btcchina.com/';
let baseUrl = 'https://www.btcchina.com';

module.exports = {
    async get() {
        let html = await util.get({
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0',
                'Cookie': 'coin_session_id_o=389b153e-d3a4-4870-9de3-ba70ac5f426fqgdS; first_ref="https://img.bafang.com/v_20170804003/okcoin/html/captcha.html?forward=%2Findex.do"; peoplecheck=9B81C74D5297B416932165B0D0E87DE2; language=0; JSESSIONID=DF7955373C4D69749703EF75F381C1EC; locale=zh_CN; perm=4511857B0186534D0D764603A448AB13; lp="https://www.okcoin.cn/index.do"; ref="https://www.okcoin.cn/index.do"; Hm_lvt_5244adb4ce18f1d626ffc94627dd9fd7=1501841205; Hm_lpvt_5244adb4ce18f1d626ffc94627dd9fd7=1501841207'
            }
        });
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        let href = 'https://www.btcchina.com';
        if (html.indexOf('btm') !== -1
            || html.indexOf('BTM') !== -1
            || html.indexOf('BTS') !== -1
            || html.indexOf('bts') !== -1
            || html.indexOf('QTUM') !== -1
            || html.indexOf('qtum') !== -1) {
            href = 'https://www.btcchina.com/';
        }

        return {
            href
        };
    }
};
