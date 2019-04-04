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
        this._items = new Map([
            [
                'play', {
                    href: 'play',
                    dataHref: 'play',
                    className: 'menu__btn',
                    text: 'Играть'
                }
            ],
            [
                'about', {
                    href: 'about',
                    dataHref: 'about',
                    className: 'menu__btn',
                    text: 'Описание'
                },
            ],
            [
                'leaders', {
                    href: 'leaders',
                    dataHref: 'leaders',
                    className: 'menu__btn',
                    text: 'Таблица лидеров'
                },
            ],
            [
                'profile', {
                    href: 'profile',
                    dataHref: 'profile',
                    className: 'menu__btn',
                    text: 'Профиль игрока'
                },
            ],
            [
                'login', {
                    href: 'login',
                    dataHref: 'login',
                    className: 'menu__btn',
                    text: 'Войти'
                },
            ],
            [
                'signup', {
                    href: 'signup',
                    dataHref: 'signup',
                    className: 'menu__btn',
                    text: 'Регистрация'
                }
            ]
        ]);

        if (user.isAuthorised) {
            this._items.delete('signup');
            this._items.delete('login');
        } else {
            this._items.delete('profile');
        }
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
            items: Array.from(this._items.values())
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
