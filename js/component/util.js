define(function(require, exports) {
    var format = function(template, vars){
        return template.replace(/\$\{([^\{\}]*)\}/g, function(_, name){
            return vars[name.trim()] || '';
        });
    };

    var finish = function(tasks, callback){
        var left = tasks.length,
            results = [],
            over = false;

        tasks.forEach(function(task, i){
            task(function(err, result){
                if(over){
                    return;
                }

                if(err){
                    over = true;
                    throw err;
                }else{
                    results[i] = result;

                    left--;

                    if(!left){
                        callback.apply(null, results);
                    }
                }
            });
        });
    };

    var title = function(t){
        return t ? $('title').text(t).text() : $('title').text();
    };

    return {
        format: format,
        finish: finish,
        title: title
    };
});