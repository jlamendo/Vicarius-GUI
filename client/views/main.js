/*global app, me, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders iteslf on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var templates = require('../templates');
var tracking = require('../helpers/metrics');
var setFavicon = require('favicon-setter');
var conf = function() {
    if (window.conf) return window.conf();
    else return window.serverSettingsJSON;
}

module.exports = View.extend({
    template: templates.body,
    initialize: function() {
        // this marks the correct nav item selected
        window.toggleNavBar = function() {
            if ($('#navBarHideButton').attr('data-autoHide') === 'hide') {
                $('#rootNavbar').hide();
                $('#navBarHideButton').attr('data-autoHide', 'show');
            } else {
                $('#rootNavbar').show();
                $('#navBarHideButton').attr('data-autoHide', 'hide');
            }
        };
        app.router.history.on('route', this.updateActiveNav, this);
    },
    events: {
        'click a[href]': 'handleLinkClick',
        'click button.refresh': 'refreshServer',
        'click button.playPause': 'playPause',
        'blur #createProfileInput': 'addProfile',
        'blur #createProjectInput': 'addProject',
    },
    render: function() {
        // some additional stuff we want to add to the document head
        $('head').append(templates.head());

        // main renderer
        this.renderWithTemplate({
            me: me
        });
        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.getByRole('page-container'), {
            show: function(newView, oldView) {
                // it's inserted and rendered for me
                document.title = _.result(newView.pageTitle) || "Vicarius";
                document.scrollTop = 0;

                // add a class specifying it's active
                newView.el.classList.add('active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });

        // setting a favicon for fun (note, it's dyanamic)

        setFavicon('/images/ampersand.png');
        return this;
    },

    setPage: function(view) {
        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    handleLinkClick: function(e) {
        var t = $(e.target);
        var aEl = t.is('a') ? t[0] : t.closest('a')[0];
        var local = window.location.host === aEl.host;
        var path = aEl.pathname.slice(1);

        // if the window location host and target host are the
        // same it's local, else, leave it alone
        if (local) {
            e.preventDefault();
            app.navigate(path);
        }
    },
    updateActiveNav: function(e) {
        var pathname = window.location.pathname;
        $('.nav a.navItem').each(function() {
            var navArray = _.compact($(this).attr('href').split('/')).join('/').toLowerCase();
            var pathArray = _.compact(pathname.split('/')).join('/').toLowerCase();

            if (pathArray === navArray) {
                $(this).parent().addClass('active');
            } else {
                $(this).parent().removeClass('active');
            }
        });
    },
    refreshServer: function(e) {
        $.ajaxSetup({
            headers: {
                "X-Vicarius-Auth": conf().user.authToken
            }
        });
        $($('button.btn-info.btn-xs.refresh').find('i.fa-refresh')[0]).addClass('fa-spin');
        $.post(
            'http://' + conf().API.host + ':' + conf().API.port + '/api/v1/cores/refresh', {
                profile: $('.selectpacker.profiles').selectpicker('val'),
                project: $('.selectpacker.projects').selectpicker('val'),
            },
            function(responseText) {
                window.app.syncDropdowns();
                $($('button.btn-info.btn-xs.refresh').find('i.fa-refresh')[0]).removeClass('fa-spin');
            }
        )
    },
    playPause: function(e) {
        $.ajaxSetup({
            headers: {
                "X-Vicarius-Auth": conf().user.authToken
            }
        });
        $($('button.btn-info.btn-xs.playPause').find('i')[0]).toggleClass('fa-pause').toggleClass('fa-play');
        $.post(
            'http://' + conf().API.host + ':' + conf().API.port + '/api/v1/cores/toggle',
            {
            },
            function(responseText) {
            }
        )    },
    addProject: function(e) {
        var existingProjects = [];
        $($('.selectpacker.projects').find('option')).each(function() {
            existingProjects.push(this.value)
        })
        var newProj = $('#createProjectInput').val();
        $('#createProjectInput').val('');
        if(existingProjects.indexOf(newProj)=== -1){
        $('.selectpacker.projects')
            .append($('<option>')
                .text(newProj));
        $('.selectpacker.projects').selectpicker('refresh');
        } else {
            $('.selectpacker.projects').selectpicker('val', newProj)
        }
    },
    addProfile: function(e) {
        var existingProfiles = [];
        $($('.selectpacker.profiles').find('option')).each(function() {
            existingProfiles.push(this.value)
        })
        var newProf = $('#createProfileInput').val();
        if(existingProfiles.indexOf(newProf)=== -1){
        $('.selectpacker.profiles')
            .append($('<option>')
                .text(newProf));
        $('.selectpacker.profiles').selectpicker('refresh');
        } else {
            $('.selectpacker.profiles').selectpicker('val', newProf)
        }
    },
});