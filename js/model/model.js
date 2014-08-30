define(function(require, exports) {
    var Model = Spine.Model.sub();

    Model.configure('Model', 'id', 'model', 'suffix');

    Model.extend({
        fetch: function(params, callback){
            $.getJSON('http://api.mocar.cn/automobile/brands/1/families/1/models', function(list){

                list.forEach(function(item){
                    Model.create(item);
                });

                callback(null, {
                    list: list
                });
            });
        }
    });
    return Model;
});