import { noop, uniqueId } from '../../modules/utils.js';

export class ButtonComponent {
    _template;
    _type;
    _id;
    _className;
    _text;

    constructor({
        type = 'button',
        className = 'btn-primary',
        text = 'Кнопка',
        id = 'btn' + uniqueId()
    } = {}){
        this._type = type;
        this._className = className;
        this._text = text;
        this._id = id;

        this._template = Handlebars.templates.button({
            id:        this._id,
            type:      this._type,
            className: this._className,
            text:      this._text
        });
    }

    _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
