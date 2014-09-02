define(function(require, exports) {
	var config = require('../component/config');
    var City = require('./common').sub();

    City.configure('City', 'province', 'cities');

    City.extend({
        url: config.API_HOST + '/location/cities'
    });

    return City;
});