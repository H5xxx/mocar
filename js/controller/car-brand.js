define(function(require, exports) {
    var util = require('../component/util');
    var config = require('../component/config');

    var Brand = require('../model/brand');

    var CarBrand = require('./common').sub({
        el: $('#car-brand'),

        title: '选择品牌',

        template: 'template-brand',

        getData: function(params, callback) {
            util.finish([
                Brand.fetch(params)
            ], function(list) {
                template.helper('getBrandImg', function(id) {
                    return config.API_HOST + '/images/automobile-signs/' + id + '.png';
                });

                callback(null, {
                    list: list
                });
                var s = new iScroll('j-brand-container');
            });
        }
    });

    return CarBrand;
});