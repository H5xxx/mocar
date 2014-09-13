/*
 * 服务列表 页面的controller
 */
define(function(require, exports) {
    var config = require('../component/config');
    var util = require('../component/util');

    var Service = require('../model/service');
    var Vehicle = require('../model/vehicle');

    var CarHome = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-home'),

        title: '摩卡汽车服务',

        template: 'template-home',

        getData: function(params, callback) {

            var icons = {
                '1': 'changguibaoyang',
                '2': 'kongtiaomiejun',
                '3': 'donglitisheng',
                '4': 'huanshachepian',
            };

            util.finish([
                Service.fetch(params),
                Vehicle.fetch({uid:'me'})
            ], function(services, vehicles) {
                services.forEach(function(service) {
                    service.icon = config.STATIC_HOST + '/images/services/' + util.formatNum(service.id, 3) + '.png';
                });

                callback(null, {
                    services: services,
                    next: vehicles && vehicles.length ? 'cart' : 'brand'
                });
            });

        }
    });

    return CarHome;
});