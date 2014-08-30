define(function(require, exports) {
    var Mock = require('mock');

    Mock.mock(/\/models\/generic\/services$/, function(options) {
        return [
            {
                "id":1,
                "name":"常规保养",
                "slogan":"附赠发动机仓清洗服务",
                "description":"最专业的技师，最合理的价格。",
                "price":150.0,
                "highestPrice":300.0
            },
            {
                "id":2,
                "name":"空调灭菌",
                "slogan":"专业、严谨",
                "description":"使用德国进口药液，有效杀灭细菌。",
                "price":400.0,
                "highestPrice":600.0
            }
        ];
    });

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

    Mock.mock(/\/automobile\/brands\/\w+\/families\/\w+\/models\/\w+\/displacements$/, function(options) {
        return [
            {
                "id" : 1,
                "displacement" : "SAMPLE DISPLACEMENT",
                "description" : "..."
            },
            {
                "id" : 2,
                "displacement" : "SAMPLE DISPLACEMENT2",
                "description" : "..."
            }
        ];
    });
});