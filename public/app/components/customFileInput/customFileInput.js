import { uniqueId, noop } from '../../modules/utils.js';
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
        this._input.id = 'fileinput' + uniqueId();
        this._label = label;

        this._template = template({
            customClasses: this._customClasses,
            input: this._input,
            label: this._label
        });
    }

    get _innerElem() {
        return document.getElementById(this._input.id);
    }

    get template() {
        return this._template;
    }

    reset() {
        this._innerElem.value = '';
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
