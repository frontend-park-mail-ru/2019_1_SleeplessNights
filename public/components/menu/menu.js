import {HeaderComponent} from '../header/header.js'

export class MenuComponent {
    _template = Handlebars.templates.menu;
    _pageTitle = 'Названые игры';
    _pages = [
        {
            link: 'game_modes',
            dataHref: 'gameModes',
            text: 'Играть'
        },
        {
            link: 'description',
            dataHref: 'description',
            text: 'Описание'
        },
        {
            link: 'leaders',
            dataHref: 'leaders',
            text: 'Таблица лидеров'
        },
        {
            link: 'profile',
            dataHref: 'profile',
            text: 'Профиль игрока(временно)'
        },
        {
            link: 'login',
            dataHref: 'login',
            text: 'Войти'
        },
        {
            link: 'signup',
            dataHref: 'signup',
            text: 'Регистрация'
        }
    ];

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

        const pageCount = this._pages.length;

        this._el.innerHTML = this._template({
            header: header.template,
            pages: this._pages.slice(0, pageCount - 2),
            pages2: this._pages.slice(pageCount - 2, pageCount)
        });
    }
}
