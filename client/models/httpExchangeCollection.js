// httpExchange Collection - http-exchange-collection.js
var AmpCollection = require('ampersand-rest-collection');
var httpExchange = require('./httpExchange');


module.exports = AmpCollection.extend({
    model: httpExchange,
    url: 'http://127.0.0.1:8085/httpExchange/proxyHistory'
});