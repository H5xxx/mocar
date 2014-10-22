define(function(require, exports) {
	var config = require('../component/config');
    var Banner = require('./common').sub();

    Banner.configure('Banner', 'id', 'title', 'tag', 'color', 'uri');

    Banner.extend({
        url: config.API_HOST + '/advertisement/banners'
    });

    return Banner;
});