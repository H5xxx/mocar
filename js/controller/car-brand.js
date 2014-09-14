define(function(require, exports) {
    var util = require('../component/util');
    var config = require('../component/config');
    var Popup = require('../widgets/Popup');
    var Brand = require('../model/brand');

    var CarBrand = require('./common').sub({
        el: $('#car-brand'),

        title: '选择品牌',

        template: 'template-brand',

        getData: function(params, callback) {
            util.finish([
                Brand.fetch(params)
            ], function(list) {
                // template.helper('getBrandImg', function(id) {
                //     return config.API_HOST + '/images/automobile-signs/' + util.formatNum(id, 3) + '.png';
                // });
                list.forEach(function(item) {
                    item.icon = config.STATIC_HOST + '/images/automobile-signs/' + util.formatNum(item.id, 3) + '.png';
                });

                callback(null, {
                    list: list
                });
                var s = new iScroll('j-brand-container');
                setTimeout(function(){
                    Popup.open("");
                    setTimeout(function(){
                        Popup.close();
                    }, 0);
                },600);
            });
        }
    });

    return CarBrand;
});