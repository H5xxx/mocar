/*
 * 预约成功 页面的controller
 */
define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var Transitions = require('../component/transitions');

    var CarHome = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-home'),

        template: 'template-home',

        getData: function(params, callback){
            var data = {
                // brand_name: Brand.findByAttribute('brand_id', params.brand_id).brand_name,
                // list: Brand.getSeriesByBrandId(params.brand_id)
            };

            callback(null, data);
        },
        // 渲染内容
        render: function(params){

            var html = template(this.template, params);

            this.el.html(html);
        },
    });

    return CarHome;
});