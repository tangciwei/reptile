// 策略2，尝试请求最新的url，看能否得到内容
let common = require('../../common');
let myPromisify = require('../../util').myPromisify;
const S = require('string');

module.exports = {
    // 这里可能要经常修改
    initNum: 16226,
    html: '',
    $: '',
    async get() {
        await this.getNext();
        let {$, html} = this;

        let start = `<div class='right_mcontent'>`;
        let end = `<font color='#999999'>Author:</font>`;
        let target = S(html).between(start, end).s;

        let title = S(target).between(`<font color=#BD2C2F>`, `</font>`).s;
        let time = S(target).between(`<font color='#999999'>`, `</font>`).s;
        return {
            title,
            time
        };
    },
    async getNext(callback) {
        let url = 'https://bter.com/article/' + this.initNum;
        let {$, html} = await common.get(url);
        this.$ = $;
        if (html.length > 500) {
            this.initNum++;
            this.html = html;
            await this.getNext();
        }

    }
};
