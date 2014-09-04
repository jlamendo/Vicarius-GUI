var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var ArrayInputView = require('ampersand-array-input-view');


module.exports = FormView.extend({
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