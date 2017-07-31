const https = require('https');
const cheerio = require('cheerio');
let myPromisify = require('../util').myPromisify;

module.exports = {
    async get(url) {
        return await myPromisify(this.rawGet)(url);
    },
    rawGet(url, callback) {
        https.get(url, res => {
            let chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
            });
            res.on('end', function () {
                let html = Buffer.concat(chunks).toString();
                let $ = cheerio.load(html, {
                    decodeEntities: false
                });

                callback(null, {$, html});
            });
        });
    }

};
