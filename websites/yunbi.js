let myPromisify = require('../util').myPromisify;
let https = require('https');
let time = new Date().getTime();
let url = 'https://yunbi.zendesk.com/hc/api/internal/recent_activities?locale=zh-cn&page=1&per_page=5&locale=zh-cn';
let baseUrl = 'https://yunbi.zendesk.com';

module.exports = {
    async get() {
        return await myPromisify(this.rawGet)(url);
    },
    rawGet(url, callback) {
        https.get(url, res => {
            let chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
            });
            res.on('end', function () {
                let json = Buffer.concat(chunks).toString();
                let activitie0 = JSON.parse(json).activities[0];
                let {
                    title,
                    timestamp,
                    id
                } = activitie0;
                let href = baseUrl + activitie0.url;
                callback(null, {title, href, time: timestamp, id});
            });
        });
    }
};
