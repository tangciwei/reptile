require('dotenv').load();
let watch = require('./analyse/watch');
module.exports = {
    start() {
        watch.init();
    }
};
watch.init();
