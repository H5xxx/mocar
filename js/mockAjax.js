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
    //用户车辆
    Mock.mock(/\/user\/\w+\/vehicles/, function(options){
        return [
            {
                "id" : 28473,
                "modelId" : 12,
                "model" : "奥迪进口A4 1.8T",
                "plate" : "京NB110A",
                "vid" : "1G1BL52P7TR115520",
            },
            {
                "id" : 28474,
                "modelId" : 13,
                "model" : "奥迪进口A4 2.0",
                "plate" : "京NB110B",
                "vid" : "1G1BL52P7TR115521",
            }
        ];
    });
    //用户地址
    Mock.mock(/\/user\/\w+\/contacts/, function(options){
        return [
            {
                "id" : 183642,
                "name" : "张先生",
                "cityCode" : "110100",
                "city" : "北京市",
                "address" : "海淀区西二旗西路领袖新硅谷D区101",
                "phone" : "186xxxxxxxx"
            },
            {
                "id" : 183643,
                "name" : "王女士",
                "cityCode" : "110100",
                "city" : "北京市",
                "address" : "海淀区西二旗西路领袖新硅谷D区101",
                "phone" : "139xxxxxxxx"
            }
        ];
    });
    
    //获取服务详情(*)
    Mock.mock(/\/models\/\w+\/services\/\w+$/, function(options) {
        return  {
                    "id":1,
                    "name":"常规保养",
                    "slogan":"附赠发动机仓清洗服务",
                    "description":"最专业的技师，最合理的价格。",
                    "price":300.0,
                    "parts":[
                        {
                            "name":"发动机机油",
                            "unit":"升",
                            "quantity":5,
                            "options":[
                                {
                                    "id":101,
                                    "typeId":1,
                                    "brand":"美孚",
                                    "name":"0W-40",
                                    "extra":"",
                                    "price":85.0,
                                    "hint":""
                                },
                                {
                                    "id":2,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"自行购买",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":""
                                }
                            ]
                        },
                        {
                            "name":"机油滤清器",
                            "unit":"个",
                            "quantity":1,
                            "options":[
                                {
                                    "id":1,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"原厂代购",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":"实价"
                                },
                                {
                                    "id":2,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"自行购买",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":""
                                }
                            ]
                        },
                        {
                            "name":"空气滤清器",
                            "unit":"个",
                            "quantity":1,
                            "options":[
                                {
                                    "id":1,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"原厂代购",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":"实价"
                                },
                                {
                                    "id":2,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"自行购买",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":""
                                },
                                {
                                    "id":3,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"不更换该配件",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":""
                                }
                            ]
                        },
                        {
                            "name":"空调滤清器",
                            "unit":"个",
                            "quantity":1,
                            "options":[
                                {
                                    "id":1,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"原厂代购",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":"实价"
                                },
                                {
                                    "id":2,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"自行购买",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":""
                                },
                                {
                                    "id":3,
                                    "typeId":0,
                                    "brand":"",
                                    "name":"不更换该配件",
                                    "extra":"",
                                    "price":0.0,
                                    "hint":""
                                }
                            ]
                        }
                    ]
                };
    });
});