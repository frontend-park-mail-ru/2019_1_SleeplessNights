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
                attributes:    formControl.attributes,
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

            this._formControls.push(newControl);
        });

        this.render();
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    get formControls() {
        return this._formControls;
    }

    get id() {
        return this._id;
    }

    setFormControlValue(name, text) {
        const fc = this._formControls.find(fc => fc.name === name);
        if (fc !== undefined && text !== '') {
            fc.value = text;
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
            input.addError(error);
        }

        if (name === 'error' && error) {
            const fdInvalid = this._innerElem.lastElementChild;
            fdInvalid.innerText = (typeof error === 'object' ? error.join(',') : error);
        }
    }

    reset() {
        this._formControls.forEach(fc => fc.removeError());
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
