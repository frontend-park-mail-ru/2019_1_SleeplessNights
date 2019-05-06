import { noop, uniqueId } from '../../modules/utils.js';
import { IconComponent }  from '../icon/icon.js';

export class LinkComponent {
    _customClasses;
    _dataHref;
    _href;
    _id;
    _icon;
    _template;
    _text;

    constructor({
        href = '/',
        dataHref = 'menu',
        customClasses = '',
        text = 'Home',
        icon = {
            customClasses: '',
            name: ''
        }
    } = {}) {
        this._customClasses = customClasses;
        this._dataHref = dataHref;
        this._id = 'link' + uniqueId();
        this._icon = icon;
        this._href = href;
        this._text = text;

        this._render();
    }

    get template() {
        return this._template;
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    _render() {
        const icon = new IconComponent(this._icon);

        this._template = Handlebars.templates.link({
            id:        this._id,
            customClasses: this._customClasses,
            href:      this._href,
            dataHref:  this._dataHref,
            text:      icon.template + this._text
        });
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
