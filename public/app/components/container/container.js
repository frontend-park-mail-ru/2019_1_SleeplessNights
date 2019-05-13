import { uniqueId } from '../../modules/utils.js';
import {noop} from "../../modules/utils";

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
        this._template = Handlebars.templates.container({
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
