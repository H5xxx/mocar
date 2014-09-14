define(function(require, exports) {
    var util = require('../component/util');

    var Brand = require('../model/brand');
    var Series = require('../model/series');
    var Model = require('../model/model');

    var CarModel = require('./common').sub({
        el: $('#car-model'),

        title: '选择车型',

        template: 'template-model',

        getData: function(params, callback){
            util.finish([
                Model.fetch(params),
                Series.fetch(params),
                Brand.fetch(params)
            ], function(modelList, seriesList, brandList){
                /*  每次重新调用Series.fetch， series里面的brandId（在car-series.js里面赋值的）
                    就又丢掉了，需要重新赋值
                */
                seriesList.forEach(function(s){
                    try{
                        s = Series.find(s.id);
                        s.brandId = params.brand_id;
                        s.save();
                    }catch(e){
                        debugger;
                    }
                });
                modelList.forEach(function(m){
                    m = Model.find(m.id);
                    m.brandId = params.brand_id;
                    m.familyId = params.series_id;
                    try{
                        m.save();
                    }catch(e){
                        debugger;
                    }
                });
                data = $.extend(
                    {
                        list: modelList
                    },
                    Brand.find(params.brand_id),
                    Series.find(params.series_id)
                );
                try{
                    //需要在本地记住上次选择的车型
                    localStorage["brand"] = data.brand;
                    localStorage["brandId"] = params.brand_id;
                    localStorage["family"] = data.family;
                    localStorage["familyId"] = params.series_id;
                    localStorage["prefix"] = data.prefix;
                }catch(e){

                }
                callback(null, data);
                var s = new iScroll('j-model-container');

            });
        }
    });

    return CarModel;
});