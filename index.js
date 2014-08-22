if(!module.parent){
    process.env['VICARIUS_DIR'] = process.cwd() + '/../vicarius'
    console.log(process.env['VICARIUS_DIR'] + '/config/default.json')
}

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
if(!module.parent){
    process.env['VICARIUS_DIR'] = process.cwd() + '../vicarius/'
    module.exports({GUI: {host: '127.0.0.1', port:'3000'}}, function(){

        console.log('listening on :3000.')
    })
}