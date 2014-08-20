define(function(require, exports) {
    var Brand = Spine.Model.sub();
    Brand.configure('Brand', 'brand_id', 'brand_name', 'letter', 'logo_img_url', 'series_names', 'series_ids');

    Brand.extend({
        getSeries: function(brand_id) {
            var current = this.findByAttribute('brand_id', brand_id);
            var item = {};
            var list = [];
            var names = current.series_names.split(',');
            var ids = current.series_ids.split(',');
            for (var i = 0, l = ids.length; i < l; i++) {
                item.name = names[i];
                item.id = ids[i];
                list.push(item);
            }
            return list;
        }
    });
    return Brand;
});