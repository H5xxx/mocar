define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var CarSeries = require('./common').sub({
        el: $('#car-series'),

        template: 'template-series',

        getData: function(params, callback){
            var data = {
                brand_name: Brand.findByAttribute('brand_id', params.brand_id).brand_name,
                series_name: params.series_id,
                model_name: Model.findByAttribute('model_id', params.model_id).model_name,
                list: Model.getDisplacementById(params.model_id)
            };

            callback(null, data);
        }
    });

    return CarSeries;
});