/*
 * 通用的controller基类
 */

define(function(require, exports) {
    var util = require('../component/util');
    var Transitions = require('../component/transitions');

    var Common = Spine.Controller.sub({
        // 该controller要渲染&控制的区域
        el: $(),

        // 页面title
        title: '',

        // 内容模板
        template: 'template-...',

        // 只执行一次，初始化时执行
        init: function() {},

        // 获取需要的数据
        getData: function(params, callback) {
            callback(null, {});
        },

        // 渲染内容
        render: function(params) {

            var html = template(this.template, params);

            this.el.html(html);
        },

        // 清空内容
        clean: function() {
            this.el.html('Loading...');
        },

        // 跳转到其对应的url时执行
        activate: function(params) {

            var me = this;

            util.title(this.title);

            this.fadein();

            params = params || {};

            this.getData(params, function(err, data) {

                $.extend(params, data);

                me.render(params);

            });

        },

        // 离开到其对应的url时执行
        deactivate: function() {
            this.fadeout();
            this.clean();
        },

        fadein: Transitions.fadein,
        fadeout: Transitions.fadeout
    });

    return Common;
});