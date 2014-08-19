define(function(require, exports) {
    var Transitions = require('../component/transitions');

    var CarSeries = Spine.Controller.create({
        init: function() {},
        activate: Transitions.fadein,
        deactivate: Transitions.fadeout
    });
    return CarSeries;
});