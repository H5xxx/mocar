define(function(require, exports) {
	var config = require('../component/config');
    var Series = require('./common').sub();

    Series.configure('Series', 'id', 'prefix', 'family', 'brandId');

    Series.extend({
        url: config.API_HOST + '/automobile/brands/${brand_id}/families'
    });

    return Series;
});