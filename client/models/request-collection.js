// request Collection - request-collection.js
var AmpCollection = require('ampersand-rest-collection');
var request = require('./request');


module.exports = AmpCollection.extend({
    model: request,
    url: '/request/proxyHistory'
});