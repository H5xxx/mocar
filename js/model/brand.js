define(function(require, exports) {
    var Brand = Spine.Model.sub();
    Brand.configure('Brand', ['brand_id', 'brand_name', 'letter', 'logo_img_url', 'series_names', 'series_ids']);

    Brand.extend({
        getSeries: function() {
            var item = {};
            var list = [];
            for (var i = 0, l = this.series_ids.length; i < l; i++) {
                item.name = this.series_names[i];
                item.id = this.series_ids[i];
                list.push(item);
            }
            return list;
        }
    });
    return Brand;
});