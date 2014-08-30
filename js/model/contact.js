define(function(require, exports) {
    var Contact = require('./common').sub();

    Contact.configure('Contact', 'id', 'name', 'cityCode','city', 'address', 'phone');

    Contact.extend({
        url: 'http://api.mocar.cn/user/${uid}/contacts'
    });

    return Contact;
});