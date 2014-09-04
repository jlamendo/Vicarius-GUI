/*global app, me, $*/
var stats = require('loading-stats');
var _ = require('underscore');
var logger = require('andlog');
var config = require('clientconfig');
var Router = require('./router');
var tracking = require('./helpers/metrics');
var MainView = require('./views/main');
var Me = require('./models/me');
var httpExchange = require('./models/httpExchange');
var httpExchangeCollection = require('./models/httpExchangeCollection');
var serverSettings = require('./models/serverSettings');
var serverSettingsCollection = require('./models/serverSettingsCollection');
var domReady = require('domready');
var prettydiff=require('prettydiff');

module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        var self = window.app = this;
        window.serverSettings = new serverSettings(window.serverSettingsJSON);
        window.serverSettingsCollection = new serverSettingsCollection();
        window.serverSettingsCollection.add(window.serverSettingsJSON,{merge:true});
        window.conf = function(){
            return window.serverSettingsCollection.get('1');
        }
        window.prettydiff = prettydiff;
        // create our global 'me' object and an empty collection for our people models.
        window.me = new Me();
        this.httpExchange = new httpExchange();
        this.httpExchangeCollection = new httpExchangeCollection();
        this.httpExchangeCollection.on('any', console.log.bind(console))
        // init our URL handlers and the history tracker
        this.router = new Router();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            var mainView = self.view = new MainView({
                model: me,
                el: document.body
            });

            // ...and render it
            mainView.render();
            // listen for new pages from the router
            self.router.on('newPage', mainView.setPage, mainView);
            self.router.history.start({pushState: true, root: '/'});
        });

    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.navigate(url,{trigger: true, replace: true});
    }
};

// run it
module.exports.blastoff();
