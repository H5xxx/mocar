define(function(require, exports) {
    var Brand = require('../model/brand');
    var Series = require('../model/series');

    var CarSeries = require('./common').sub({
        el: $('#car-series'),

        template: 'template-series',

        getData: function(params, callback){
            Series.fetch(params, function(err, data){
                data = $.extend(data, Brand.find(params.brand_id));
                callback(null, data);
            });
        }
    });

    return CarSeries;
});