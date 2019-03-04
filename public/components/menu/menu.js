import {HeaderComponent} from '../header/header.js'

export class MenuComponent {
    _template = Handlebars.templates.menu;
    _pageTitle = 'Названые игры';

    constructor(el = document.body) {
        this._el = el;
        this._title = 'Названые игры';
        this._subtitle = '<a href="/login" data-href="login">авторизируйтесь</a> чтобы играть онлайн';
        this._btnHome = false;
    }

    get pageTitle(){
        return this._pageTitle;
    }

    get template() {
        return this._template();
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
