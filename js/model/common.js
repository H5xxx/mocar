define(function(require, exports) {
    var util = require('../component/util');

    var Common = Spine.Model.sub();

    Common.extend({
        url: '',

        fetch: function(params, callback){
            var Model = this;

            var fetch = function(cb){
                $.getJSON(util.format(Model.url, params), function(list){

                    list.forEach(function(item){
                        Model.create(item);
                    });

                    cb(null, list);
                });
            };

            return callback ? fetch(callback) : fetch;
        }
    });
    return Common;
});