let util = require('../util');

module.exports = {
    // async post({
    //         mobile,
    //         name,
    //         content
    //     }) {
    //     let text = `唐词伟通知您，您订阅的${name}，有最新公告${content}`;
    //     let data = {
    //         mobile,
    //         apikey,
    //         text
    //     };
    //     let options = {
    //         hostname: 'sms.yunpian.com',
    //         path: '/v2/sms/single_send.json',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //         }
    //     };
    //     await util.post({options, data});
    // },
    async post({
            mobile,
            name,
            content
        }) {
        let apikey = process.env.apikey;
        let text = `币圈精灵通知您，您订阅的${name},有最新公告${content}。`;
        let data = {
            mobile,
            apikey,
            text
        };
        let options = {
            hostname: 'sms.yunpian.com',
            path: '/v2/sms/batch_send.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        await util.post({options, data});
    }
};
