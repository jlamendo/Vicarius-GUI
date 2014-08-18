var View = require('ampersand-view');
var templates = require('../templates');
var selectionView = require('./httpExchangeSelected.js')

module.exports = View.extend({
    template: templates.includes.httpExchangeItem,
    initialize: function () {
        if(window.doneLoadingCB) clearTimeout(window.doneLoadingCB);
        window.doneLoadingCB = setTimeout(function(){
        $('#httpExchangeList li:eq(0)').trigger('click');
            },500);

    }, events: {
        "click .httpExchangeElement"         : "select",
    },
        bindings: {
            'host': '[role=host]',
            'requestPath': '[role=route]',
            'requestMethod': '[role=method]',
            'responseCode': '[role=statusCode]',
            'responseLengthText': '[role=responseLength]',
            'responseTimeText': '[role=responseTime]',
    },

     select: function(e) {
        $(this.el).toggleClass('selected');
        if(document.getElementById('selectedExchange')){
            $('#selectedExchange').toggleClass('selected');
            document.getElementById('selectedExchange').removeAttribute('id');
        }
        this.el.setAttribute('id', 'selectedExchange');
        this.parent.selectionDetailsView.set(new selectionView({
            model: this.model
            }));
  },
});
