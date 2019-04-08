export class ContainerColumnComponent {
    _template;
    _customClasses;
    _content;

    constructor(
        {   customClasses = '',
            content = '',
        } = {}){
        this._customClasses = customClasses;
        this._content = content;

        this._template = Handlebars.templates.container__column({
            customClasses: this._customClasses,
            content:       this._content
        });
    }

    get template() {
        return this._template;
    }
}