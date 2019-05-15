import { uniqueId, noop } from '../../modules/utils.js';

export class PackSectionComponent {
    _customClasses;
    _id;
    _template;
    _packs;

    constructor({
        customClasses = '',
        packs = []
    }) {
        this._customClasses = customClasses;
        this._id = `pack_${uniqueId()}`;
        this._packs = packs;
        this._render();
    }

    get template() {
        return this._template;
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = Handlebars.templates.pack({
            customClasses: this._customClasses,
            id: this._id,
            packs: this._packs
        });
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
