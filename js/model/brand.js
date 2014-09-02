define(function(require, exports) {
	var config = require('../component/config');
    var Brand = require('./common').sub();

    Brand.configure('Brand', 'id', 'brand', 'latter');

    Brand.extend({
        url: config.API_HOST + '/automobile/brands'
    });

    return Brand;
});