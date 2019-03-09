import { noop, uniqueId } from '../../modules/utils.js';

export class ButtonHomeComponent {
    _template;
    _id;
    _href;
    _dataHref;
    _className;

    constructor({
        href = '/',
        dataHref = 'menu',
        className = 'btn-home',
        id = 'btn' + uniqueId()
    } = {}){
        this._href = href;
        this._dataHref = dataHref;
        this._className = className;
        this._id = id;

        this._template = Handlebars.templates.buttonHome({
            href:      this._href,
            dataHref:  this._dataHref,
            className: this._className,
            id:        this._id
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
