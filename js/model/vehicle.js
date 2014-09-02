define(function(require, exports) {
	var config = require('../component/config');
    var Vehicle = require('./common').sub();

    Vehicle.configure('Vehicle', 'id', 'modelId', 'model','plate', 'vid');

    Vehicle.extend({
        url: config.API_HOST + '/user/${uid}/vehicles'
    });

    return Vehicle;
});