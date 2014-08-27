define(function(require, exports) {

    var Page = Spine.Stack.sub({

        // 所有controller
        controllers: {
            'brand': require('../controller/car-brand'),
            'series': require('../controller/car-series'),
            'model': require('../controller/car-model'),
            'displacement': require('../controller/car-displacement')
        },

        // 每个controller对应一个url，从中取到参数
        routes: {
            '/': function(){
                this.navigate('/brand');
            },
            '/brand': 'brand',
            '/brand/:bid/series': 'series',
            '/brand/:bid/series/:sid/model': 'model',
            '/brand/:bid/series/:sid/model/:mid/displacement': 'displacement'
        },

        // 页面初始化
        init: function(){
            var page = this;

            // 所有class="j-nav" data-nav="/xxx"的点击会跳转到/xxx
            this.el.delegate('.j-nav', 'click', function(e){
                page.navigate($(e.currentTarget).attr('data-nav'));
            });
        }
    });

    var service = new Page({
        el: $('body')
    });

    service.navigate('/brand');

    Spine.Route.setup();

});