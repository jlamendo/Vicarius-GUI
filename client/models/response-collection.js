// response Collection - response-collection.js
var AmpCollection = require('ampersand-rest-collection');
var response = require('./response');


module.exports = AmpCollection.extend({
    model: response,
    url: '/response/proxyHistory'
});