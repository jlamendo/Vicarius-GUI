var PageView = require('./base');
var templates = require('../templates');
var conf = function(){
    if(window.conf) return window.conf();
    else return window.serverSettingsJSON;
}

module.exports = PageView.extend({
    pageTitle: 'Vicarius - Cloud9 IDE',
    template: function tmpl_pages_IDE() {
        return '<section class="page IDE"><object data="http://' +conf().IDE.host + ':' + conf().IDE.port + '" class="IDE"><embed src="http://' +conf().IDE.host + ':' + conf().IDE.port + '" class="IDE"/>Error: IDE is not running. Please start IDE and try again.</object></section>';
    },
});
