var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
        template: templates.includes.httpExchangeSelectionDetails,
        initialize: function() {
            this.startY;
            this.startHeight;
            this.resizeEl;
        },
        events: {
            "click .rawTab": "displayRaw",
            "click .bodyTab": "displayBody",
            "click .renderTab": "displayRender",
            "mousedown .resizeBar": "initDrag",
            "mouseup .resizeBar": "stopDrag",
        },
        bindings: {
            'responseRawText': '[role=responseViewer]',
            'requestRawText': '[role=requestViewer]',

        },
        render: function() {
            this.renderWithTemplate(this);
            return this;
        },
        displayRaw: function() {

        },
        displayBody: function() {

        },
        displayRender: function() {

        },
        initDrag: function(e) {
            $('body').addClass('noSelect');
            window.startDragHeight = e.clientY;
            window.listHeight = parseInt($('ul.httpExchangeList').css('height').split('px')[0]);
            window.selectionViewHeight = parseInt($('#selectionViewPort').css('height'));
            document.documentElement.addEventListener('mousemove', this.doDrag, false);
        },

        doDrag: function(e) {
            $('ul.httpExchangeList').css('height', (window.listHeight + (e.clientY - window.startDragHeight))+'px');
            $('#selectionDetailsView').css('top',e.clientY);
            $('#selectionViewPort').css('height', window.selectionViewHeight + (window.startDragHeight - e.clientY)+'px');
        },

        stopDrag: function(e) {
            $('body').removeClass('noSelect');
            document.documentElement.removeEventListener('mousemove', this.doDrag, false);
        },


});