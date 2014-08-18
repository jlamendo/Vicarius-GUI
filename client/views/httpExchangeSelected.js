var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.httpExchangeSelectionDetails,
    initialize: function () {

    },
    events: {
        "click .rawTab"         : "displayRaw",
        "click .bodyTab"         : "displayBody",
        "click .renderTab"         : "displayRender",
    },
        bindings: {
            'responseRawText': '[role=responseViewer]',
            'requestRawText': '[role=requestViewer]',

    },
    render: function () {
        this.renderWithTemplate(this);
        return this;
    },
    displayRaw: function () {

    },
    displayBody: function () {

    },
    displayRender: function () {

    },


});
