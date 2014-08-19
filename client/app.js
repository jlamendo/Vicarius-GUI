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
var domReady = require('domready');
var prettydiff=require('prettydiff');

module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        var self = window.app = this;
        window.prettydiff = prettydiff;
        // create our global 'me' object and an empty collection for our people models.
        window.me = new Me();
        this.httpExchange = new httpExchange();
        this.httpExchangeCollection = new httpExchangeCollection();

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
            eval("!function(a,b,c,d){function e(b,c){this.element=a(b),this.settings=a.extend({},w,c),this._defaults=w,this._name=m,this.init()}function f(b){v&&(b.element.addClass(\"navbar-hidden\").animate({top:-b.element.height()},{queue:!1,duration:b.settings.animationDuration}),a(\".dropdown.open .dropdown-toggle\",b.element).dropdown(\"toggle\"),v=!1)}function g(a){v||(a.element.removeClass(\"navbar-hidden\").animate({top:0},{queue:!1,duration:a.settings.animationDuration}),v=!0)}function h(a){var b=n.scrollTop(),c=b-t;if(t=b,0>c){if(v)return;(a.settings.showOnUpscroll||l>=b)&&g(a)}else if(c>0){if(!v)return void(a.settings.showOnBottom&&b+u===o.height()&&g(a));b>=l&&f(a)}}function i(a){a.settings.disableAutohide||(s=(new Date).getTime(),h(a))}function j(a){o.on(\"scroll.\"+m,function(){(new Date).getTime()-s>r?i(a):(clearTimeout(p),p=setTimeout(function(){i(a)},r))}),n.on(\"resize.\"+m,function(){clearTimeout(q),q=setTimeout(function(){u=n.height()},r)})}function k(){o.off(\".\"+m),n.off(\".\"+m)}var l,m=\"autoHidingNavbar\",n=a(b),o=a(c),p=null,q=null,r=70,s=0,t=null,u=n.height(),v=!0,w={disableAutohide:!1,showOnUpscroll:!0,showOnBottom:!0,hideOffset:\"auto\",animationDuration:200};e.prototype={init:function(){return this.elements={navbar:this.element},this.setDisableAutohide(this.settings.disableAutohide),this.setShowOnUpscroll(this.settings.showOnUpscroll),this.setShowOnBottom(this.settings.showOnBottom),this.setHideOffset(this.settings.hideOffset),this.setAnimationDuration(this.settings.animationDuration),l=\"auto\"===this.settings.hideOffset?this.element.height():this.settings.hideOffset,j(this),this.element},setDisableAutohide:function(a){return this.settings.disableAutohide=a,this.element},setShowOnUpscroll:function(a){return this.settings.showOnUpscroll=a,this.element},setShowOnBottom:function(a){return this.settings.showOnBottom=a,this.element},setHideOffset:function(a){return this.settings.hideOffset=a,this.element},setAnimationDuration:function(a){return this.settings.animationDuration=a,this.element},show:function(){return g(this),this.element},hide:function(){return f(this),this.element},destroy:function(){return k(this),g(this),a.data(this,\"plugin_\"+m,null),this.element}},a.fn[m]=function(b){var c=arguments;if(b===d||\"object\"==typeof b)return this.each(function(){a.data(this,\"plugin_\"+m)||a.data(this,\"plugin_\"+m,new e(this,b))});if(\"string\"==typeof b&&\"_\"!==b[0]&&\"init\"!==b){var f;return this.each(function(){var d=a.data(this,\"plugin_\"+m);d instanceof e&&\"function\"==typeof d[b]&&(f=d[b].apply(d,Array.prototype.slice.call(c,1)))}),f!==d?f:this}}}(jQuery,window,document);")
            // we have what we need, we can now start our router and show the appropriate page
                    $('#rootNavbar').autoHidingNavbar({
        });
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
