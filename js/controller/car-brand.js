define(function(require, exports) {
    var Brand = require('../model/brand');
    var Transitions = require('../component/transitions');

    var CarBrand = Spine.Controller.create({
        // 该controller要渲染&控制的区域
        el: $('#car-brand'),

        // 只执行一次，初始化时执行
        init: function() {
        },

        getData: function(params, callback){
            $.ajax({
                url: 'http://cybwx.sinaapp.com/service.php',
                data: {
                    m: 'getCarBrandFast'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(result) {
                    var list = result.data;

                    list.forEach(function(item){
                        Brand.create(item);
                    });

                    callback(null, {
                        list: list
                    });
                },
                error: function(err) {
                    callback(err || 'getCarBrandFast 超时');
                }
            });
        },

        // 渲染内容
        render: function(params){

            var html = template('template-brand', params);

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

    return CarBrand;
});