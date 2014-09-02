define(function(require, exports) {
	var config = require('../component/config');
    var Service = require('./common').sub();

    Service.configure('Service', 'id', 'description', 'name', 'price', 'slogan', 'parts');

    Service.extend({
        url: config.API_HOST + '/models/generic/services'
    });

    return Service;
});