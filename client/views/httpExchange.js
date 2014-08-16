var View = require('ampersand-view');
var templates = require('../templates');
var selectionView = require('./httpExchangeSelected.js')

module.exports = View.extend({
    template: templates.includes.httpExchangeItem,
    initialize: function () {
    }, events: {
        "click .httpExchangeElement"         : "select",
    },
        bindings: {
            'requestPath': '[role=route]',
            'requestMethod': '[role=method]',
            'responseCode': '[role=statusCode]',
            'responseLengthText': '[role=responseLength]',
            'responseTimeText': '[role=responseTime]',
    },

     select: function(e) {
        this.parent.selectionDetailsView.set(new selectionView({
            model: this.model
            }));
  },
});
