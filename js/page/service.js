define(function(require, exports) {
    var CarBrand = require('../controller/car-brand');
    var CarSeries = require('../controller/car-series');
    var Service = Spine.Controller.create({
        el: $("body"),
        elements: {
            '#car-brand': 'carBrandEl',
            '#car-series': 'carSeriesEl'
        },
        init: function() {
            //     var carBrand = new CarBrand({
            //         el: this.carBrandEl
            //     });
            // var carSeries = new CarSeries({
            //     el: this.carSeriesEl
            // });
            // var list = {};
            // list.brand = carBrand;
            // list.series = carSeries;

            // carBrand.active();
            // Spine.bind('sm', function(page){
            //     console.log(page);
            //     list[page].active();
            // });
        }
    });
    new Service().init();
});