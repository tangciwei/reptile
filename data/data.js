module.exports = {
    data: {},
    getData() {
        return global.webData;
    },
    setData(data) {
        global.webData = data;
    }
};
