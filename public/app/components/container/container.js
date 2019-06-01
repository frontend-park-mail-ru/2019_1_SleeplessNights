import { uniqueId, noop } from '../../modules/utils.js';
import { animationTime } from '../../modules/constants.js';
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

    set content(data) {
        this._innerElem.innerHTML = data;
    }

    set background(data) {
        this._innerElem.style.background = data;
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

    get parent() {
        return this._innerElem.parentElement;
    }

    get children() {
        return [...this._innerElem.children];
    }

    hideContent() {
        this.children.forEach(c => c.classList.add('anim-opacity'));
        setTimeout(() => {
            if (!this._innerElem) return;
            this.children.forEach(c => c.classList.remove('anim-opacity'));
        },  animationTime * 1000 + 350);
    }

    showContent() {
        this.children.forEach(c => c.classList.add('anim-opacity-2'));
        setTimeout(() => {
            this.children.forEach(c => c.classList.remove('anim-opacity-2'));
        }, (animationTime / 2) * 1000 + 350);
    }

    show() {
        this.addClass('anim-opacity-2');
        setTimeout(() => this.removeClass('anim-opacity-2'), (animationTime / 2) * 1000 + 350);
    }

    hide() {
        this.addClass('anim-opacity');
        setTimeout(() => this.removeClass('anim-opacity'), animationTime * 1000 + 350);
    }

    addClass(name) {
        this._innerElem.classList.add(name);
    }

    removeClass(name) {
        this._innerElem.classList.remove(name);
    }

    insertAdjacentHTML(position, html) {
        this._innerElem.insertAdjacentHTML(position, html);
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
