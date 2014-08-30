define(function(require, exports) {
    var Displacement = require('./common').sub();

    Displacement.configure('Displacement', 'id', 'displacement', 'description');

    Displacement.extend({
        url: 'http://api.mocar.cn/automobile/brands/${brand_id}/families/${series_id}/models/${model_id}/displacements'
    });

    return Displacement;
});