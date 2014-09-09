define(function(require, exports) {
    var util = require('../component/util');

    var Common = Spine.Model.sub();

    Common.extend({
        url: '',

        fetch: function(params, callback){
            var Model = this;

            var fetch = function(cb){
                var fetched = Model.fetched = Model.fetched || {},
                    url = util.format(Model.url, params);

                // with cache
                if(fetched[url]){
                    cb(null, fetched[url]);

                // without cache
                }else{
                    $.getJSON(url, function(list){

                        list.forEach(function(item){
                            Model.create(item);
                        });

                        // cache result
                        fetched[url] = list;

                        cb(null, list);
                    });
                }

            };

            return callback ? fetch(callback) : fetch;
        }
    });
    return Common;
});