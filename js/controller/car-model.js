define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var Transitions = require('../component/transitions');

    var CarModel = Spine.Controller.create({
        // 该controller要渲染&控制的区域
        el: $('#car-model'),

        // 只执行一次，初始化时执行
        init: function() {
        },

        getData: function(params, callback){
            var data = {
                brand_name: Brand.findByAttribute('brand_id', params.brand_id).brand_name,
                series_name: params.series_id
            };

            // http://cybwx.sinaapp.com/service.php?m=getCarModelsFast&series_id=12
            $.ajax({
                url: 'http://cybwx.sinaapp.com/service.php',
                data: {
                    m: 'getCarModelsFast',
                    series_id: params.series_id
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(result) {
                    var list = result.data;
                    
                    list.forEach(function(item){
                        item.model_id = item.models_id;
                        item.model_name = item.description;
                        Model.create(item);
                    });

                    data.list = list;

                    callback(null, data);
                },
                error: function() {
                    callback(err || 'getCarBrandFast 超时');
                }
            });

            callback(null, data);
        },

        // 渲染内容
        render: function(params){

            var html = template('template-model', params);

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

    return CarModel;
});