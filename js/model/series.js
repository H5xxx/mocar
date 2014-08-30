define(function(require, exports) {
    var Series = require('./common').sub();

    Series.configure('Series', 'id', 'prefix', 'family');

    Series.extend({
        url: 'http://api.mocar.cn/automobile/brands/${brand_id}/families'
    });

    return Series;
});