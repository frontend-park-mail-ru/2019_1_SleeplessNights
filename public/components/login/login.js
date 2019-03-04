import {HeaderComponent} from '../header/header.js'

export class LoginComponent {
    _template = Handlebars.templates.login;
    _pageTitle = 'Авторизация';

    constructor(el = document.body) {
        this._el = el;
        this._title = 'Название игры';
        this._subtitle = '';
        this._btnHome = true;
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const header = new HeaderComponent({
            title: this._title,
            subtitle: this._subtitle,
            btnHome: this._btnHome
        });

        this._el.innerHTML = this._template({
            header: header.template
        });
    }
}
