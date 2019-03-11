import { noop, uniqueId }       from '../../modules/utils.js';
import { FormControlComponent } from '../formControl/formControl.js';

export class FormComponent {
    _template;
    _id;
    _customClasses;
    _method;
    _action;
    _formControls = [];
    _formGroups = [];

    constructor({
        customClasses = '',
        method = 'post',
        action = '',
        formGroups = []
    } = {}){
        this._customClasses = customClasses;
        this._method = method;
        this._action = action;
        this._id = 'form' + uniqueId();

        formGroups.forEach(item => {
            const formControl = item.content;
            const newControl = new FormControlComponent({
                type:          formControl.type,
                customClasses: formControl.customClasses,
                placeholder:   formControl.placeholder,
                name:          formControl.name,
                value:         formControl.value,
                form:          formControl.form
            });

            this._formGroups.push({
                customClasses: item.customClasses,
                content:       newControl.template
            });

            this._formControls.push({
                name:    formControl.name,
                element: newControl
            });
        });

        this.render();
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    get id() {
        return this._id;
    }

    get isValid() {
        let res = true;
        this._formControls.forEach(fc => res &= fc.element.isValid);
        return res;
    }

    setFormControlValue(name, text) {
        const fc = this._formControls.find(fc => fc.name === name);
        if (fc !== undefined && text !== '') {
            fc.element.value = text;
        }
    }

    render() {
        this._template = Handlebars.templates.form({
            id:            this._id,
            customClasses: this._customClasses,
            method:        this._method,
            action:        this._action,
            formGroups:    this._formGroups
        });
    }

    addError(name, error) {
        const input = this._formControls.find(fc => fc.name === name);
        if (input !== undefined && error !== '') {
            input.element.addError(error);
        }

        if (name === 'error') {
            const fdInvalid = this._innerElem.lastElementChild;
            fdInvalid.innerText = error.join(',');
        }
    }

    on({ event = 'submit', callback = noop, capture = false }) {
        this._innerElem.addEventListener(event, callback, capture);
        this._formControls.forEach(fc => fc.element.startValidation());
    }

    off({ event = 'submit', callback = noop, capture = false }) {
        this._innerElem.removeEventListener(event, callback, capture);
    }
}