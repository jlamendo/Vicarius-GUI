var Hapi = require('hapi');
var config = require('getconfig');
var server = new Hapi.Server('localhost', config.http.port);

var moonbootsConfig = require('./moonbootsConfig');

// require moonboots_hapi plugin
server.pack.require({'moonboots_hapi': moonbootsConfig}, function (err) {
    if (err) throw err;

        server.start(function (err) {
            if (err) throw err;
            console.log("Vicarius is running at: http://localhost:" + config.http.port + " Yep. That\'s pretty awesome.");
        });

});
