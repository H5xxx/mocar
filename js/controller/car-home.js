/*
 * 服务列表 页面的controller
 */
define(function(require, exports) {
    var config = require('../component/config');
    var util = require('../component/util');

    var Service = require('../model/service');
    var Vehicle = require('../model/vehicle');

    var CarHome = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-home'),

        title: '摩卡汽车服务',

        template: 'template-home',

        getData: function(params, callback) {
            this.params = params;

            callback(null, {});
        },

        render: function(){
            this.constructor.__super__.render.apply(this, arguments);

            var self = this,
                listWrapper = this.el.find('[data-role="service-list"]'),
                params = this.params;

            util.finish([
                Service.fetch(params),
                Vehicle.fetch({uid:'me'})
            ], function(services, vehicles) {
                services.forEach(function(service) {
                    service.icon = config.STATIC_HOST + '/images/services/' + util.formatNum(service.id, 3) + '.png';
                });
                var next, lastModelId;
                try{
                    //用户最近选的车
                    lastModelId = localStorage['modelId'];
                }catch(e){

                }
                if(vehicles && vehicles.length){
                    //如果用户提交过订单，用最新下单的车辆
                    next = 'cart';
                }else if(lastModelId){
                    //如果用户之前没提交过订单，但经过了完整的选车流程，使用之前选的车
                    next = 'model/' + lastModelId + '/cart'
                }else{
                    //选车去吧
                    next = 'brand';
                }

                listWrapper.html(template('template-home-list', {
                    services: services,
                    next: next
                }));

                //当前页面是从下单成功页面过来的
                if(sessionStorage && sessionStorage['success']){
                    delete sessionStorage['success'];
                    setTimeout(function(){
                        window.history.replaceState({referrer:'success',curr:1},'', location.hash);
                        window.history.pushState({referrer:'success', curr: 2}, '', location.hash);
                        window.onpopstate = function(event){
                            //下单成功之后，从success页面转到服务首页后，设置为不允许后退
                            if(event.state && event.state.referrer == 'success'){
                                self.page.navigate(location.hash);
                                setTimeout(function(){
                                    window.history.pushState({referrer:'success', curr:3}, '', location.hash);
                                });
                            }
                        }                        
                    });
                }
            });
        }
    });

    return CarHome;
});