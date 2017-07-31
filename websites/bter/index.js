// 这里优先选用策略1,
// 如果策略1失效再切换到策略2
let strategy1 = require('./strategy1.js');
let strategy2 = require('./strategy2.js');
module.exports = {
    get() {
        try {
            return strategy1.get();
        }
        catch (e) {
            return strategy2.get();
        }

    }
};
