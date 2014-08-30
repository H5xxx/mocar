define(function(require, exports) {

    require('../mockAjax');

    var Page = Spine.Stack.sub({

        // 所有controller
        controllers: {
            'home': require('../controller/car-home'),
            'brand': require('../controller/car-brand'),
            'series': require('../controller/car-series'),
            'model': require('../controller/car-model'),
            'displacement': require('../controller/car-displacement'),
            'service': require('../controller/car-service'),
            'schedule': require('../controller/car-schedule'),
            'success': require('../controller/car-success')
        },

        // 每个controller对应一个url，从中取到参数
        routes: {
            '/': function(){
                this.navigate('/brand');
            },
            '/home': 'home',
            '/brand': 'brand',
            '/brand/:brand_id/series': 'series',
            '/brand/:brand_id/series/:series_id/model': 'model',
            '/brand/:brand_id/series/:series_id/model/:model_id/displacement': 'displacement',
            '/brand/:brand_id/series/:series_id/model/:model_id/displacement/:displacement_id/service': 'service',
            '/brand/:brand_id/series/:series_id/model/:model_id/service': 'service',
            '/service': 'service',
            '/service/:series_id/schedule': 'schedule',
            '/schedule': 'schedule',
            '/success': 'success'
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

    var page = new Page({
        el: $('#main-container')
    });

    page.manager.controllers.forEach(function(controller){
        controller.page = page;
    });

    Spine.Route.setup();

});