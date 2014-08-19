define(function(require, exports) {
    var Transitions = function() {};
    Transitions.fn = Transitions.prototype;

    Transitions.fn.fadein = function() {
        this.el.removeClass('fadeout');
        this.el.addClass('fadein');
    };
    Transitions.fn.fadeout = function() {
        this.el.removeClass('fadein');
        this.el.addClass('fadeout');
    };

    return new Transitions();
});