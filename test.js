require('dotenv').load();
// let btcchina = require('./websites/btcchina');
// // let yunpian = require('./analyse/yunpian-sms');
// // let t1 = new Date();

// async function test() {
//     // console.log('开始发短信...');
//     // await yunpian.post({
//     //     mobile: '18500909025',
//     //     name: 'name',
//     //     content: 'content'
//     // });
//     // console.log('短信耗时', new Date() - t1);
//     await btcchina.get();
    
// }
// test();



let sms = require('./analyse/yunpian-sms');


async function test() {
    // let data  = await sms.post({
    //     mobile: '18500909025',
    //     name: 'test',
    //     content: 'content'
    // });
    let data = await sms.postAll({
    	mobile: '18500909025',
    	name: 'test',
    	content: 'content'
    });

    console.log(data);
}
test();