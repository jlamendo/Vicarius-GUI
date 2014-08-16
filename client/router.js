/*global me, app*/
var Router = require('ampersand-router');
var HistoryPage = require('./pages/history');


module.exports = Router.extend({
    routes: {
        'History': 'history'
    },

    // ------- ROUTE HANDLERS ---------
    history: function () {
        this.trigger('newPage', new HistoryPage({
            model: app.httpExchange,
            collection: app.httpExchangeCollection
        }));
    },

});
