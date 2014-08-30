define(function(require, exports) {
    var Mock = require('mock');

    Mock.mock(/\/automobile\/brands$/, function(options) {
        return [
            {
                "id" : 1,
                "latter" : "A",
                "brand" : "奥迪"
            },
            {
                "id" : 2,
                "latter" : "B",
                "brand" : "宝马"
            }
        ];
    });

    Mock.mock(/\/automobile\/brands\/\w+\/families$/, function(options) {
        return [
            {
                "id" : 1,
                "prefix" : "进口",
                "family" : "A1(8X)"
            },
            {
                "id" : 2,
                "prefix" : "进口",
                "family" : "A3(8L)"
            }
        ];
    });

    Mock.mock(/\/automobile\/brands\/\w+\/families\/\w+\/models$/, function(options) {
        return [
            {
                "id" : 1,
                "model" : "1.2 TFSI (8X)",
                "suffix" : "2010款"
            },
            {
                "id" : 2,
                "model" : "1.4 TFSI (8X)",
                "suffix" : "2010款"
            }
        ];
    });
});