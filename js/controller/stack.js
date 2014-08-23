define(function(require, exports) {
    var CarBrand = require('./car-brand');
    var CarSeries = require('./car-series');
    var Posts = Spine.Stack.sub({
        controllers: {
            brand: CarBrand,
            series: CarSeries
        }
    });

    var posts = new Posts();
    return posts;
});