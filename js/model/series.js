define(function(require, exports) {
    var Series = Spine.Model.sub();

    Series.configure('Series', 'id', 'prefix', 'family');

    Series.extend({
        fetch: function(params, callback){
            $.getJSON('http://api.mocar.cn/automobile/brands/1/families', function(list){

                list.forEach(function(item){
                    Series.create(item);
                });

                callback(null, {
                    list: list
                });
            });
        }
    });
    return Series;
});