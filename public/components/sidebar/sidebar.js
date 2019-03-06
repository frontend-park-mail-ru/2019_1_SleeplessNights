export class SidebarComponent {
    _template;
    _customClasses;
    _title;
    _body;

    constructor({
        customClasses = '',
        title = '',
        body = '',
    } = {}){
        this._customClasses = customClasses;
        this._title = title;
        this._body = body;

        this._template = Handlebars.templates.sidebar({
            customClasses: this._customClasses,
            title:         this._title,
            body:          this._body
        });
    }

    get template() {
        return this._template;
    }
}
