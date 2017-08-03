require('dotenv').load('../.env');
let yunpian = require('../analyse/yunpian-sms');
let t1 = new Date();

async function test() {
    console.log('开始发短信...');
    await yunpian.post({
        mobile: '18500909025',
        name: 'name',
        content: 'content'
    });
    console.log('短信耗时', new Date() - t1);
}
test();