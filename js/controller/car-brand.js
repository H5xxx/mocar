define(function(require, exports) {
    var Brand = require('../model/brand');

    var CarBrand = require('./common').sub({
        el: $('#car-brand'),

        template: 'template-brand',

        getData: function(params, callback){
            Brand.fetch(params, callback);
        }
    });

    return CarBrand;
});