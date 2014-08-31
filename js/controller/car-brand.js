define(function(require, exports) {
    var util = require('../component/util');

    var Brand = require('../model/brand');

    var CarBrand = require('./common').sub({
        el: $('#car-brand'),

        title: '选择品牌',

        template: 'template-brand',

        getData: function(params, callback){
            util.finish([
                Brand.fetch(params)
            ], function(list){
                callback(null, {
                    list: list
                });
                var s = new iScroll('j-brand-container');
            });
        }
    });

    return CarBrand;
});