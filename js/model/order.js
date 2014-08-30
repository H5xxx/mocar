define(function(require, exports) {
    var Order = require('./common').sub();

    Order.configure('Order', 'id', 'status', 'modified','model', 'plate', 'title', 'date');

    Order.extend({
        url: 'http://api.mocar.cn/user/${uid}/orders'
    });

    return Order;
});