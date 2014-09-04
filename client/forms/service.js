var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var ArrayInputView = require('ampersand-array-input-view');


var API = FormView.extend({
    fields: function () {
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
    fields: function () {
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
    fields: function () {
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
    fields: function () {
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
    fields: function () {
        return [
            new InputView({
                label: 'Max Bytes Unknown Type',
                name: 'maxBytesUnknownType',
                value: this.model.maxBytesUnknownType || '',
                required: false,
                placeholder: 'Max Bytes Unknown Type',
                parent: this
            }),
            new InputView({
                label: 'Data Dir',
                name: 'dataDir',
                value: this.model.dataDir || '',
                required: false,
                placeholder: 'Data Dir',
                parent: this
            }),
            new ArrayInputView({
                label: 'Text Content Types',
                name: 'textContentTypes',
                value: this.model.textContentTypes || [],
                numberRequired: 0,
                parent: this
            }),
            new ArrayInputView({
                label: 'Bin Content Types',
                name: 'binContentTypes',
                value: this.model.binContentTypes || [],
                numberRequired: 0,
                parent: this
            })
        ];
    }
});




var user = FormView.extend({
    fields: function () {
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