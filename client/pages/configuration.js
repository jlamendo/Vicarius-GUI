var View = require('./base');
var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var ArrayInputView = require('ampersand-array-input-view');
var templates = require('../templates');

var API = FormView.extend({
    fields: function() {
        return [
            new InputView({
                label: 'Host',
                name: 'host',
                value: this.model.host || '',
                required: false,
                placeholder: 'Host',
                parent: this
            }),
            new InputView({
                label: 'Port',
                name: 'port',
                value: this.model.port || '',
                required: false,
                placeholder: 'Port',
                parent: this
            })
        ];
    }
});

var IDE = FormView.extend({
    fields: function() {
        return [
            new InputView({
                label: 'Host',
                name: 'host',
                value: this.model.host || '',
                required: false,
                placeholder: 'Host',
                parent: this
            }),
            new InputView({
                label: 'Port',
                name: 'port',
                value: this.model.port || '',
                required: false,
                placeholder: 'Port',
                parent: this
            })
        ];
    }
});

var GUI = FormView.extend({
    fields: function() {
        return [
            new InputView({
                label: 'Host',
                name: 'host',
                value: this.model.host || '',
                required: false,
                placeholder: 'Host',
                parent: this
            }),
            new InputView({
                label: 'Port',
                name: 'port',
                value: this.model.port || '',
                required: false,
                placeholder: 'Port',
                parent: this
            })
        ];
    }
});

var DB = FormView.extend({
    fields: function() {
        return [
            new InputView({
                label: 'Host',
                name: 'host',
                value: this.model.host || '',
                required: false,
                placeholder: 'Host',
                parent: this
            }),
            new InputView({
                label: 'Port',
                name: 'port',
                value: this.model.port || '',
                required: false,
                placeholder: 'Port',
                parent: this
            })
        ];
    }
});
/*
          var dataDir = new InputView({
                label: 'Data Dir',
                name: 'dataDir',
                value: this.model.general.dataDir || '',
                required: false,
                placeholder: 'Data Dir',
                parent: this
            });
          var maxBytesUnknownType = new InputView({
                label: 'Max Bytes Unknown Type',
                name: 'maxBytesUnknownType',
                value: this.model.general.maxBytesUnknownType || '',
                required: false,
                placeholder: 'Max Bytes Unknown Type',
                parent: this
            });

*/
var general = FormView.extend({
    fields: function() {
        return [
            new ArrayInputView({
                label: 'Content-Type Whitelist',
                name: 'textContentTypes',
             //   el: document.getElementById('Content-Type-WL'),
                template: (function() {
                    return [
                        '<div class="col-md-6" role="Content-Type-WL" id="Content-Type-WL">',
                        '    <div class="panel panel-danger" role="main-message-container">',
                        '    <div class="panel-heading">Error:</div>',
                        '    <div class="panel-body" role="main-message-text"></div>',
                        '    </div>',
                        '        <div class="panel-primary">',
                        '            <div class="panel-heading"><h1 class="panel-title" role="label"></h1></div>',
                        '            <div class="panel-body">',
                        '                <ul class="list-group"  style="overflow: auto; max-height: 25em;" role="field-container">',
                        '                </ul>',
                        '            </div>',
                        '        </div>',
                        '</div>'
                    ].join('\n');
                })(),
                fieldTemplate: (function() {
                    return [
                        '<li class="list-group-item">',
                        '        <div role="message-container">',
                        '            <span class="label label-danger" role="message-text"></span>',
                        '        </div>',
                        '    <div class="input-group">',
                        '        <input type="text" class="form-control">',
                        '        <span class="input-group-btn">',
                        '            <button class="btn btn-default" type="button">',
                        '                <span class="glyphicon glyphicon-chevron-right"></span>',
                        '            </button>',
                        '        </span>',
                        '    </div>',
                        '</li>',
                    ].join('\n');
                })(),
                value: this.model.general.textContentTypes || ['1','2'],
                numberRequired: 0,
                maxLength: 100,
                parent: this
            }),
            new ArrayInputView({
                label: 'Content-Type Blacklist',
                name: 'binContentTypes',
                //el: document.getElementById('Content-Type-BL'),
                template: (function() {
                    return [
                        '<div class="col-md-6" role="Content-Type-BL" id="Content-Type-BL">',
                        '    <div class="panel panel-danger" role="main-message-container">',
                        '    <div class="panel-heading">Error:</div>',
                        '    <div class="panel-body" role="main-message-text"></div>',
                        '    </div>',
                        '        <div class="panel-primary">',
                        '            <div class="panel-heading"><h1 class="panel-title" role="label"></h1></div>',
                        '            <div class="panel-body">',
                        '                <ul class="list-group" style="overflow: auto; max-height: 25em;" role="field-container">',
                        '                </ul>',
                        '            </div>',
                        '        </div>',
                        '</div>'
                    ].join('\n');
                })(),
                fieldTemplate: (function() {
                    return [
                        '<li class="list-group-item">',
                        '    <div class="input-group">',
                        '        <div role="message-container">',
                        '            <span class="label label-danger" role="message-text"></span>',
                        '        </div>',
                        '        <span class="input-group-btn">',
                        '            <button class="btn btn-default" type="button">',
                        '                <span class="glyphicon glyphicon-chevron-left"></span>',
                        '            </button>',
                        '        </span>',
                        '        <input type="text" class="form-control">',
                        '    </div>  ',
                        '</li>',
                    ].join('\n')
                })(),
                value: this.model.general.binContentTypes || [],
                numberRequired: 0,
                maxLength: 100,
                parent: this
            })
        ];
    }
});



var user = FormView.extend({
    fields: function() {
        return [
            new InputView({
                label: 'Username',
                name: 'username',
                value: this.model.username || '',
                required: false,
                placeholder: 'Username',
                parent: this
            }),
            new InputView({
                label: 'Auth Token',
                name: 'authToken',
                value: this.model.authToken || '',
                required: false,
                placeholder: 'Auth Token',
                parent: this
            }),
            new ArrayInputView({
                label: 'Projects',
                name: 'projects',
                value: this.model.projects || [],
                numberRequired: 0,
                parent: this
            })
        ];
    }
});

var serverSettings = FormView.extend({
    fields: function() {
        return [
            new InputView({
                label: 'Id',
                name: 'id',
                value: this.model.id || '',
                required: false,
                placeholder: 'Id',
                parent: this
            }),
            new InputView({
                label: 'First Run',
                name: 'firstRun',
                value: this.model.firstRun || '',
                required: false,
                placeholder: 'First Run',
                parent: this
            })
        ];
    }
});


module.exports = View.extend({
    pageTitle: 'Vicarius - Configuration',
    template: templates.pages.configuration,
    render: function() {
        this.renderWithTemplate();

        // registering the form view as a subview ensures that
        // it`s `remove` method will get called when the parent
        // view is removed.
        this.renderSubview(new general({
            model: this.model,
            collection: this.collection
        }), '.form-Filtering');
        return this;
    }
});