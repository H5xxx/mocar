define(function(require, exports) {

    var Page = Spine.Stack.sub({

        controllers: {
            'brand': require('../controller/car-brand'),
            'series': require('../controller/car-series'),
            'model': require('../controller/car-model'),
            'displacement': require('../controller/car-displacement')
        },

        routes: {
            '/': function(){
                this.navigate('/brand');
            },
            '/brand': 'brand',
            '/brand/:bid/series': 'series',
            '/brand/:bid/series/:sid/model': 'model',
            '/brand/:bid/series/:sid/model/:mid/displacement': 'displacement'
        },

        init: function(){
            var page = this;

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