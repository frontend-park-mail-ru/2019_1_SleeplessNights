import { uniqueId, noop } from '../../modules/utils.js';
import { CellComponent } from '../gameBoard/cell/cell.js';
import template from './pack.handlebars';
import './__item/packs-section__item.scss';
import './__icon/packs-section__icon.scss';
import './__text/packs-section__text.scss';
import './pack.scss';

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
        this._packs.forEach((p) => {
            const cell = new CellComponent({
                customClasses: 'game-board__cell_min-size',
                bgColor: p.color,
                iconPath: p.iconPath
            });

            p.icon = cell.template
        });

        this._template = template({
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
