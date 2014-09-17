define(function(require, exports) {
    var util = require('../component/util');
    var Order = require('../model/order');

    var OrderList = require('./common').sub({
        el: $('#user-order-list'),

        title: '订单详情',

        template: 'template-user-order',

        getData: function(params, callback) {

            util.finish([
                Order.fetchDetail(params)
            ], function(order) {

                callback(null, {
                    order: order
                });

                var s = new iScroll('j-user-order-container');
            });
        }
    });

    return OrderList;
});