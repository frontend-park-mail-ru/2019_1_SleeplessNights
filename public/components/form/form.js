import { noop, uniqueId }       from '../../modules/utils.js';
import { FormControlComponent } from '../formControl/formControl.js';

export class FormComponent {
    _template;
    _id;
    _customClasses;
    _method;
    _action;
    _formControls = [];

    constructor({
        customClasses = '',
        method = 'post',
        action = '',
        formControls = [{
            customClasses:'',
            content: {
                type: 'text',
                customClasses: '',
                placeholder: '',
                name: 'text',
                value: ''
            }
        }]
    } = {}){
        this._customClasses = customClasses;
        this._method = method;
        this._action = action;
        this._id = 'form' + uniqueId();

        formControls.forEach(item => {
            const formControl = item.content;
            const newControl = new FormControlComponent({
                type:          formControl.type,
                customClasses: formControl.customClasses,
                placeholder:   formControl.placeholder,
                name:          formControl.name,
                value:         formControl.value
            });

            this._formControls.push({
                customClasses: item.customClasses,
                content: newControl.template
            });

            console.log(newControl.template);
        });
    }

    _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    render() {
        this._template = Handlebars.templates.form({
            id:            this._id,
            customClasses: this._customClasses,
            method:        this._method,
            action:        this._action,
            formControls:  this._formControls
        });
    }

    on({ event = 'submit', callback = noop, capture = false }) {
        this._innerElem.addEventListener(event, callback, capture);
    }

    off({ event = 'submit', callback = noop, capture = false }) {
        this._innerElem.removeEventListener(event, callback, capture);
    }
}
