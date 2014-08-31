define(function(require, exports) {
    var format = function(template, vars) {
        return template.replace(/\$\{([^\{\}]*)\}/g, function(_, name) {
            return vars[name.trim()] || '';
        });
    };

    var finish = function(tasks, callback) {
        var left = tasks.length,
            results = [],
            over = false;

        tasks.forEach(function(task, i) {
            task(function(err, result) {
                if (over) {
                    return;
                }

                if (err) {
                    over = true;
                    throw err;
                } else {
                    results[i] = result;

                    left--;

                    if (!left) {
                        callback.apply(null, results);
                    }
                }
            });
        });
    };

    var title = function(t) {
        return t ? $('title').text(t).text() : $('title').text();
    };

    var getDayArr = function(n) {
        function padding(num) {
            num = num + '';
            if (num.length == 1) {
                num = "0" + num;
            }
            return num;
        }

        function format(d) {
            d = new Date(d);
            var year = d.getFullYear();
            var month = padding(d.getMonth() + 1);
            var day = padding(d.getDate());
            return [year, month, day].join("-");
        }
        var retArr = [];
        d = new Date;
        retArr.push(format(d.valueOf()));
        while (--n) {
            d.setDate(d.getDate() + 1);
            retArr.push(format(d.valueOf()));
        }
        return retArr;
    };

    var parseURL = function(url) {
        url = url || location.href;
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    };


    return {
        format: format,
        finish: finish,
        title: title,
        getDayArr: getDayArr,
        parseURL: parseURL
    };
});