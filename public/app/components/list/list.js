import template from './list.handlebars';
import './list.scss';
import './__item/list__item.scss';
import './__item-row/list__item-row.scss';

export class ListComponent {
    _template;
    _customClasses;
    _list = [{
        customClasses: '',
        text: ''
    }];

    constructor({
        customClasses = '',
        list
    } = {}) {
        this._customClasses = customClasses;
        this._list = list;
        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = template({
            customClasses: this._customClasses,
            lists:         this._list
        });
    }
}
