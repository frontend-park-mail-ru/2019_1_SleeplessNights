import { uniqueId } from '../../modules/utils.js';

export class CellComponent {
    _bgColor;
    _customClasses;
    _id;
    _template;
    _type;

    constructor({
        customClasses = '',
        bgColor = '',
        type = 'question'
    } = {}) {
        this._bgColor = bgColor;
        this._customClasses = customClasses;
        this._id = `ceil_${uniqueId()}`;
        this._type = type;
        this._render();
    }

    get template() {
        return this._template;
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = Handlebars.templates.cell({
            bgColor:       this._bgColor,
            customClasses: this._customClasses,
            id:   this._id,
            type: this._type
        });
    }

    addClass(className) {
        this._innerElem.classList.add(className);
    }

    removeClass(className) {
        this._innerElem.classList.remove(className);
    }

}
