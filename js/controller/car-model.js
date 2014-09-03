define(function(require, exports) {
    var util = require('../component/util');

    var Brand = require('../model/brand');
    var Series = require('../model/series');
    var Model = require('../model/model');

    var CarModel = require('./common').sub({
        el: $('#car-model'),

        title: '选择年款',

        template: 'template-model',

        getData: function(params, callback){
            util.finish([
                Model.fetch(params),
                Series.fetch(params),
                Brand.fetch(params)
            ], function(list){
                list.forEach(function(m){
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
                        list: list
                    },
                    Brand.find(params.brand_id),
                    Series.find(params.series_id)
                );

                callback(null, data);
                var s = new iScroll('j-model-container');

            });
        }
    });

    return CarModel;
});