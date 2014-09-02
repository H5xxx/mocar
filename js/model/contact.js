define(function(require, exports) {
	var config = require('../component/config');
    var Contact = require('./common').sub();

    Contact.configure('Contact', 'id', 'name', 'cityCode','city', 'address', 'phone');

    Contact.extend({
        url: config.API_HOST + '/user/${uid}/contacts'
    });

    return Contact;
});