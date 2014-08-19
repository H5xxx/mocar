define(function(require, exports) {
    var StateMachine = require('../component/state-machine');
    var CarModel = require('../controller/car-model');
    var CarSeries = require('../controller/car-series');
    var Service = Spine.Controller.create({
        el: $("body"),
        elements: {
            '#a': 'carModelEl',
            '#b': 'carSeriesEl'
        },
        init: function() {
            var carModel = CarModel.init({
                el: this.carModelEl
            });
            var carSeries = CarSeries.init({
                el: this.carSeriesEl
            });
            var sm = new StateMachine;
            sm.add(carModel);
            sm.add(carSeries);
            carModel.active();
            carSeries.active();

        }
    }).init();
});