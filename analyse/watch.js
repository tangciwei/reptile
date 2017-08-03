let jubi = require('../websites/jubi');
let bter = require('../websites/bter');
let yunbi = require('../websites/yunbi');
let btc38 = require('../websites/btc38');
let chbtc = require('../websites/chbtc');
let huobi = require('../websites/huobi');
let okcoin = require('../websites/okcoin');
let yuanbao = require('../websites/yuanbao');
let btc9 = require('../websites/btc9');

let request = require('./request');
let yunpian = require('./yunpian-sms');

let log = require('../log');

module.exports = {
    async oneTime() {
        async function requestOnce({name, web}) {
            try {
                await request.common({name, web});
            }
            catch (e) {
                log.trace(name, '接口挂掉了');
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
            requestOnce({name: 'okcoin', web: okcoin}),
            requestOnce({name: 'yuanbao', web: yuanbao}),
            requestOnce({name: 'btc9', web: btc9})
        ]);
    },
    async init() {
        await this.oneTime();
        log.trace('第一次成功');
        setInterval(() => {
            this.oneTime();
        }, 49 * 1000);
    }
};
