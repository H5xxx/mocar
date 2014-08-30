define(function(require, exports) {
    var Brand = require('../model/brand');

    var CarBrand = require('./common').sub({
        el: $('#car-brand'),

        template: 'template-brand',

        getData: function(params, callback){
            $.ajax({
                url: 'http://cybwx.sinaapp.com/service.php',
                data: {
                    m: 'getCarBrandFast'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(result) {
                    var list = result.data;

                    list.forEach(function(item){
                        Brand.create(item);
                    });

                    callback(null, {
                        list: list
                    });
                },
                error: function(err) {
                    callback(err || 'getCarBrandFast 超时');
                }
            });
        }
    });

    return CarBrand;
});