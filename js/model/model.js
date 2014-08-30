define(function(require, exports) {
    var Model = require('./common').sub();

    Model.configure('Model', 'id', 'model', 'suffix');

    Model.extend({
        url: 'http://api.mocar.cn/automobile/brands/${brand_id}/families/${series_id}/models'
    });
    return Model;
});