import { HeaderComponent } from '../components/header/header.js'
import { MenuComponent }   from '../components/menu/menu.js';
import { LinkComponent }   from '../components/link/link.js';
import { BaseView }        from './base.js';

export class MenuView extends BaseView{
    _pageTitle = 'Название игры';
    _pages = [
        {
            className: '',
            content: {
                href: 'play',
                dataHref: 'play',
                className: '',
                text: 'Играть'
            }
        },
        {
            className: '',
            content: {
                href: 'description',
                dataHref: 'description',
                className: '',
                text: 'Описание'
            }
        },
        {
            className: '',
            content: {
                href: 'leaders',
                dataHref: 'leaders',
                className: '',
                text: 'Таблица лидеров'
            }
        },
        {
            className: '',
            content: {
                href: 'profile',
                dataHref: 'profile',
                className: '',
                text: 'Профиль игрока(временно)'
            }
        },
        {
            className: '',
            content: {
                href: 'login',
                dataHref: 'login',
                className: '',
                text: 'Войти'
            }
        },
        {
            className: '',
            content: {
                href: 'signup',
                dataHref: 'signup',
                className: '',
                text: 'Регистрация'
            }
        }
    ];

    constructor(el) {
        super(el);
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const link = new LinkComponent({
            href: 'login',
            dataHref: 'login',
            text: 'авторизируйтесь',
            className: 'link_primary'
        });

        const header = new HeaderComponent({
            title:    'Названые игры',
            subtitle: `${link.template} чтобы играть онлайн`,
            btnHome:  false
        });
        header.render();

        const menu = new MenuComponent({
            items: this._pages
        });
        menu.render();

        super.renderContainer({
            customClasses: 'container_align-y_center',
            header: header.template,
            container: menu.template
        });
    }
}
