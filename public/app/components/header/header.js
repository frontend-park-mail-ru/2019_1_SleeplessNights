export class HeaderComponent {
    _template;
    _title;
    _subtitle;

    constructor({
        title = '',
        subtitle = ''
    } = {}) {
        this._title = title;
        this._subtitle = subtitle;
        this._render();
    }

    _render() {
        this._template = Handlebars.templates.header({
            title:    this._title,
            subtitle: this._subtitle
        });
    }

    get template() {
        return this._template;
    }
}
