import { uniqueId, noop } from '../../modules/utils.js';
import template from './icon.handlebars';
import './centered-icon/centered-icon.scss';

export class IconComponent {
    _customClasses;
    _template;
    _name;
    _id;

    constructor({
        customClasses = '',
        name = ''
    } = {}) {
        this._customClasses = customClasses;
        this._name = name;
        this._id = 'icon' + uniqueId();

        this._render();
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get parent() {
        return this._innerElem.parentElement;
    }

    get template() {
        return this._template;
    }

    set name(data) {
        this._innerElem.innerHTML = data;
    }

    _render() {
        this._template = template({
            customClasses: this._customClasses,
            name: this._name,
            id: this._id
        });
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
