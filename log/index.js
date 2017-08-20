const log4js = require('log4js');
let date = new Date();
let logname = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours();

log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: './log/'+logname+'.log'
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


