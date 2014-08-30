define(function(require, exports) {
    var util = require('../component/util');

    var Brand = require('../model/brand');
    var Series = require('../model/series');
    var Model = require('../model/model');

    var CarModel = require('./common').sub({
        el: $('#car-model'),

        template: 'template-model',

        getData: function(params, callback){
            util.finish([
                function(cb){ Model.fetch(params, cb) },
                function(cb){ Series.fetch(params, cb) },
                function(cb){ Brand.fetch(params, cb) }
            ], function(list){
                data = $.extend(
                    {
                        list: list
                    },
                    Brand.find(params.brand_id),
                    Series.find(params.series_id)
                );

                callback(null, data);
            });
        }
    });

    return CarModel;
});