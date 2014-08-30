define(function(require, exports) {
    var util = require('../component/util');

    var Brand = require('../model/brand');

    var CarBrand = require('./common').sub({
        el: $('#car-brand'),

        template: 'template-brand',

        getData: function(params, callback){
            util.finish([
                function(cb){ Brand.fetch(params, cb) }
            ], function(list){
                callback(null, {
                    list: list
                });
            });
        }
    });

    return CarBrand;
});