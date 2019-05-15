import { uniqueId, noop } from '../../modules/utils.js';
import template from './container.handlebars';
import './container.scss';
import './__inline-flex/container__inline-flex.scss';
import './__square/container__square.scss';
import './_column/container_column.scss';
import './__absolute/container__absolute.scss';
import './__absolute/_skewed/container__absolute_skewed.scss';
import './_skewed/container_skewed.scss';
import './_cursor/container_cursor.scss';
import './_theme/container_theme-primary1.scss';
import './_theme/container_theme-primary2.scss';
import './_theme/container_theme_secondary1.scss';
import './_theme/container_theme_secondary2.scss';
import './_theme/container_theme_secondary3.scss';
import './_theme/container_theme_secondary4.scss';

export class ContainerComponent {
    _customClasses;
    _content;
    _template;

    constructor({
        customClasses = '',
        content = ''
    } = {}) {
        this._customClasses = customClasses;
        this._content = content;
        this._id = 'container' + uniqueId();

        this._render();
    }

    set href(data) {
        this._innerElem.dataset.href = data;
    }

    set width(data) {
        this._innerElem.style.width = data;
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = template({
            customClasses: this._customClasses,
            content:  this._content,
            id:       this._id
        });
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
