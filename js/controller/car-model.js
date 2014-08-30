define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var CarModel = require('./common').sub({
        el: $('#car-model'),

        template: 'template-model',

        getData: function(params, callback){
            var data = {
                brand_name: Brand.findByAttribute('brand_id', params.brand_id).brand_name,
                series_name: params.series_id
            };

            // http://cybwx.sinaapp.com/service.php?m=getCarModelsFast&series_id=12
            $.ajax({
                url: 'http://cybwx.sinaapp.com/service.php',
                data: {
                    m: 'getCarModelsFast',
                    series_id: params.series_id
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(result) {
                    var list = result.data;
                    
                    list.forEach(function(item){
                        item.model_id = item.models_id;
                        item.model_name = item.description;
                        Model.create(item);
                    });

                    data.list = list;

                    callback(null, data);
                },
                error: function() {
                    callback(err || 'getCarBrandFast 超时');
                }
            });

            callback(null, data);
        }
    });

    return CarModel;
});