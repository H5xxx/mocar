define(function(require, exports) {
    var Brand = require('../model/brand');

    var Transitions = require('../component/transitions');

    var CarSeries = Spine.Controller.create({
        // 该controller要渲染&控制的区域
        el: $('#car-series'),

        // 只执行一次，初始化时执行
        init: function() {
        },

        getData: function(params, callback){
            var data = {
                brand_name: Brand.findByAttribute('brand_id', params.brand_id).brand_name,
                list: Brand.getSeriesByBrandId(params.brand_id)
            };

            callback(null, data);
        },

        // 渲染内容
        render: function(params){

            var html = template('template-series', params);

            this.el.html(html);
        },

        // 清空内容
        clean: function(){
            this.el.html('Loading...');
        },

        // 跳转到其对应的url时执行
        activate: function(params){

            var me = this;

            this.fadein();

            this.getData(params, function(err, data){

                $.extend(params, data);

                me.render(params);

            });

        },

        // 离开到其对应的url时执行
        deactivate: function(){
            this.fadeout();
            this.clean();
        },

        fadein: Transitions.fadein,
        fadeout: Transitions.fadeout
    });

    return CarSeries;
});