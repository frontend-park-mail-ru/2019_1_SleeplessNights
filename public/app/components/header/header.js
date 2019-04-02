import { ButtonHomeComponent } from '../buttonHome/buttonHome.js';

export class HeaderComponent {
    _template;
    _title;
    _subtitle;
    _btnHome;
    _btnHomeTemplate;

    constructor({
        title = '',
        subtitle = '',
        btnHome = true
    } = {}) {
        this._title = title;
        this._subtitle = subtitle;
        this._btnHome = btnHome;
        this._btnHomeTemplate = '';

        this._render();
    }

    _render() {
        if (this._btnHome) {
            const btnHome = new ButtonHomeComponent();
            this._btnHomeTemplate = btnHome.template;
        }

        this._template = Handlebars.templates.header({
            title:           this._title,
            subtitle:        this._subtitle,
            btnHome:         this._btnHome,
            btnHomeTemplate: this._btnHomeTemplate
        });
    }

    get template() {
        return this._template;
    }
}
