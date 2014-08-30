define(function(require, exports) {
    var City = require('./common').sub();

    City.configure('City', 'province', 'cities');

    City.extend({
        url: 'http://api.mocar.cn/location/cities'
    });

    return City;
});