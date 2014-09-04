var View = require('ampersand-view');
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


var general = FormView.extend({
    el: this.getByRole('GeneralForm'),
    model: (function(){ return window.serverSettingsCollection.get('1')})(),
    submitCallback: function(obj) {
        console.log('form submitted! Your data:', obj);
    },
    // this valid callback gets called (if it exists)
    // when the form first loads and any time the form
    // changes from valid to invalid or vice versa.
    // You might use this to disable the "submit" button
    // any time the form is invalid, for exmaple.
    validCallback: function(valid) {
        if (valid) {
            console.log('The form is valid!');
        } else {
            console.log('The form is not valid!');
        }
    },
    fields: function() {
        return [
            new InputView({
                label: 'Max Bytes Unknown Type',
                name: 'maxBytesUnknownType',
                value: this.model.general.maxBytesUnknownType || '',
                required: false,
                placeholder: 'Max Bytes Unknown Type',
                parent: this
            }),
            new InputView({
                label: 'Data Dir',
                name: 'dataDir',
                value: this.model.general.dataDir || '',
                required: false,
                placeholder: 'Data Dir',
                parent: this
            }),
            new ArrayInputView({
                label: 'Text Content Types',
                name: 'textContentTypes',
                value: this.model.general.textContentTypes || [],
                numberRequired: 0,
                parent: this
            }),
            new ArrayInputView({
                label: 'Bin Content Types',
                name: 'binContentTypes',
                value: this.model.general.binContentTypes || [],
                numberRequired: 0,
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
    template: templates.pages.configuration,
    render: function() {
        this.renderWithTemplate();

        // registering the form view as a subview ensures that
        // it`s `remove` method will get called when the parent
        // view is removed.
        this.registerSubview(general);
    }
});