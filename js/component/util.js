define(function(require, exports) {
    var format = function(template, vars){
        return template.replace(/\$\{([^\{\}]*)\}/g, function(_, name){
            return vars[name.trim()] || '';
        });
    };

    return {
        format: format
    };
});