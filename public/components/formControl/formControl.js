import { noop, uniqueId } from '../../modules/utils.js';

export class FormControlComponent {
    _template;
    _type;
    _id;
    _customClasses;
    _placeholder;
    _name;
    _value;

    constructor({
        type = 'text',
        customClasses = '',
        placeholder = '',
        name = 'text',
        value = ''
    } = {}){
        this._type = type;
        this._id = 'formCtrl' + uniqueId();
        this._customClasses = customClasses;
        this._placeholder = placeholder;
        this._name = name;
        this._value = value;

        this._template = Handlebars.templates.formControl({
            id:            this._id,
            type:          this._type,
            customClasses: this._customClasses,
            placeholder:   this._placeholder,
            name:          this._name,
            value:         this._value
        });
    }

    _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    on({ event = 'input', callback = noop, capture = false }) {
        this._innerElem.addEventListener(event, callback, capture);
    }

    off({ event = 'input', callback = noop, capture = false }) {
        this._innerElem.removeEventListener(event, callback, capture);
    }
}
