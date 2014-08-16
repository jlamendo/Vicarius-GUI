var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.httpExchangeSelectionDetails,
    initialize: function () {
    },
        bindings: {
            'responseRawText': '[role=dataViewer]',
    },
    render: function () {
        this.renderWithTemplate(this);
        return this;
    },
});
