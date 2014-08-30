/*
 * 预约成功 页面的controller
 */
define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var Transitions = require('../component/transitions');

    var CarSuccess = Spine.Controller.create({
        // 该controller要渲染&控制的区域
        el: $('#car-success'),

        // 只执行一次，初始化时执行
        init: function() {
        },

        getData: function(params, callback){
            var data = {
                // brand_name: Brand.findByAttribute('brand_id', params.brand_id).brand_name,
                // series_name: params.series_id,
                // model_name: Model.findByAttribute('model_id', params.model_id).model_name,
                // list: Model.getDisplacementById(params.model_id)
            };

            callback(null, data);
        },

        // 渲染内容
        render: function(params){

            var html = template('template-success', params);

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

    return CarSuccess;
});