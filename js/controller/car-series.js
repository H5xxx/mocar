/*
 * 选择车系
 */
define(function(require, exports) {
    var util = require('../component/util');

    var Brand = require('../model/brand');
    var Series = require('../model/series');

    var CarSeries = require('./common').sub({
        el: $('#car-series'),

        title: '选择车系',

        template: 'template-series',

        getData: function(params, callback){
            util.finish([
                Series.fetch(params),
                Brand.fetch(params)
            ], function(list){
                data = $.extend(
                    {
                        list: list
                    },
                    Brand.find(params.brand_id)
                );

                callback(null, data);
                var s = new iScroll('j-series-container');

            });
        }
    });

    return CarSeries;
});