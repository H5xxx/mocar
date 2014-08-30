define(function(require, exports) {
    var Brand = require('../model/brand');

    var CarSeries = require('./common').sub({
        el: $('#car-series'),

        template: 'template-series',

        getData: function(params, callback){
            var data = {
                brand_name: Brand.findByAttribute('brand_id', params.brand_id).brand_name,
                list: Brand.getSeriesByBrandId(params.brand_id)
            };

            callback(null, data);
        }
    });

    return CarSeries;
});