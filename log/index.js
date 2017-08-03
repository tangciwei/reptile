const log4js = require('log4js');
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: './log/cheese2.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'trace'
        }
    }
});

const logger = log4js.getLogger('cheese');

module.exports = {
    trace() {
        let arr = [...arguments];
        let str  = arr.join(' ');
        logger.trace(str);
    }
};


