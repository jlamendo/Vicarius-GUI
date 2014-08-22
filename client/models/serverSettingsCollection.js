// serverSettings Collection - server-settings-collection.js
var AmpCollection = require('ampersand-rest-collection');
var serverSettings = require('./serverSettings');
var conf = function(){
    if(window.conf) return window.conf();
    else return window.serverSettingsJSON;
}

module.exports = AmpCollection.extend({
    model: serverSettings,
    url: url: 'http://' + conf().DB.host + ':' + conf().DB.port + '/httpExchange?project=' + conf().user.session.project,
});