/*
 * 服务列表 页面的controller
 */
define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var Transitions = require('../component/transitions');

    var CarHome = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-home'),

        title: '摩卡服务',

        template: 'template-home',

        getData: function(params, callback){

            var icons = {
                '1': 'changguibaoyang',
                '2': 'kongtiaomiejun',
                '3': 'donglitisheng',
                '4': 'huanshachepian',
            };

            $.getJSON('http://api.mocar.cn/models/generic/services', function(services){
                services.forEach(function(service){
                    service.icon = icons[service.id];
                });

                callback(null, {
                    services: services
                });
            });
        }
    });

    return CarHome;
});