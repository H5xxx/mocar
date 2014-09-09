/*
 * 服务列表 页面的controller
 */
define(function(require, exports) {
    var config = require('../component/config');
    var util = require('../component/util');
    var Service = require('../model/service');

    var CarHome = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-home'),

        title: '摩卡服务',

        template: 'template-home',

        getData: function(params, callback) {

            var icons = {
                '1': 'changguibaoyang',
                '2': 'kongtiaomiejun',
                '3': 'donglitisheng',
                '4': 'huanshachepian',
            };

            util.finish([
                Service.fetch(params)
            ], function(services){
                services.forEach(function(service){
                    service.icon = config.API_HOST + '/images/services/' + util.formatNum(service.id, 3) + '.png';
                });

                callback(null, {
                    services: services
                });
            });

        }
    });

    return CarHome;
});