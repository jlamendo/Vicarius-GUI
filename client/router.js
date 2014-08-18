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
            collection: app.httpExchangeCollection
        }));
      $('#httpExchangeList li:eq(0)').trigger('click');
    },
    IDE: function () {
        $('#rootContainer').hide();
        //document.getElementById('nav-ask').style.display = 'none';
        this.trigger('newPage', new IDEPage({
            model: me}));
    },


});
