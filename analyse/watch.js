let jubi = require('../websites/jubi');
let bter = require('../websites/bter');
let yunbi = require('../websites/yunbi');
let btc38 = require('../websites/btc38');
let chbtc = require('../websites/chbtc');
let huobi = require('../websites/huobi');
let okcoin = require('../websites/okcoin');

let request = require('./request');
let yunpian = require('./yunpian-sms');

module.exports = {
    async oneTime() {
        async function requestOnce({name, web}) {
            try {
                await request.common({name, web});
            }
            catch (e) {
                console.log(name, '接口挂掉了');
                // await yunpian.post({
                //     mobile: '18500909025',
                //     name,
                //     content: '接口挂掉了'
                // });
            }
        }
        await Promise.all([
            requestOnce({name: 'jubi', web: jubi}),
            requestOnce({name: 'bter', web: bter}),
            requestOnce({name: 'yunbi', web: yunbi}),
            requestOnce({name: 'btc38', web: btc38}),
            requestOnce({name: 'chbtc', web: chbtc}),
            requestOnce({name: 'huobi', web: huobi}),
            requestOnce({name: 'okcoin', web: okcoin})
        ]);
    },
    async init() {
        await this.oneTime();
        console.log('第一次成功');
        setInterval(() => {
            this.oneTime();
        }, 31 * 1000);
    }
};
