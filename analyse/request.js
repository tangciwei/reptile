let u = require('underscore');
let yunpian = require('./yunpian-sms');

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
            console.log(`${name}: 无效请求`);
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
                console.log(this.counts[name], name, '数据一样。。。');
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
        else {
            global.webData[name] = data;
        }
        console.log(name + ': ', data);
    },
    // 数据分析
    analyse(data) {
        // let href = data.href;
        let title = data.title;
        // 0为最高优先级
        let level = 10;
        if (title) {
            if (title.indexOf('上线') !== -1 || title.indexOf('开放') !== -1) {
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
            // 最高优先级
            if (level === 0) {
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
            }
            // 普通通知
            else {
                yunpian.post({
                    mobile: '18500909025',
                    name,
                    content
                });
            }
        }

    }
};
