var PageView = require('./base');
var templates = require('../templates');
var httpExchangeView = require('../views/httpExchange.js');
var ViewSwitcher = require('ampersand-view-switcher');


module.exports = PageView.extend({
    pageTitle: 'Proxy History',
    template: templates.pages.history,
    events: {
        'load': 'render',
    },
    initialize: function() {
    },
    render: function () {
        this.renderWithTemplate();
        this.selectionDetailsView = new ViewSwitcher(this.getByRole('selectionDetailsView'));
        this.renderCollection(this.collection, httpExchangeView, this.getByRole('httpExchangeList'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },
    resetCollection: function () {
        this.collection.reset();
    },
    selectionDetailsView: {}

});
