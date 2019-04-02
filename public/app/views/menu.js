import { MenuComponent } from '../components/menu/menu.js';
import { LinkComponent } from '../components/link/link.js';
import { gameName }      from '../modules/constants.js';
import { BaseView }      from './base.js';

export class MenuView extends BaseView {
    _pageTitle;
    _items;

    constructor(el) {
        super(el);
        this._pageTitle = gameName;
        this._items  = [
            {
                href: 'play',
                dataHref: 'play',
                className: 'menu__btn',
                text: 'Играть'
            },
            {
                href: 'description',
                dataHref: 'description',
                className: 'menu__btn',
                text: 'Описание'
            },
            {
                href: 'leaders',
                dataHref: 'leaders',
                className: 'menu__btn',
                text: 'Таблица лидеров'
            },
            {
                href: 'profile',
                dataHref: 'profile',
                className: 'menu__btn',
                text: 'Профиль игрока(временно)'
            },
            {
                href: 'login',
                dataHref: 'login',
                className: 'menu__btn',
                text: 'Войти'
            },
            {
                href: 'signup',
                dataHref: 'signup',
                className: 'menu__btn',
                text: 'Регистрация'
            }
        ];

        this._render();
    }

    get pageTitle(){
        return this._pageTitle;
    }

    _render() {
        const link = new LinkComponent({
            href: 'login',
            dataHref: 'login',
            text: 'авторизируйтесь',
            className: 'link_primary'
        });

        const menu = new MenuComponent({
            items: this._items
        });

        super.renderContainer({
            customClasses: 'container_align-y_center',
            header: {
                title:    gameName,
                subtitle: `${link.template} чтобы играть онлайн`,
                btnHome:  false
            },
            container: menu.template
        });
    }
}
