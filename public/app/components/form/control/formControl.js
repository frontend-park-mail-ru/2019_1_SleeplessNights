import { noop, uniqueId } from '../../../modules/utils.js';

export class FormControlComponent {
    _attributes;
    _id;
    _customClasses;
    _name;
    _placeholder;
    _template;
    _type;
    _value;

    constructor({
        type = 'text',
        customClasses = '',
        placeholder = '',
        name = 'text',
        value = '',
        attributes = ''
    } = {}){
        this._attributes = attributes;
        this._type = type;
        this._id = 'formCtrl' + uniqueId();
        this._customClasses = customClasses;
        this._placeholder = placeholder;
        this._name = name;
        this._value = value;

        this._render();
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get _fdInvalid() {
        return this._innerElem.nextElementSibling;
    }

    get template() {
        return this._template;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get value() {
        return this._innerElem.value;
    }

    set value(text) {
        this._innerElem.value = text;
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }

    _render() {
        this._template = Handlebars.templates.formControl({
            attributes:    this._attributes,
            id:            this._id,
            type:          this._type,
            customClasses: this._customClasses,
            placeholder:   this._placeholder,
            name:          this._name,
            value:         this._value
        });
    }

    addError(error) {
        this._fdInvalid.innerText = error;
        this._innerElem.classList.add('input_invalid');
    }

    removeError() {
        this._fdInvalid.innerText = '';
        this._innerElem.classList.remove('input_invalid');
    }
}
