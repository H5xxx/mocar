define(function(require, exports) {
    var Brand = require('./common').sub();

    Brand.configure('Brand', 'id', 'brand', 'latter');

    Brand.extend({
        url: 'http://api.mocar.cn/automobile/brands'
    });

    return Brand;
});