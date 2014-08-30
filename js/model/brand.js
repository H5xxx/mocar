define(function(require, exports) {
    var Brand = Spine.Model.sub();

    Brand.configure('Brand', 'id', 'brand', 'latter');

    Brand.extend({
        fetch: function(params, callback){
            $.getJSON('http://api.mocar.cn/automobile/brands', function(list){

                list.forEach(function(item){
                    Brand.create(item);
                });

                callback(null, {
                    list: list
                });
            });
        }
    });
    return Brand;
});