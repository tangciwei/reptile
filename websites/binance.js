const util = require('../util');
const cheerio = require('cheerio');
let url = 'https://binance.zendesk.com/hc/zh-cn/categories/115000056351-%E5%85%AC%E5%91%8A%E4%B8%AD%E5%BF%83';
let baseUrl = 'https://binance.zendesk.com';

module.exports = {
    async get() {
        let Cookie = `_zendesk_shared_session=-aGtnYkp1emRYL2Y3L3VMMVpDdTJ2U1kydkpWOGN5bXNnS00zYjZ4dnpJd2U3cDZ0UTlyUnpjZ1NXVFgvajJaQk5MSkV6WUlCMTE5RitvSXBLcHMrZy90S29TRjJ2d2ZoeUtTRTdxZC9tY3p3Vis0cTgrdEhyTDNFOFZ4NTRmY0ovY3NaRGlHSkt0U291OFFacWZteGRrRzU0VzdVRWRXN1A4ZFRMbjM2ejRKUVpuMzdVdkw1VzYzcmhRMytjYmVuNTRuL0gvOGVzblRyeDhnejQwb2UxQT09LS1CT0tZM2xWN3k5cXpTVFdLQWU5QlpBPT0%3D--9e498b230fb8e17213b7b0b456ef29dd0bae1d09; _zendesk_session=BAh7CkkiD3Nlc3Npb25faWQGOgZFVEkiJWJkMTY2M2Q4YTkzOTliMmYwOTcwMjk5NGFkMWYwNmE2BjsAVEkiDGFjY291bnQGOwBGaQOzkx1JIgpyb3V0ZQY7AEZpA26ZHEkiE3dhcmRlbi5tZXNzYWdlBjsAVHsASSIOaXNfbW9iaWxlBjsAVEY%3D--80c6e12a1924459f24089dbe798f18893b3a622e; __zlcmid=hogdlrutZWK2M8; _help_center_session=SzdublNQUS9LMERpL3hGWTViSTBkOThDbHd2cEF0aGRBS1UyQWx4ZXRrMDYyL0Q5NEdlbHYzSmMvT1NlSTc2ZkRKSW1raUYvSlNxMlA4UTB0YzhKZXNNaENuOWt0WmxEbDlpQThsb1llbDNJQzVhWUZWLzlNcCtPV2hONHNFRWJwZHpMZGJDYTdtMFJWbE8yUURWN3NBPT0tLUdyKzBoUWN6YlFXUGcrRDZxYTNsRlE9PQ%3D%3D--6a3c0767308740abbbad91c31337678d948bd9dd`;

        let html = await util.get({
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0',
                Cookie
            }
        });
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        let target = $(html).find('.category-container .section-tree .article-list li')[0];
        target = $(target);
        target = target.find('a');
        let href = baseUrl + target.attr('href');
        let title = target.text();
        return {href, title};
    }
};