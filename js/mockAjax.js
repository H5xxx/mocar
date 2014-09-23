define(function(require, exports) {
    var Mock = require('mock');

    var mock = function(path, handler){
        return Mock.mock(path, function(options){
            var result = handler.apply(this, arguments);

            console.log('[MOCK]', path, 'RESULT:', result);
            return result;
        });
    };

    mock(/\/models\/generic\/services$/, function(options) {
        return [{
            "id": 1,
            "name": "常规保养",
            "slogan": "附赠发动机仓清洗服务",
            "description": "最专业的技师，最合理的价格。",
            "price": 150.0,
            "highestPrice": 300.0
        }, {
            "id": 3,
            "name": "空调灭菌",
            "slogan": "专业、严谨",
            "description": "使用德国进口药液，有效杀灭细菌。",
            "price": 400.0,
            "highestPrice": 600.0
        }];
    });

    mock(/\/automobile\/brands$/, function(options) {
        return [{
            "id": 1,
            "latter": "A",
            "brand": "奥迪"
        }, {
            "id": 2,
            "latter": "B",
            "brand": "宝马"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }, {
            "id": 3,
            "latter": "B",
            "brand": "奔驰"
        }];
    });

    mock(/\/automobile\/brands\/\w+\/families$/, function(options) {
        return [{
            "id": 1,
            "prefix": "进口",
            "family": "A1(8X)"
        }, {
            "id": 2,
            "prefix": "进口",
            "family": "A3(8L)"
        }];
    });

    mock(/\/automobile\/brands\/\w+\/families\/\w+\/models$/, function(options) {
        return [{
            "id": 1,
            "model": "1.2 TFSI (8X)",
            "suffix": "2010款"
        }, {
            "id": 2,
            "model": "1.4 TFSI (8X)",
            "suffix": "2010款"
        }];
    });

    mock(/\/automobile\/brands\/\w+\/families\/\w+\/models\/\w+\/displacements$/, function(options) {
        return [{
            "id": 1,
            "displacement": "SAMPLE DISPLACEMENT",
            "description": "..."
        }, {
            "id": 2,
            "displacement": "SAMPLE DISPLACEMENT2",
            "description": "..."
        }];
    });
    //用户车辆
    mock(/\/users\/\w+\/vehicles/, function(options) {
        return [];
        return [{
            "id": 28473,
            "modelId": 12,
            "prefix": "",
            "suffix": "",
            "family": "family",
            "brand":"",
            "model": "奥迪进口A4 1.8T",
            "plate": "京NB110A",
            "vid": "1G1BL52P7TR115520",
        }, {
            "id": 28474,
            "modelId": 13,
            "prefix": "",
            "suffix": "",
            "family": "family",
            "brand":"",
            "model": "奥迪进口A4 2.0",
            "plate": "京NB110B",
            "vid": "1G1BL52P7TR115521",
        }];
    });
    //用户地址
    var i = 0;
    mock(/\/users\/\w+\/contacts/, function(options) {
        i++;
        if(i%2 == 0){
            return [];
        }
        return [{
            "id": 183642,
            "name": "张先生",
            "cityCode": "100080",
            "city": "北京市",
            "address": "海淀区西二旗西路领袖新硅谷D区101",
            "phone": "186xxxxxxxx"
        }, {
            "id": 183643,
            "name": "王女士",
            "cityCode": "110100",
            "city": "北京市",
            "address": "海淀区西二旗西路领袖新硅谷D区101",
            "phone": "139xxxxxxxx"
        }];
    });
    //城市
    mock(/\/location\/cities/, function(options) {
        return [{
            "province": "上海市",
            "cities": [{
                "cityCode": 200010,
                "city": "浦东新区"
            }, {
                "cityCode": 200020,
                "city": "黄埔区"
            }, {
                "cityCode": 200030,
                "city": "长宁区"
            }, {
                "cityCode": 200080,
                "city": "闵行区"
            }, {
                "cityCode": 200180,
                "city": "宝山区"
            }, {
                "cityCode": 200280,
                "city": "虹桥区"
            }]
        }, {
            "province": "北京市",
            "cities": [{
                "cityCode": 100010,
                "city": "东城区"
            }, {
                "cityCode": 100020,
                "city": "朝阳区"
            }, {
                "cityCode": 100030,
                "city": "西城区"
            }, {
                "cityCode": 100080,
                "city": "海淀区"
            }, {
                "cityCode": 100180,
                "city": "石景山区"
            }, {
                "cityCode": 100280,
                "city": "通州区"
            }, ]
        }];
    });
    //获取服务详情(*)
    mock(/\/models\/\w+\/services\/\w+$/, function(options) {
        return {
            "id": 1,
            "name": "常规保养",
            "slogan": "附赠发动机仓清洗服务",
            "description": "最专业的技师，最合理的价格。",
            "price": 300.0,
            "parts": [{
                "name": "发动机机油",
                "unit": "升",
                "quantity": 5,
                "options": [{
                    "id": 101,
                    "typeId": 1,
                    "brand": "美孚",
                    "name": "0W-40",
                    "extra": "",
                    "price": 85.0,
                    "count": 5,
                    "hint": ""
                }, {
                    "id": 102,
                    "typeId": 1,
                    "brand": "",
                    "name": "自行购买",
                    "extra": "",
                    "price": 0.0,
                    "count": 5,
                    "hint": ""
                }]
            }, {
                "name": "机油滤清器",
                "unit": "个",
                "quantity": 1,
                "options": [{
                    "id": 201,
                    "typeId": 2,
                    "brand": "",
                    "name": "原厂代购",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": "21.50"
                }, {
                    "id": 202,
                    "typeId": 2,
                    "brand": "",
                    "name": "自行购买",
                    "extra": "",
                    "count": 1,
                    "price": 0.0,
                    "hint": ""
                }]
            }, {
                "name": "空气滤清器",
                "unit": "个",
                "quantity": 1,
                "options": [{
                    "id": 301,
                    "typeId": 3,
                    "brand": "",
                    "name": "原厂代购",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": "21.50"
                }, {
                    "id": 302,
                    "typeId": 3,
                    "brand": "",
                    "name": "自行购买",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }, {
                    "id": 303,
                    "typeId": 3,
                    "brand": "",
                    "name": "不更换该配件",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }]
            }, {
                "name": "空调滤清器",
                "unit": "个",
                "quantity": 1,
                "options": [{
                    "id": 401,
                    "typeId": 4,
                    "brand": "",
                    "name": "原厂代购",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": "21.50"
                }, {
                    "id": 402,
                    "typeId": 4,
                    "brand": "",
                    "name": "自行购买",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }, {
                    "id": 403,
                    "typeId": 4,
                    "brand": "",
                    "name": "不更换该配件",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }]
            }, {
                "name": "空调滤清器",
                "unit": "个",
                "quantity": 1,
                "options": [{
                    "id": 501,
                    "typeId": 5,
                    "brand": "",
                    "name": "原厂代购",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": "21.50"
                }, {
                    "id": 502,
                    "typeId": 5,
                    "brand": "",
                    "name": "自行购买",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }, {
                    "id": 503,
                    "typeId": 5,
                    "brand": "",
                    "name": "不更换该配件",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }]
            }, {
                "name": "空调滤清器",
                "unit": "个",
                "quantity": 1,
                "options": [{
                    "id": 601,
                    "typeId": 6,
                    "brand": "",
                    "name": "原厂代购",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": "21.50"
                }, {
                    "id": 602,
                    "typeId": 6,
                    "brand": "",
                    "name": "自行购买",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }, {
                    "id": 603,
                    "typeId": 6,
                    "brand": "",
                    "name": "不更换该配件",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }]
            }, {
                "name": "bottom清器",
                "unit": "个",
                "quantity": 1,
                "options": [{
                    "id": 701,
                    "typeId": 7,
                    "brand": "",
                    "name": "原厂代购",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": "21.50"
                }, {
                    "id": 702,
                    "typeId": 7,
                    "brand": "",
                    "name": "自行购买",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }, {
                    "id": 703,
                    "typeId": 7,
                    "brand": "",
                    "name": "不更换该配件",
                    "extra": "",
                    "price": 0.0,
                    "count": 1,
                    "hint": ""
                }]
            }]
        };
    });

    mock(/\/users\/me\/orders$/, function(options) {
        return [
            {
                "id" : 243213,
                "status" : 0,
                "modified" : 1388505600000,
                "model" : "国产奥迪A4 1.8T",
                "plate" : "京NB110A",
                "title" : "常规保养",
                "date": 1388505700000
            },
            {
                "id" : 243214,
                "status" : 1,
                "modified" : 1388505600000,
                "model" : "国产奥迪A4 1.8T",
                "plate" : "京NB110A",
                "title" : "空调灭菌",
                "date": 1388505700000
            },
            {
                "id" : 243215,
                "status" : 2,
                "modified" : 1388505600000,
                "model" : "国产奥迪A4 1.8T",
                "plate" : "京NB110A",
                "title" : "空调灭菌",
                "date": 1388505700000
            },
            {
                "id" : 243216,
                "status" : 3,
                "modified" : 1388505600000,
                "model" : "国产奥迪A4 1.8T",
                "plate" : "京NB110A",
                "title" : "常规保养",
                "date": 1388505700000
            }
        ];
    });
    mock(/\/users\/me\/orders\/\w+$/, function(options) {
        return {
            "id" : 243213,
            "status" : 1,
            "technicianId" : 1,
            "created" : 1388505600000,
            "modified" : 1388505600000,
            "sum" : 150,
            "modelId" : 12,
            "model" : "国产奥迪A4 1.8T",
            "vid" : null,
            "plate" : null,
            "cityCode" : 100080,
            "province" : "北京市",
            "city" : "海淀区",
            "address" : "西二旗西路领袖新硅谷D区101弄5号楼2单元207室",
            "name" : "张先生",
            "phone" : "18662680000",
            "date": 1388505700000,
            "services" : [
                {
                    "type" : "摩卡服务",
                    "name" : "常规保养",
                    "price" : 150,
                    "quantity" : 1,
                    "parts" : [
                        {
                            "type" : "发动机机油",
                            "name" : "自备",
                            "quantity" : 5,
                            "price" : 0
                        },
                        {
                            "type" : "机油滤清器",
                            "name" : "马勒OC595",
                            "quantity" : 1,
                            "price" : 17
                        },
                        {
                            "type" : "空气滤清器",
                            "name" : "马勒LX2115",
                            "quantity" : 1,
                            "price" : 31
                        },
                        {
                            "type" : "空调滤清器",
                            "name" : "马勒LA513",
                            "quantity" : 1,
                            "price" : 34
                        }
                    ]
                }
            ]
        };
    });
    mock(/\/authority\/token/, function(options) {
        return {
            "accessToken": "126688deb863604b",
            "expiresIn": 7200
        };
    });
});