let common = require('../common');
let url = 'https://www.chbtc.com/i/blog?type=proclamation';
let baseUrl = 'https://www.chbtc.com';

module.exports = {
    async get() {

        let {$, html} = await common.get(url);
        let list = $(html).find('#envor-posts-timeline .cbp_tmtimeline li');
        let target = $(list[0]);
        let time = target.find('.cbp_tmtime').attr('datetime');

        let a = target.find('.cbp_tmlabel .envor-post header a');

        let href = baseUrl + $(a).attr('href');
        let title = $(a).text().trim();

        return {
            time,
            href,
            title
        };
    }
};
