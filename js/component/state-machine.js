define(function(require, exports) {
    var Events = Spine.Events;
    var StateMachine = function() {};
    StateMachine.fn = StateMachine.prototype;
    $.extend(StateMachine.fn, Events);

    StateMachine.fn.add = function(controller) {
        this.bind("change", function(current) {
            if (controller == current) {
                controller.activate();
            } else {
                controller.deactivate();
            }
        });

        controller.active = $.proxy(function() {
            this.trigger("change", controller);
        }, this);
    };

    // test
    // var con1 = {
    //     activate: function() {
    //         console.log("controller 2 activated");
    //     },
    //     deactivate: function() {
    //         console.log("controller 1 deactivated");
    //     }
    // };

    // var con2 = {
    //     activate: function() {
    //         console.log("controller 2 activated");
    //     },
    //     deactivate: function() {
    //         console.log("controller 2 deactivated");
    //     }
    // };

    // var sm = new StateMachine;
    // sm.add(con1);
    // sm.add(con2);

    // con1.active();
    var sm = new StateMachine();

    return sm;
});