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
                list.forEach(function(s){
                    try{
                        s = Series.find(s.id);
                        s.brandId = params.brand_id;
                        s.save();
                    }catch(e){
                        debugger;
                    }
                });
                data = $.extend(
                    {
                        list: list
                    },
                    Brand.find(params.brand_id)
                );
                try{
                    //需要在本地记住上次选择的车型
                    localStorage["brand"] = data.brand;
                    localStorage["brandId"] = params.brand_id;
                }catch(e){

                }
                callback(null, data);
                var s = new iScroll('j-series-container');

            });
        }
    });

    return CarSeries;
});