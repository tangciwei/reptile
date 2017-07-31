let urlencode = require('urlencode');
const https = require('https');
let qs = require('querystring');

let tpl_value = urlencode('name=云币网&content=ico上线了', 'utf-8');

let apikey = process.env.apikey;

let post_data = {
    tpl_value,
    tpl_id: 1889236,
    mobile: '18500909025',
    time: new Date().getTime()
};

let content = qs.stringify(post_data);

let options = {
    hostname: 'voice.yunpian.com',
    path: '/v2/voice/tpl_notify.json',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};

let req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

req.write(content);
req.end();
