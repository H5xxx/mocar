define(function(require, exports) {
	var config = require('../component/config');
    var Model = require('./common').sub();

    Model.configure('Model', 'id', 'model', 'suffix', 'brandId', 'familyId');

    Model.extend({
        url: config.API_HOST + '/automobile/brands/${brand_id}/families/${series_id}/models'
    });
    return Model;
});