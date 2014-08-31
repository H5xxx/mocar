/*
 * 服务列表 页面的controller
 */
define(function(require, exports) {
    var util = require('../component/util');
    var Service = require('../model/service');
    var Brand = require('../model/brand');
    var Model = require('../model/model');

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
            // util.finish([
            //     Service.fetch({}),
            // ], function(services){
            //     services.forEach(function(service){
            //         service.icon = icons[service.id];
            //     });

            //     callback(null, {
            //         services: services
            //     });


            $.ajax({
                url: 'http://api.mocar.cn/models/generic/services',
                context: $('body'),
                dataType: 'json',
                success: function(services) {
                    services.forEach(function(service) {
                        service.icon = icons[service.id];
                    });

                    callback(null, {
                        services: services
                    });
                }
            });
        }
    });

    return CarHome;
});