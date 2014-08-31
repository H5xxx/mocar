/*
 * 预约成功 页面的controller
 */
define(function(require, exports) {
	var util = require('../component/util');
    var Service = require('../model/Service');
    var Order = require('../model/order');
    
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var CarSuccess = require('./common').sub({

        el: $('#car-success'),
        
        title : '预约提交成功',

        template: 'template-success',

        getData: function(params, callback) {
            var self = this;
            var currentService, currentVehicle;
            //currentService = Service.find(params.service_id);
            var currentOrder = Order.find('-1');
            currentService = currentOrder.__currentService;
            currentVehicle = currentOrder.__currentVehicle;
            var data = $.extend(params, {
            	currentOrder: currentOrder,
            	currentService: currentService,
            	currentVehicle: currentVehicle
            });
			callback(null, data);

        },
        // 渲染内容
        render: function(data) {
            var self = this;
            var html = template(this.template, data);

            this.el.html(html);
            var s = new iScroll('j-success-container');
        },
        activate: function(params) {
            var self = this;
            if(!params.service_id){
            	this.page.navigate('/home');
                return;
            }
            if(!params.model_id){
            	this.page.navigate('/service/' + params.service_id + '/brand');
                return;
            }
            //TODO Order.find("-1") first
            try {
                this.currentOrder = Order.find("-1");
            } catch (e) {

            }
            if (!this.currentOrder) {
                this.page.navigate('/service/' + params.service_id + '/model/' + params.model_id + '/cart');
                return;
            }
            self.getData(params, function(err, data) {
                $.extend(params, data);
                util.title(self.title);
                self.fadein();
                self.render(params);
            });
        }
    });

    return CarSuccess;
});