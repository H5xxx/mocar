define(function(require, exports) {
    var Vehicle = require('./common').sub();

    Vehicle.configure('Vehicle', 'id', 'modelId', 'model','plate', 'vid');

    Vehicle.extend({
        url: 'http://api.mocar.cn/user/${uid}/vehicles'
    });

    return Vehicle;
});