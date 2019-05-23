import { uniqueId } from '../../modules/utils.js';
import template from './button.handlebars';
import './btn.scss';
import './_primary/btn_primary.scss';
import './_primary2/btn_primary2.scss';
import './_big/btn_big.scss';

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
        dataHref = '/',
        id = 'btn' + uniqueId()
    } = {}) {
        this._type = type;
        this._className = className;
        this._text = text;
        this._id = id;
        this._dataHref = dataHref;

        this.render();
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    render() {
        this._template = template({
            id:        this._id,
            type:      this._type,
            className: this._className,
            text:      this._text,
            dataHref:  this._dataHref
        });
    }
}
