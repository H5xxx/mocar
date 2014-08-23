define(function(require, exports) {
    var Brand = Spine.Model.sub();
    Brand.configure('Brand', 'models_id', 'description', 'year', 'models_img_url', 'model', 'f_series_id');

    Brand.extend({
        getDisplacementById: function(model_id) {
            var current = this.findByAttribute('brand_id', brand_id);
            var list = [];
            var names = current.series_names.split(',');
            var ids = current.series_ids.split(',');
            for (var i = 0, l = ids.length; i < l; i++) {
                var item = {};
                item.series_name = names[i];
                item.series_id = ids[i];
                list.push(item);
            }
            return list;
        }
    });
    return Brand;
});