process.env['NODE_ENV'] = 'production';
var Hapi = require('hapi');
var config = require('getconfig');
var moonbootsConfig = require('./moonbootsConfig');

module.exports = function(opts, cb){
var server = new Hapi.Server(opts.GUI.host, opts.GUI.port);
// require moonboots_hapi plugin
server.pack.require({'moonboots_hapi': moonbootsConfig}, function (err) {
    if (err) throw err;
        server.start(function (err) {
            if (err) throw err;
            cb();
        });
return server;
});
}