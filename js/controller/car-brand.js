define(function(require, exports) {
    var Transitions = require('../component/transitions');
    var Brand = require('../model/brand');

    var CarModel = Spine.Controller.create({
        elements: {
            '.j-brand-list': 'brandList'
        },
        events: {
            'click .brand-item': 'enterSeries'
        },
        init: function() {
            $.ajax({
                url: 'http://cybwx.sinaapp.com/service.php',
                data: {
                    m: 'getCarBrandFast'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: this.proxy(function(data) {
                    data = data.data;
                    console.log(data);
                    var brand;
                    for (var i = 0; i < data.length; i++) {
                        brand = Brand.create(data[i]);
                    }
                    this.proxy(this.showAll());
                }),
                error: function() {
                    alert('getCarBrandFast 超时');
                }
            });
        },
        showAll: function() {
            var html = template('template-item', {
                data: Brand.all()
            });
            this.brandList.html(html);
        },
        enterSeries: function(){
            
        },
        activate: Transitions.fadein,
        deactivate: Transitions.fadeout
    });
    return CarModel;
});