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
            var carBrand = new CarBrand({
                el: this.carBrandEl
            });
            var carSeries = new CarSeries({
                el: this.carSeriesEl
            });
            var sm = new StateMachine();
            sm.add(carBrand);
            sm.add(carSeries);
            carBrand.active();
        }
    });
    new Service().init();
});