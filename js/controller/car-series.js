define(function(require, exports) {
    var Transitions = require('../component/transitions');
    var Brand = require('../model/brand');

    var CarSeries = Spine.Controller.create({
        elements: {
            '.j-series-container': 'seriesContainer'
        },
        events: {
            'click .series-item': 'enterModel'
        },
        init: function() {},
        showSeries: function(id) {
            var currentBrand = Brand.findByAttribute('brand_id', id);
            var seriess = Brand.getSeriesById(id);
            var html = template('template-series-item', {
                brand_name: currentBrand.brand_name,
                data: seriess
            });
            this.seriesContainer.html(html);
        },
        enterModel: function(e) {
            var id = e.currentTarget.dataset.id;
            var name = e.currentTarget.dataset.name;
            var carModel = require('./car-model');
            carModel.showModel(id, name);
            carModel.active();
        },
        activate: Transitions.fadein,
        deactivate: Transitions.fadeout
    });
    var carSeries = new CarSeries({
        el: $('#car-series')
    });
    var sm = require('../component/state-machine');
    sm.add(carSeries);
    return carSeries;
});