var PageView = require('./base');
var templates = require('../templates');

// TODO: Make details subview render on keyup.
// Fix viewport height detection.
// Split request/response
// Render/Syntax highlights can wait
// Add filters
// On base vicarious level config, make binaries passthrough
// Add IDE in an iframe.


module.exports = PageView.extend({
    pageTitle: 'Vicarius - Cloud9 IDE',
    template: templates.pages.IDE,
});
