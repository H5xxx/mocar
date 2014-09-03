define(function(require, exports) {
    var config = require('../component/config');
    var util = require('../component/util');
    // test
    // $(document).on('ajaxBeforeSend', function(e, xhr, options) {
    //     console.log('haha');
    //     xhr.setRequestHeader('Access-Token', 'asdfasdf');
    // });
    var tokenKey = 'accessToken';
    var AccessToken = require('./common').sub({
        init: function() {
            var url = util.parseURL(location.href);
            var code = url.params.code;
            var me = this;
            if (!code) {
                alert('no param code');
            } else {
                var callback = function(accessToken){
                    $(document).on('ajaxBeforeSend', function(e, xhr, options) {
                        console.log('haha');
                        xhr.setRequestHeader('Access-Token', accessToken);
                    });
                }
                var token;
                try{
                    token = JSON.parse(localStorage[tokenKey] || "");
                    if(token && token.code == code && token.expiresAt > Date.now() && token.accessToken){
                        callback(token.accessToken);
                        return;
                    }
                }catch(e){

                }
                delete localStorage[tokenKey];
                me.updateToken(code, callback);
            }
        },
        updateToken: function(code, cb) {
            $.ajax({
                url: config.API_HOST +'/authority/token?credential=' + code,
                success: function(data) {
                    var accessToken = data.accessToken;
                    try{
                        data.code = code;
                        localStorage[tokenKey] = JSON.stringify(data);
                    }catch(e){
                        console.log(e);
                    }
                    cb(accessToken)

                }
            });
        }
    });

    return AccessToken;
});