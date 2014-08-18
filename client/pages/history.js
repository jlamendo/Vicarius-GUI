var PageView = require('./base');
var templates = require('../templates');
var httpExchangeView = require('../views/httpExchange.js');
var ViewSwitcher = require('ampersand-view-switcher');


// TODO: Make details subview render on keyup.
// Fix viewport height detection.
// Split request/response
// Render/Syntax highlights can wait
// Add filters
// On base vicarious level config, make binaries passthrough
// Add IDE in an iframe.




module.exports = PageView.extend({
    pageTitle: 'Proxy History',
    template: templates.pages.history,
    events: {
        'load': 'initialize',
    },
    initialize: function() {

var itemIsVisible = function()
{
    var docViewTop = $("#httpExchangeList").scrollTop();
    var docViewBottom = docViewTop + $("#httpExchangeList").height();

    var elemTop = $($('#selectedExchange')).offset().top;
    var elemBottom = elemTop + $($('#selectedExchange')).height();

    return (elemBottom >= docViewTop) && (elemTop <= docViewBottom)
      && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop)
}

function checkVisible( elm, eval ) {
    eval = eval || "visible";
    var vpH = $("#httpExchangeList").height(), // Viewport Height
        st = $("#httpExchangeList").scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = 20;

    if (eval == "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (eval == "above") return ((y < (vpH + st)));
}


$(document).keydown(function(e){ // 38-up, 40-down
    // needs a better solution for situations where more li elements exist.
    var curElIndex = $('#httpExchangeList li').index($('#selectedExchange'));
    if(curElIndex < 0) curElIndex=0;
    var newElIndex = curElIndex;
    if (e.keyCode === 40) {
        if((curElIndex+1) < $('#httpExchangeList li').length) {
            newElIndex++;
        } else return false;
    } else if (e.keyCode === 38) {
        if((curElIndex) > 0) {
            newElIndex--;
        } else return false;
    }
        $('#httpExchangeList li:eq('+curElIndex+')').removeAttr('id');
        $('#httpExchangeList li:eq('+curElIndex+')').removeClass('selected');
        $('#httpExchangeList li:eq('+newElIndex+')').attr('id', 'selectedExchange');
        $('#httpExchangeList li:eq('+newElIndex+')').addClass('selected');
        if(!(checkVisible($('#httpExchangeList li:eq('+newElIndex+')')))) {
         $('#httpExchangeList').scrollTo($('#httpExchangeList li:eq('+newElIndex+')'), 1000)
     }

        return false;
});

$(document).keyup(function(e){ // 38-up, 40-down
    // needs a better solution for situations where more li elements exist.
    if ((e.keyCode === 40) || (e.keyCode === 38)) {
        $('#selectedExchange').trigger('click');
    }
        return false;
});


    },
    render: function () {
        this.renderWithTemplate();
        this.selectionDetailsView = new ViewSwitcher(this.getByRole('selectionDetailsView'));
        this.renderCollection(this.collection, httpExchangeView, this.getByRole('httpExchangeList'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },
    resetCollection: function () {
        this.collection.reset();
    },
    selectionDetailsView: {},
    selectedItem: undefined,

});
