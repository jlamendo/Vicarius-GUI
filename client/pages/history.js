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


    $.fn.scrollTo = function(target, options, callback) {

        if(typeof options === 'function' && arguments.length === 2) {

            callback = options;
            options = target;
        }

        var settings = $.extend({
            scrollTarget  : target,
            offsetTop     : 185,
            duration      : 0,
            easing        : 'linear'
        }, options);

        return this.each(function(i) {

            var scrollPane = $(this);
            var scrollTarget = (typeof settings.scrollTarget === 'number') ? settings.scrollTarget : $(settings.scrollTarget);
            var scrollY = (typeof scrollTarget === 'number') ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop, 10);

            scrollPane.animate({scrollTop: scrollY}, parseInt(settings.duration, 10), settings.easing, function() {

                if (typeof callback === 'function') {

                    callback.call(this);
                }

            });

        });

    };


$(document).keydown(function(e){
    e.preventDefault();// 38-up, 40-down
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
       /* if(!(checkVisible($('#httpExchangeList li:eq('+newElIndex+')')))) {
         $('#httpExchangeList').scrollTo($('#httpExchangeList li:eq('+newElIndex+')'), 1000)
     }*/
     $('#httpExchangeList').scrollTo('#selectedExchange')

        return false;
});

$(document).keyup(function(e){
    e.preventDefault(); // 38-up, 40-down
    if ((e.keyCode === 40) || (e.keyCode === 38)) {
    if(window.doneLoadingCB) clearTimeout(window.doneLoadingCB);
        window.doneLoadingCB = setTimeout(function(){
        $('#selectedExchange').trigger('click');
            },200);
    }
        return false;
});


    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, httpExchangeView, this.getByRole('httpExchangeList'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
        this.selectionDetailsView = new ViewSwitcher(this.getByRole('selectionDetailsView'));
        return this;
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
