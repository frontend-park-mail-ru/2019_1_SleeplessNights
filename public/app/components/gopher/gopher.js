import { uniqueId } from '../../modules/utils.js';
import template from './gopher.handlebars';
import './gopher.scss';

export class GopherComponent {
    _template;
    _type;
    _id;
    _className;
    _text;

    constructor({
        className = '',
        mode = 'thinking',
        text = ''
    } = {}) {
        this._type = type;
        this._className = className;
        this._text = text;
        this._id = 'gopher' + uniqueId();

        this._template = template({
            id:        this._id,
            type:      this._type,
            className: this._className,
            text:      this._text
        });
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }
}
