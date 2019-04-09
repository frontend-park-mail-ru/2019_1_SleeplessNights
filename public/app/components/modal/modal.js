export class ModalComponent {
    _template;
    _customClasses;
    _header;
    _body;

    constructor({
        customClasses = '',
        header = '',
        body = ''
    } = {}){
        this._customClasses = customClasses;
        this._header = header;
        this._body = body;
        this._render();
    }

    get template() {
        return this._template;
    }

    _render () {
        this._template = Handlebars.templates.modal({
            customClasses: this._customClasses,
            header:        this._header,
            body:          this._body
        });
    }
}
