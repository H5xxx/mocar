define(function(require, exports) {
    var StateMachine = require('../component/state-machine');
    var CarBrand = require('../controller/car-brand');
    var CarSeries = require('../controller/car-series');
    var Service = Spine.Controller.create({
        el: $("body"),
        elements: {
            '#car-brand': 'carBrandEl',
            '#car-series': 'carSeriesEl'
        },
        init: function() {
            var carSeries = new CarSeries({
                el: this.carSeriesEl
            });
            carSeries.showSeries(1);
            var sm = new StateMachine();
            sm.add(carSeries);
            carSeries.active();
        }
    });
    new Service().init();
});