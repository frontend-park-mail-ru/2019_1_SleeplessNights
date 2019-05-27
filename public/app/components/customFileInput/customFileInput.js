import template from './customFileInput.handlebars';
import './custom-file.scss';
import './__input/custom-file__input.scss';
import './__label/custom-file__label.scss';

export class CustomFileInputComponent {
    _template;
    _customClasses;
    _input;
    _label;

    constructor({
        customClasses = '',
        input = {
            accept: '',
            customClasses: '',
            name: '',
            form: ''
        },
        label = {
            customClasses: '',
            icon: 'description'
        }
    } = {}) {
        this._customClasses = customClasses;
        this._input = input;
        this._label = label;

        this._template = template({
            customClasses: this._customClasses,
            input:         this._input,
            label:         this._label
        });
    }

    get template() {
        return this._template;
    }
}
