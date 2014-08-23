define(function(require, exports) {
    var Transitions = require('../component/transitions');
    var Brand = require('../model/brand');

    var CarSeries = Spine.Controller.create({
        elements: {
            '.j-series-list': 'seriesList'
        },
        init: function() {},
        showSeries: function(id) {
            var currentBrand = Brand.findByAttribute('brand_id', id);
            var seriess = Brand.getSeriesById(id);
            var html = template('template-series-item', {
                brand_name: currentBrand.brand_name,
                data: seriess
            });
            this.seriesList.html(html);
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