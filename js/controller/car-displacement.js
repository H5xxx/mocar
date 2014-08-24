define(function(require, exports) {
    var Transitions = require('../component/transitions');
    var Model = require('../model/model');

    var CarDisplacement = Spine.Controller.create({
        elements: {
            '.j-displacement-container': 'displacementContainer'
        },
        events: {
            'click .displacement-item': 'enterModel'
        },
        init: function() {},
        showDisplacement: function(id) {
            var displacements = Model.getDisplacementById(id);
            var html = template('template-displacement-item', {
                data: displacements
            });
            this.displacementContainer.html(html);
        },
        // enterModel: function(e) {
        //     var id = e.currentTarget.dataset.id;
        //     var name = e.currentTarget.dataset.name;
        //     var carModel = require('./car-model');
        //     carModel.showModel(id, name);
        //     carModel.active();
        // },
        activate: Transitions.fadein,
        deactivate: Transitions.fadeout
    });
    var carDisplacement = new CarDisplacement({
        el: $('#car-displacement')
    });
    var sm = require('../component/state-machine');
    sm.add(carDisplacement);
    return carDisplacement;
});