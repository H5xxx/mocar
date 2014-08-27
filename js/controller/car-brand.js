define(function(require, exports) {
    var Transitions = require('../component/transitions');
    var navigator = require('../component/navigator');

    var CarBrand = Spine.Controller.create({
        // 该controller要渲染&控制的区域
        el: $('#car-brand'),

        // 只执行一次，初始化时执行
        init: function() {
        },

        list: function(params){
            var list = [];
            for(var i = 1, num = 10; i <= num; i++){
                list.push({
                    id: i,
                    name: 'brand-' + i
                });
            }

            return list;
        },

        // 渲染内容
        render: function(params){
            var params = $.extend(params, {
                list: this.list(params)
            });

            var html = template('template-brand-item', params);

            this.el.html(html);

            navigator.render(params);
        },

        // 清空内容
        clean: function(){
            this.el.html('');
        },

        // 跳转到其对应的url时执行
        activate: function(params){
            this.render(params);

            this.fadein();
        },

        // 离开到其对应的url时执行
        deactivate: function(){
            this.clean();

            this.fadeout();
        },

        fadein: Transitions.fadein,
        fadeout: Transitions.fadeout
    });

    return CarBrand;
});