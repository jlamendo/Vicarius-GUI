/*global me, app*/
var Router = require('ampersand-router');
var HistoryPage = require('./pages/history');
var IDEPage = require('./pages/IDE');

module.exports = Router.extend({
    routes: {
        '': 'proxyHistory',
        'History': 'proxyHistory',
        'IDE': 'IDE'
    },

    // ------- ROUTE HANDLERS ---------
    proxyHistory: function () {
        $('#rootContainer').show();
        this.trigger('newPage', new HistoryPage({
            model: app.httpExchange,
            collection: app.httpExchangeCollection,
            window: window,
        }));
      $('#httpExchangeList li:eq(' + window.conf().user.session.selectedItem +')').trigger('click');
    },
    IDE: function () {
        $('#rootContainer').hide();
        this.trigger('newPage', new IDEPage({
            model: me}));
    },


});
