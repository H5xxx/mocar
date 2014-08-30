define(function(require, exports) {
    var util = require('../component/util');

    var Brand = require('../model/brand');
    var Series = require('../model/series');

    var CarSeries = require('./common').sub({
        el: $('#car-series'),

        template: 'template-series',

        getData: function(params, callback){
            util.finish([
                function(cb){ Series.fetch(params, cb) },
                function(cb){ Brand.fetch(params, cb) }
            ], function(list){
                data = $.extend(
                    {
                        list: list
                    },
                    Brand.find(params.brand_id)
                );

                callback(null, data);
            });
        }
    });

    return CarSeries;
});