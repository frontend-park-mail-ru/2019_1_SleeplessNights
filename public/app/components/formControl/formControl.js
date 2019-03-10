import { noop, uniqueId } from '../../modules/utils.js';

export class FormControlComponent {
    _template;
    _type;
    _id;
    _customClasses;
    _placeholder;
    _name;
    _value;
    _isValid = true;

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

    startValidation() {
        if (['email', 'text', 'password'].indexOf(this._type) !== -1) {
            this.on({event: 'change', callback: (event) => {
                const value = event.srcElement.value;

                if (this._name === 'nickname') {
                    this._checkNickname(value);
                }

                if (this._type === 'email') {
                    this._checkEmail(value);
                }

                if (this._type === 'password') {
                    this._checkPassword(value);
                }
            }});
        }
    }

    _checkEmail(value) {
        const emailReg = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
        this._checkValid(emailReg.test(value), 'Невалидная почта');
    }

    _checkPassword(value) {
        const passwordReg = RegExp(/^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/);
        this._checkValid(passwordReg.test(value), 'Ненадёжный пароль. Пароль должен быть минимум 8 символов');
    }

    _checkNickname(value) {
        const usernameReg = RegExp(/^[a-z0-9_-]{4,16}$/);
        this._checkValid(usernameReg.test(value), 'Невалидный никнейм');
    }

    _checkValid(condition, text) {
        if (!condition) {
            this.addError(text);
        } else {
            this.removeError();
        }
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

    get isValid() {
        return this._isValid;
    }

    on({ event = 'input', callback = noop, capture = false }) {
        this._innerElem.addEventListener(event, callback, capture);
    }

    off({ event = 'input', callback = noop, capture = false }) {
        this._innerElem.removeEventListener(event, callback, capture);
    }

    addError(error) {
        this._fdInvalid.innerText = error;
        this._innerElem.classList.add('input_invalid');
        this._isValid = false;
    }

    removeError() {
        this._fdInvalid.innerText = '';
        this._innerElem.classList.remove('input_invalid');
        this._isValid = true;
    }
}
