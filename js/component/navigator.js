define(function(require, exports) {
    var navigator = {
        dom: '#navigator',
        render: function(params){
            $(this.dom).html(template('template-navigator', params));
        }
    };

    return navigator;
});