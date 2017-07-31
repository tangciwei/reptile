let http = require('http');
let time = new Date().getTime();
let url = 'http://www.btc38.com/newsInfo.php?n=' + time;
let baseUrl = 'http://www.btc38.com';

let myPromisify = require('../util').myPromisify;

module.exports = {
    async get() {
        return await myPromisify(this.rawGet)(url);
    },
    rawGet(url, callback) {
        http.get(url, res => {
            let chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
            });
            res.on('end', function () {
                let json = Buffer.concat(chunks).toString();
                let noticeData = JSON.parse(json).notice[0];
                let {
                    title,
                    time,
                    id
                } = noticeData;

                let href = noticeData.url;
                callback(null, {title, href, time, id});
            });
        });
    }
};
