export class ContainerComponent {
    _customClasses;
    _content;
    _template;

    constructor({
        customClasses = '',
        content = ''
    } = {}){
        this._customClasses = customClasses;
        this._content = content;

        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = Handlebars.templates.container2({
            customClasses: this._customClasses,
            content:       this._content
        });
    }
}
