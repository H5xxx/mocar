define(function(require, exports) {
    var Transitions = require('../component/transitions');
    var Brand = require('../model/brand');

    var CarModel = Spine.Controller.create({
        elements: {
            '.j-model-container': 'modelContainer'
        },
        init: function() {},
        showModel: function(id) {
            var currentBrand = Brand.findByAttribute('brand_id', id);
            var models = Brand.getModelById(id);
            var html = template('template-model-item', {
                brand_name: currentBrand.brand_name,
                data: models
            });
            this.modelContainer.html(html);
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