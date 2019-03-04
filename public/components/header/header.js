export class HeaderComponent {
    _template = Handlebars.templates.header;
    constructor({
        title = '',
        subtitle = '',
        btnHome = true
    } = {}) {
        this._title = title;
        this._subtitle = subtitle;
        this._bthHome = btnHome;
    }

    get template() {
        return this._template({
            title: this._title,
            subtitle: this._subtitle,
            btnHome: this._bthHome
        });
    }
}
