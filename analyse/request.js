let u = require('underscore');
let yunpian = require('./yunpian-sms');
let log = require('../log');

module.exports = {
    // 数据
    data: {},
    // 计数
    counts: {},
    async common(obj) {
        let {name, web} = obj;

        let data = await web.get();

        let href = data.href;
        // 无效请求
        if (!href || href.indexOf('undefined') !== -1) {
            log.trace(`${name}: 无效请求`);
            return false;
        }
        // 有效的请求
        else {
            if (!this.counts[name]) {
                this.counts[name] = 0;
            }

            this.counts[name]++;

            // 数据对比
            if (this.diff({name, data})) {
                log.trace(this.counts[name], name, '数据一样。。。');
            }
            else {
                // 存储数据
                this.storeData({name, data});
                // 分析数据重要性

                let level = this.analyse(data);

                this.notice({name, level, data});
            }
        }
    },
    diff({name, data}) {
        return u.isEqual(data, this.data[name]);
    },
    storeData({name, data}) {
        // 存储新数据
        this.data[name] = data;
        // 写入全局变量
        if (!global.webData) {
            global.webData = {};
        }

        global.webData[name] = data;
        log.trace(name + ': ', JSON.stringify(data));
    },
    // 数据分析
    analyse(data) {
        // let href = data.href;
        let title = data.title;
        // 0为最高优先级
        let level = 10;
        if (title) {
            if (title.indexOf('上线') !== -1
                || title.indexOf('开放') !== -1
                || title.indexOf('上币') !== -1) {
                level = 0;
            }
        }
        // title不存在的情况下暂定level为0
        else {
            level = 0;
        }

        return level;

    },
    // 通知
    async notice({
            name,
            level,
            data
        }) {
        let {title, href} = data;
        let content = '; ' + href;
        // let content = title + '; ' + href;
        // 第一次不通知
        if (this.counts[name] > 1) {
            if(name === 'btcchina') {
                content: '网页有btm';
            }
            // 最高优先级
            if (level === 0) {
                log.trace(name, '[群发短信开始]');
                await Promise.all([
                    yunpian.post({
                        mobile: '18500909025',
                        name,
                        content
                    }),
                    yunpian.post({
                        mobile: '18519283208',
                        name,
                        content
                    })
                ]);
                // others
                await Promise.all([
                    // yanchen
                    await yunpian.post({
                        mobile: '15671628395',
                        name,
                        content
                    }),
                    // xiaofufu
                    await yunpian.post({
                        mobile: '18600949271',
                        name,
                        content
                    }),
                    // chenkai
                    await yunpian.post({
                        mobile: '17610997710',
                        name,
                        content
                    }),
                    // zhuwenping
                    await yunpian.post({
                        mobile: '18639098527',
                        name,
                        content
                    })
                ]);
                log.trace(name, '[群发短信结束]');
            }
            // 普通通知
            else {
                let t1 = new Date();
                log.trace(name, '开始发短信...');
                await yunpian.post({
                    mobile: '18500909025',
                    name,
                    content
                });
                log.trace(name, '短信耗时', new Date() - t1);
            }
        }

    }
};
