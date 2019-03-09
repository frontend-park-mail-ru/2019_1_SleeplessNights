import { noop, uniqueId } from '../../modules/utils.js';

export class LinkComponent {
    _template;
    _id;
    _className;
    _href;
    _dataHref;
    _text;

    constructor({
        href = '/',
        dataHref = 'menu',
        className = '',
        text = 'Home',
    } = {}){
        this._id = 'link' + uniqueId();
        this._className = className;
        this._href = href;
        this._dataHref = dataHref;
        this._text = text;

        this._template = Handlebars.templates.link({
            id:        this._id,
            className: this._className,
            href:      this._href,
            dataHref:  this._dataHref,
            text:      this._text
        });
    }

    _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    on({ event = 'click', callback = noop, capture = false }) {
        this._innerElem.addEventListener(event, callback, capture);
    }

    off({ event = 'click', callback = noop, capture = false }) {
        this._innerElem.removeEventListener(event, callback, capture);
    }
}
