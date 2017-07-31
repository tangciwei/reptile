const https = require('https');
let u = require('underscore');
let qs = require('querystring');
const {URL} = require('url');

module.exports = {
    // 针对回调函数封装成promise
    myPromisify(fn) {
        return function () {
            let argu = [...arguments];
            return new Promise((resolve, reject) => {
                fn(...argu, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        };
    },
    decode(str) {
        return decodeURIComponent(unescape(unescape(str)));
    },
    postRaw({options, data}, callback) {
        let content = qs.stringify(data);
        let req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                callback(null, chunks);
            });
        });

        req.on('error', function (e) {
            callback(e);
            console.log('problem with request: ' + e.message);
        });
        req.write(content);
        req.end();
    },
    // post请求
    async post() {
        let argu = [...arguments];
        return await this.myPromisify(this.postRaw)(...argu);
    },
    async get({url, headers={}}) {
        return await this.myPromisify(this.rawGet)({url, headers});
    },
    rawGet(option, callback) {
        let {url, headers={}} = option;
        const myURL = new URL(url);
        let {hostname, pathname} = myURL;

        let options = {
            hostname,
            path: pathname,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Cookie': 'Domain=huobi.com; Domain=huobi.com; __jsluid=05a77ba846e5cc1d59d55fc70726c09a; login_email_or_phone=18500909025; trade_pwd_on=0; non_advert_referer=https%3A%2F%2Fwww.google.com%2F; HUOBIMEIBISESSID=default_e375d49e7db8633ffef9e0344299346a; SESSION=cc96e046-7c74-41a0-978d-e77d66b54e09; Domain=huobi.com; Qs_lvt_93589=1499831607%2C1499877239%2C1499923240%2C1500156250%2C1501430779; _ga=GA1.2.1740964646.1496321036; _gid=GA1.2.791366217.1501430771; Hm_lvt_b5afd6d7387e7dde50eb21849ba44094=1499831607,1499877237,1499923241,1501430775; Hm_lpvt_b5afd6d7387e7dde50eb21849ba44094=1501430840; Qs_pv_93589=1638750567084063200%2C3780345891233400300%2C1892674715747073300%2C1900362836052352000%2C2518994544802232300'
            }
        };
        options.headers = u.extend({}, options.headers, headers);

        let req = https.request(options, function (res) {
            res.setEncoding('utf8');
            let chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                let html = chunks.join('');
                callback(null, html);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    }
};
