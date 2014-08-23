define(function(require, exports) {
    var Transitions = require('../component/transitions');
    var Model = require('../model/model');

    var CarModel = Spine.Controller.create({
        elements: {
            '.j-model-container': 'modelContainer'
        },
        init: function() {},
        showModel: function(series_id) {
            // http://cybwx.sinaapp.com/service.php?m=getCarModelsFast&series_id=12
            $.ajax({
                url: 'http://cybwx.sinaapp.com/service.php',
                data: {
                    m: 'getCarModelsFast',
                    series_id: series_id
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: this.proxy(function(data) {
                    data = data.data;
                    console.log(data);
                    var model;
                    for (var i = 0; i < data.length; i++) {
                        model = Model.create(data[i]);
                    }
                    // this.proxy(this.showModel());
                    var html = template('template-model-item', {
                        data: Model.all()
                    });
                    this.modelContainer.html(html);

                }),
                error: function() {
                    alert('getCarModelFast 超时');
                }
            });
        },
        activate: Transitions.fadein,
        deactivate: Transitions.fadeout
    });
    var carModel = new CarModel({
        el: $('#car-model')
    });
    var sm = require('../component/state-machine');
    sm.add(carModel);
    return carModel;
});