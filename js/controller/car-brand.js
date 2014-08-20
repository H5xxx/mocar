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
                success: function(data){
                    console.log(data);
                },
                error:function(){
                    alert('getCarBrandFast 超时');
                }
            });
        },
        activate: Transitions.fadein,
        deactivate: Transitions.fadeout
    });
    return CarModel;
});