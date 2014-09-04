var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');


module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Project',
                name: 'project',
                value: this.model.project || '',
                required: false,
                placeholder: 'Project',
                parent: this
            }),
            new InputView({
                label: 'Selected Item',
                name: 'selectedItem',
                value: this.model.selectedItem || '',
                required: false,
                placeholder: 'Selected Item',
                parent: this
            }),
            new InputView({
                label: 'Profile',
                name: 'profile',
                value: this.model.profile || '',
                required: false,
                placeholder: 'Profile',
                parent: this
            })
        ];
    }
});