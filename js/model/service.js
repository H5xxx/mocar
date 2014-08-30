define(function(require, exports) {
    var Service = require('./common').sub();

    Service.configure('Service', 'id', 'description', 'name', 'price', 'slogan', 'parts');

    Service.extend({
        url: 'http://api.mocar.cn/models/generic/services'
    });

    return Service;
});