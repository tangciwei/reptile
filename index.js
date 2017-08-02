require('dotenv').load();
let watch = require('./analyse/watch');
module.exports = {
    start() {
        watch.init();
    }
};
// 不能停哈哈哈
try{
	watch.init();
}
catch(e){
	console.log('重启！！！！');
	watch.init();
}

