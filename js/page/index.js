define(function(require, exports) {
    var util = require('../component/util');

    template.helper('formatNum', util.formatNum);
    template.helper('splitString', function(source, length) {
        length = length || 46;
        return source.substr(0, length) + '···';
    });


    var Page = Spine.Stack.sub({

        // 所有controller
        controllers: {
            'home': require('../controller/car-home'),
            'brand': require('../controller/car-brand'),
            'series': require('../controller/car-series'),
            'model': require('../controller/car-model'),
            'cart': require('../controller/car-cart'),
            'schedule': require('../controller/car-schedule'),
            'success': require('../controller/car-success'),
            'orders': require('../controller/user-order-list'),
            'order': require('../controller/user-order')
        },

        // 每个controller对应一个url，从中取到参数
        routes: {
            '/': function(){
                this.navigate(this.indexPage);
            },
            '/home': 'home',
            '/service/:service_id/brand': 'brand',
            '/service/:service_id/brand/:brand_id/series': 'series',
            '/service/:service_id/brand/:brand_id/series/:series_id/model': 'model',
            '/service/:service_id/model/:model_id/cart': 'cart',
            '/service/:service_id/cart': 'cart',
            '/service/:service_id/model/:model_id/schedule': 'schedule',
            '/service/:service_id/model/:model_id/success': 'success',
            '/orders': 'orders',
            '/orders/:order_id': 'order'
        },

        indexPage: '/home',

        squenceNum: 0,

        add: function(controller){
            var page = this;

            controller.page = page;
            controller.squenceId = page.squenceNum = page.squenceNum + 1;

            return Page.__super__.add.apply(page, arguments);
        },

        // 页面初始化
        init: function(){
            var page = this;

            // 所有class="j-nav" data-nav="/xxx"的点击会跳转到/xxx
            this.el.delegate('.j-nav', 'tap', function(e){
                page.navigate($(e.currentTarget).attr('data-nav'));
            });

            var params = util.parseURL(location.href).params,
                target;
            if(params.path){
                target = params.path;
            }else if(!location.hash || location.hash === '#'){
                target = page.indexPage;
            }

            if(target){
                setTimeout(function(){
                    page.navigate(target);
                }, 0);
            }
        }
    });

    var page = new Page({
        el: $('#main-container')
    });

    Spine.Route.setup();

});