define(function(require, exports) {
    var util = require('../component/util');
    // test
    // $(document).on('ajaxBeforeSend', function(e, xhr, options) {
    //     console.log('haha');
    //     xhr.setRequestHeader('Access-Token', 'asdfasdf');
    // });
    var AccessToken = require('./common').sub({
        init: function() {
            var url = util.parseURL(location.href);
            var code = url.params.code;
            var me = this;
            if (!code) {
                alert('no param code');
            } else {
                me.updateToken(code);
            }
        },
        updateToken: function(code) {
            $.ajax({
                url: '/authority/token?credential=' + code,
                success: function(data) {
                    var accessToken = data.accessToken;
                    $(document).on('ajaxBeforeSend', function(e, xhr, options) {
                        console.log('haha');
                        xhr.setRequestHeader('Access-Token', accessToken);
                    });

                }
            });
        }
    });

    return AccessToken;
});