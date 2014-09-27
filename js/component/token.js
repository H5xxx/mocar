define(function(require, exports) {
    var config = require('./config');
    var util = require('./util');
    var tokenKey = 'accessToken';

    var isReady = false;

    var updateToken = function(code, cb) {
        $.ajax({
            url: config.API_HOST + '/authority/token?credential=WX' + code,
            success: function(data) {
                var accessToken = data.accessToken;
                try {
                    data.code = code;
                    localStorage[tokenKey] = JSON.stringify(data);
                } catch (e) {
                    console.log(e);
                }
                cb(accessToken);

            }
        });
    };

    var init = function(callback) {
        var url = util.parseURL(location.href);
        var code = url.params.code;
        if (!code) {
            alert('no param code');
        } else {
            var cb = function(accessToken) {
                $(document).on('ajaxBeforeSend', function(e, xhr, options) {
                    xhr.setRequestHeader('Access-Token', accessToken);
                });
                callback();
            };
            var token;
            try {
                token = JSON.parse(localStorage[tokenKey] || "");
                if (token && token.accessToken) {
                    cb(token.accessToken);
                    // return;
                }
            } catch (e) {

            }
            delete localStorage[tokenKey];
            updateToken(code, cb);
        }
    };

    var ready = function(callback){
        if(isReady){
            callback();
        }else{
            init(function(err){
                if(!err){
                    isReady = true;
                }
                callback(err);
            });
        }
    };

    return {
        updateToken: updateToken,
        init: init,
        ready: ready
    };
});