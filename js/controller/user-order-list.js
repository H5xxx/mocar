define(function(require, exports) {
    var util = require('../component/util');
    var Order = require('../model/order');

    var OrderList = require('./common').sub({
        el: $('#user-order-list'),

        title: '我的订单',

        template: 'template-user-order-list',

        getData: function(params, callback) {

            util.finish([
                Order.fetchList(params)
            ], function(list) {

                callback(null, {
                    list: list
                });

                var s = new iScroll('j-user-order-list-container');
            });
        }
    });

    return OrderList;
});