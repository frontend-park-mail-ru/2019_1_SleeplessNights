export class PlugComponent {
    _template;
    _customClasses;
    _text;

    constructor({
        customClasses = '',
        text = 'Скрин'
    } = {}){
        this._customClasses = customClasses;
        this._text = text;

        this._template = Handlebars.templates.plug({
            customClasses: this._customClasses,
            text:          this._text
        });
    }

    get template() {
        return this._template;
    }
}
