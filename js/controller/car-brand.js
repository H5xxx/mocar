define(function(require, exports) {
    var Transitions = require('../component/transitions');
    var Brand = require('../model/brand');

    var CarModel = Spine.Controller.create({
        init: function() {
            $.ajax({
                url: 'http://cybwx.sinaapp.com/service.php',
                data: {
                    m: 'getCarBrandFast'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(data) {
                    data = data.data;
                    console.log(data);
                    var brand;
                    for (var i = 0; i < data.length; i++) {
                        brand = Brand.create(data[i]);
                    }
                },
                error: function() {
                    alert('getCarBrandFast 超时');
                }
            });
        },
        activate: Transitions.fadein,
        deactivate: Transitions.fadeout
    });
    return CarModel;
});