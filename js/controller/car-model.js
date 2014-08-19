define(function(require, exports) {
    var Transitions = require('../component/transitions');

    var CarModel = Spine.Controller.create({
        init: function() {},
        activate: Transitions.fadein,
        deactivate: Transitions.fadeout
    });
    return CarModel;
});