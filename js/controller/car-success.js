/*
 * 预约成功 页面的controller
 */
define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');

    var CarSuccess = require('./common').sub({

        el: $('#car-success'),

        template: 'template-success'
    });

    return CarSuccess;
});