define(function(require, exports) {
    var Transitions = require('../component/transitions');

    var CarBrand = Spine.Controller.create({
        el: $('#car-brand'),

        init: function() {
        },

        list: function(params){
            var list = [];
            for(var i = 1, num = 10; i <= num; i++){
                list.push({
                    id: i,
                    name: 'brand-' + i
                });
            }

            return list;
        },

        render: function(params){
            var params = $.extend(params, {
                list: this.list(params)
            });

            var html = template('template-brand-item', params);

            this.el.html(html);
        },

        clean: function(){
            this.el.html('');
        },

        activate: function(params){
            this.render(params);

            this.fadein();
        },

        deactivate: function(){
            this.clean();

            this.fadeout();
        },

        fadein: Transitions.fadein,
        fadeout: Transitions.fadeout
    });

    return CarBrand;
});