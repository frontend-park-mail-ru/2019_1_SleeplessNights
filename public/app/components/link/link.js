import { noop, uniqueId } from '../../modules/utils.js';

export class LinkComponent {
    _className;
    _dataHref;
    _href;
    _id;
    _template;
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
        this._render();
    }

    get template() {
        return this._template;
    }

    _innerElem() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = Handlebars.templates.link({
            id:        this._id,
            className: this._className,
            href:      this._href,
            dataHref:  this._dataHref,
            text:      this._text
        });
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
