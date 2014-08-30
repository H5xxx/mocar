define(function(require, exports) {
    var Brand = require('../model/brand');
    var Series = require('../model/series');
    var Model = require('../model/model');
    var Displacement = require('../model/displacement');

    var CarDisplacement = require('./common').sub({
        el: $('#car-displacement'),

        template: 'template-displacement',

        getData: function(params, callback){
            Displacement.fetch(params, function(err, data){
                data = $.extend(
                    data,
                    Brand.find(params.brand_id),
                    Series.find(params.series_id),
                    Model.find(params.model_id)
                );

                callback(null, data);
            });
        }
    });

    return CarDisplacement;
});