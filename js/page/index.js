define(function(require, exports) {
    require('../controller/access-token').init();

    var Page = Spine.Stack.sub({

        // 所有controller
        controllers: {
            'home': require('../controller/car-home'),
            'brand': require('../controller/car-brand'),
            'series': require('../controller/car-series'),
            'model': require('../controller/car-model'),
            'cart': require('../controller/car-cart'),
            'schedule': require('../controller/car-schedule'),
            'success': require('../controller/car-success')
        },

        // 每个controller对应一个url，从中取到参数
        routes: {
            '/': function(){
                this.navigate('/home');
            },
            '/home': 'home',
            '/service/:service_id/brand': 'brand',
            '/service/:service_id/brand/:brand_id/series': 'series',
            '/service/:service_id/brand/:brand_id/series/:series_id/model': 'model',
            '/service/:service_id/model/:model_id/cart': 'cart',
            '/service/:service_id/cart': 'cart',
            '/service/:service_id/model/:model_id/schedule': 'schedule',
            '/service/:service_id/model/:model_id/success': 'success'
        },

        'default': 'home',

        // 页面初始化
        init: function(){
            var page = this;

            // 所有class="j-nav" data-nav="/xxx"的点击会跳转到/xxx
            this.el.delegate('.j-nav', 'click', function(e){
                page.navigate($(e.currentTarget).attr('data-nav'));
            });
        }
    });

    var page = new Page({
        el: $('#main-container')
    });

    page.manager.controllers.forEach(function(controller){
        controller.page = page;
    });

    Spine.Route.setup();

});