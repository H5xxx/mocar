define(function(require, exports) {
    var Transitions = function() {};
    Transitions.fn = Transitions.prototype;

    Transitions.fn.movein = function(direction) {
        direction = direction || 'right';

        this.el.removeClass('moveout');
        this.el.addClass('movein');
        this.el.addClass(direction + 'in');
    };

    Transitions.fn.moveout = function() {
        this.el.removeClass('movein leftin rightin');
        this.el.addClass('moveout');
    };

    return new Transitions();
});