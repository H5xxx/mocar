/*
 * 预约上门信息 页面的controller
 */
define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var CarSchedule = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-schedule'),

        template: 'template-schedule',

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
            //TODO，初始化自定义select
        },
    });

    return CarSchedule;
});