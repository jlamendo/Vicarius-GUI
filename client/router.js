/*global me, app*/
var Router = require('ampersand-router');
var HistoryPage = require('./pages/history');
var IDEPage = require('./pages/IDE');
var configurationPage = require('./pages/configuration.js')

module.exports = Router.extend({
    routes: {
        '': 'proxyHistory',
        'History': 'proxyHistory',
        'IDE': 'IDE',
        'Configuration': 'configuration',
    },

    // ------- ROUTE HANDLERS ---------
    proxyHistory: function () {
        $('#rootContainer').show();
        this.trigger('newPage', new HistoryPage({
            model: app.httpExchange,
            collection: app.httpExchangeCollection,
         //   window: window,
        }));
      $('#httpExchangeList li:eq(' + window.conf().user.session.selectedItem +')').trigger('click');
    },
    IDE: function () {
        $('#rootContainer').hide();
        this.trigger('newPage', new IDEPage({
            model: me}));
    },
    configuration: function () {
        $('#rootContainer').hide();
        this.trigger('newPage', new configurationPage({
            model: window.serverSettingsCollection.get('1'),
            collection: window.serverSettingsCollection
        }));
    },


});
