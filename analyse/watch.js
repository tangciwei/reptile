let jubi = require('../websites/jubi');
let bter = require('../websites/bter');
let yunbi = require('../websites/yunbi');
let btc38 = require('../websites/btc38');
let chbtc = require('../websites/chbtc');
let huobi = require('../websites/huobi');
let okcoin = require('../websites/okcoin');
let yuanbao = require('../websites/yuanbao');
let btc9 = require('../websites/btc9');
let binance = require('../websites/binance');
let btcchina = require('../websites/btcchina');

let request = require('./request');
let yunpian = require('./yunpian-sms');

let log = require('../log');
let config = require('../config');
module.exports = {
    async requestOnce({name, web}) {
        try {
            await request.common({name, web});
        }
        catch (e) {
            log.trace(name, '接口挂掉了');
            log.trace(name, e);
            // await yunpian.post({
            //     mobile: '18500909025',
            //     name,
            //     content: '接口挂掉了'
            // });
        }
    },
    async quickRequest() {
        await Promise.all([
            this.requestOnce({name: 'jubi', web: jubi}),
            this.requestOnce({name: 'bter', web: bter}),
            this.requestOnce({name: 'yunbi', web: yunbi}),
            this.requestOnce({name: 'btc38', web: btc38}),
            this.requestOnce({name: 'chbtc', web: chbtc}),
            this.requestOnce({name: 'huobi', web: huobi}),
            this.requestOnce({name: 'yuanbao', web: yuanbao}),
            this.requestOnce({name: 'binance', web: binance})
        ]);
    },
    // 以下接口请求频率慢点
    async slowRequest() {
        // await this.requestOnce({name: 'btcchina', web: btcchina})
        // await this.requestOnce({name: 'okcoin', web: okcoin});
        await Promise.all([
            this.requestOnce({name: 'okcoin', web: okcoin}),
            this.requestOnce({name: 'btcchina', web: btcchina})
        ]);
    },
    async init() {
        await this.quickRequest();
        await this.slowRequest();

        log.trace('第一次成功');

        let time = config.loopTime;

        setInterval(() => {
            this.quickRequest();
        }, time);

        // 三分钟请求一次
        setInterval(() => {
            this.slowRequest();
        }, 180 * 1000);
    }
};
