import { uniqueId } from '../../../modules/utils.js';

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

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = Handlebars.templates.container2({
            customClasses: this._customClasses,
            content:  this._content,
            id:       this._id
        });
    }
}
