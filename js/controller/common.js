/*
 * 通用的controller基类
 */

define(function(require, exports) {
    var util = require('../component/util');
    var Transitions = require('../component/transitions');
    var Popup = require('../widgets/Popup');
    var Common = Spine.Controller.sub({
        // 该controller要渲染&控制的区域
        // 尽情地重写吧
        el: $(),

        // 页面title
        // 尽情地重写吧
        title: '',

        // 内容模板
        // 尽情地重写吧
        template: 'template-...',

        // 只执行一次，初始化时执行
        // 尽情地重写吧
        init: function() {},

        // 获取需要的数据
        // 尽情地重写吧
        getData: function(params, callback) {
            callback(null, {});
        },

        // 渲染内容
        // 尽情地重写吧
        render: function(params) {

            var html = template(this.template, params);

            this.el.html(html);
        },

        // 清空内容
        // 尽情地重写吧
        clean: function() {
            this.el.html('');
        },

        // 跳转到其对应的url时执行
        // 尽量不要重写该方法，即使实在要扩展，需保留逻辑(this.constructor.__super__.xxx.apply(...))
        activate: function(params) {

            var me = this;

            params = params || {};

            this.getData(params, function(err, data) {

                me.enter();

                me.render($.extend(params, data));

            });

        },

        // 视图正式进入当前controller
        // 尽量不要重写该方法，即使实在要扩展，需保留逻辑(this.constructor.__super__.xxx.apply(...))
        enter: function(){
            var prev = this.page.curr,
                prevId = prev  ? prev.squenceId : -1,
                currId = this.squenceId,
                direction = currId >= prevId ? 'right' : 'left';

            if(prev){
                prev.leave();
            }

            this.movein(direction);
            util.title(this.title);

            this.page.curr = this;
        },

        // 离开到其对应的url时执行
        // 尽量不要重写该方法，即使实在要扩展，需保留逻辑(this.constructor.__super__.xxx.apply(...))
        deactivate: function() {
            if(this === this.page.curr){
                Popup.openLoading();
            }
        },

        // 清理当前controller的内容并移出视图
        // 尽量不要重写该方法，即使实在要扩展，需保留逻辑(this.constructor.__super__.xxx.apply(...))
        leave: function(){
            Popup.close();
            this.moveout();
            this.clean();
        },

        movein: Transitions.movein,
        moveout: Transitions.moveout
    });

    return Common;
});