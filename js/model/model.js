define(function(require, exports) {
    var Model = Spine.Model.sub();
    Model.configure('Model', 'models_id', 'description', 'year', 'models_img_url', 'model', 'f_series_id');

    Model.extend({
        getDisplacementById: function(model_id) {
            var current = this.findByAttribute('model_id', model_id);
            var list = [];
            var models = current.series_models.split(',');
            for (var i = 0, l = models.length; i < l; i++) {
                var item = {};
                item.displacement_name = models[i];
                list.push(item);
            }
            return list;
        }
    });
    return Model;
});