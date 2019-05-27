import template from './icon.handlebars';
import './centered-icon/centered-icon.scss';

export class IconComponent {
    _customClasses;
    _template;
    _name;

    constructor({
        customClasses = '',
        name = ''
    } = {}) {
        this._customClasses = customClasses;
        this._name = name;
        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = template({
            customClasses: this._customClasses,
            name: this._name
        });
    }
}
