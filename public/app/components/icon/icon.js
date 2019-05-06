export class IconComponent {
    _customClasses;
    _template;
    _name;

    constructor({
        customClasses = '',
        name = ''
    } = {}){
        this._customClasses = customClasses;
        this._name = name;
        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = Handlebars.templates.icon({
            customClasses: this._customClasses,
            name: this._name
        });
    }
}
