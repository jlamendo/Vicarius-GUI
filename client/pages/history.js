var PageView = require('./base');
var templates = require('../templates');
var httpExchangeView = require('../views/httpExchange.js');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore')
var selectpicker = require('../libraries/bootstrap-select.min.js');
var conf = function() {
    if (window.conf) return window.conf();
    else return window.serverSettingsJSON;
}



module.exports = PageView.extend({
    pageTitle: 'Proxy History',
    template: templates.pages.history,
    events: {
        'load': 'initialize',
    },
    initialize: function() {

        $.fn.scrollTo = function(target, options, callback) {

            if (typeof options === 'function' && arguments.length === 2) {

                callback = options;
                options = target;
            }

            var settings = $.extend({
                scrollTarget: target,
                offsetTop: 185,
                duration: 0,
                easing: 'linear'
            }, options);

            return this.each(function(i) {

                var scrollPane = $(this);
                var scrollTarget = (typeof settings.scrollTarget === 'number') ? settings.scrollTarget : $(settings.scrollTarget);
                var scrollY = (typeof scrollTarget === 'number') ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop, 10);

                scrollPane.animate({
                    scrollTop: scrollY
                }, parseInt(settings.duration, 10), settings.easing, function() {

                    if (typeof callback === 'function') {

                        callback.call(this);
                    }

                });

            });

        };


        $(document).keydown(function(e) {
            if ((e.keyCode !== 40) && (e.keyCode !== 38)) {
                return true;
            }
            e.preventDefault(); // 38-up, 40-down
            var curElIndex = $('#httpExchangeList li').index($('#selectedExchange'));
            if (curElIndex < 0) curElIndex = 0;
            var newElIndex = curElIndex;
            if (e.keyCode === 40) {
                if ((curElIndex + 1) < $('#httpExchangeList li').length) {
                    newElIndex++;
                } else return false;
            } else if (e.keyCode === 38) {
                if ((curElIndex) > 0) {
                    newElIndex--;
                } else return false;
            }
            $('#httpExchangeList li:eq(' + curElIndex + ')').removeAttr('id');
            $('#httpExchangeList li:eq(' + curElIndex + ')').removeClass('selected');
            $('#httpExchangeList li:eq(' + newElIndex + ')').attr('id', 'selectedExchange');
            $('#httpExchangeList li:eq(' + newElIndex + ')').addClass('selected');
            $('#httpExchangeList').scrollTo('#selectedExchange')

            return false;
        });


        var keyPressDebounce;
        $(document).keyup(function(e) {
            e.preventDefault(); // 38-up, 40-down
            if ((e.keyCode === 40) || (e.keyCode === 38)) {
                if (keyPressDebounce) clearTimeout(keyPressDebounce);
                keyPressDebounce = setTimeout(function() {
                    $('#selectedExchange').trigger('click');
                }, 300);
            }
            return false;
        });


    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, httpExchangeView, this.getByRole('httpExchangeList'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
        this.selectionDetailsView = new ViewSwitcher(this.getByRole('selectionDetailsView'));
        window.app.syncDropdowns = function(init) {
            if(init){
            var existingProfiles = [];
            var existingProjects = [];
            existingProfiles.push(conf().user.session.profile);
            existingProfiles.push(conf().user.session.project);
            $('.selectpacker.profiles')
                .prepend($('<option>')
                        .text(conf().user.session.profile));
            $('.selectpacker.projects')
                    .prepend($('<option>')
                        .text(conf().user.session.project));

            $($('.selectpacker.profiles').find('option')).each(function() {
                existingProfiles.push(this.value)
            })
            $($('.selectpacker.projects').find('option')).each(function() {
                existingProjects.push(this.value)
            })
            _.each(conf().user.profiles, function(profile) {
                if (existingProfiles.indexOf(profile) !== -1) return;
                $('.selectpacker.profiles')
                    .append($('<option>')
                        .text(profile));
            });

            _.each(window.conf().user.projects, function(project) {
                if (existingProjects.indexOf(project) !== -1) return;
                $('.selectpacker.projects')
                    .append($('<option>')
                        .text(project));
            });
        }
            $('.selectpacker').selectpicker('refresh');
            if (!init) {
                var currentConf = window.serverSettingsCollection.get('1');
                var oldProj = currentConf.user.project;
                currentConf.user.profile = $('.selectpacker.profiles').selectpicker('val');
                currentConf.user.project = $('.selectpacker.projects').selectpicker('val');
                window.serverSettingsCollection.set(currentConf);
                if (oldProj !== window.serverSettingsCollection.get('1').user.project) {
                    window.app.httpExchangeCollection.reset();
                    window.app.httpExchangeCollection.fetch();
                }
            }
        }
        window.app.syncDropdowns(true);
        window.app.sortCB = setInterval(function() {
            window.app.sortList = new List('listContainer', {
                valueNames: ['referenceId',
                    'host',
                    'route',
                    'method',
                    'statusCode',
                    'responseLength',
                    'responseTime'
                ],
                plugins: [ListFuzzySearch()]
            });
            /* $(".editLabel").click(function() {
                $(this).hide();
                $($(this).parent().find("input")[0]).show();
                $($(this).parent().find("input")[0]).focus();
            });*/
            window.app.hoverEdit = function() {
                $(".autoHoverEditContainer").hover(function() {
                    $($(this).find(".hoverEditLabel")[0]).hide();
                    $($(this).find("input")[0]).show();
                    $($(this).find("input")[0]).focus();
                }, function() {
                    $($(this).find(".hoverEditLabel")[0]).show();
                    $($(this).find("input")[0]).hide();
                    $($(this).find("input")[0]).blur();
                });

                $(".hoverEditChild").mouseenter(function() {
                    var _this = this;
                    $(this).hide();
                    $($(this).parent().find("input")[0]).show();
                    $($(this).parent().find("input")[0]).focus();
                    $($(this).parent().find("input")[0]).mouseleave(function() {
                        $(_this).show();
                        $(this).hide();
                        $(this).blur();
                    });
                });
            };


            if (window.app.sortList.items.length > 0) {
                $('.selectpacker').selectpicker({
                    showIcon: false,
                    liveSearch: false,
                    style: 'btn-info btn-xs',
                    width: '8.5em'
                });
                $(document).off('keydown', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input');
                window.app.hoverEdit();
                clearInterval(window.app.sortCB);
            }
        }, 2000)
        return this;
    },
    fetchCollection: function() {
        this.collection.fetch();
        return false;
    },
    resetCollection: function() {
        this.collection.reset();
    },
    selectionDetailsView: {},
    selectedItem: undefined,

});