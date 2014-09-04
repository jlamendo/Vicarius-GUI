var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var ArrayInputView = require('ampersand-array-input-view');


module.exports = FormView.extend({
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