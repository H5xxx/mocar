define(function(require, exports) {
    var Order = require('./common').sub();
/*
 "id" : 243213,
    "status" : 2,
    "technicianId" : 1,
    "created" : 1388505600000,
    "modified" : 1388505600000,
    "sum" : 150
    "modelId" : 12
    "model" : "国产奥迪A4 1.8T",
    "vid" : null,
    "plate" : null,
    "cityCode" : 100080,
    "province" : "北京市",
    "city" : "海淀区",
    "address" : "海淀区西二旗西路领袖新硅谷D区101",
    "name" : "张先生",
    "phone" : "186xxxxxxxx",
    "date": 1388505700000,
    "services" : [
*/
    Order.configure('Order', 'id', 'status', 'created','modified', 'sum', 'modelId','model', 'vid','plate', 'cityCode', 'province', 'city', 'address', 'date', 'day', 'time','name','phone', 'services', '__currentService', '__currentVehicle');

    Order.extend({
        url: 'http://api.mocar.cn/user/${uid}/orders'
    });

    return Order;
});