import { gameName } from '../modules/constants.js';
import { BaseView } from './base.js';
import { HeaderComponent } from '../components/header/header.js';
import { MenuComponent }   from '../components/menu/menu.js';

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
                    text: 'Play'
                }
            ],
            [
                'profile', {
                    href: 'profile',
                    dataHref: 'profile',
                    className: 'menu__btn',
                    text: 'My Profile'
                },
            ],
            [
                'logout', {
                    href: 'logout',
                    dataHref: 'logout',
                    className: 'menu__btn',
                    text: 'Log Out'
                },
            ],
            [
                'login', {
                    href: 'login',
                    dataHref: 'login',
                    className: 'menu__btn',
                    text: 'Log In'
                },
            ],
            [
                'signup', {
                    href: 'signup',
                    dataHref: 'signup',
                    className: 'menu__btn',
                    text: 'Sign Up'
                }
            ],
            [
                'leaders', {
                    href: 'leaders',
                    dataHref: 'leaders',
                    className: 'menu__btn',
                    text: 'Leaderboard'
                },
            ],
            [
                'about', {
                    href: 'about',
                    dataHref: 'about',
                    className: 'menu__btn',
                    text: 'About'
                },
            ]
        ]);
    }

    get pageTitle(){
        return this._pageTitle;
    }

    show() {
        this._render();
        super.show();
    }

    _render() {
        const items = new Map(this._items);
        if (user.isAuthorised) {
            items.delete('signup');
            items.delete('login');
        } else {
            items.delete('profile');
            items.delete('logout');
        }

        const menu = new MenuComponent({
            items: Array.from(items.values())
        });

        const header = new HeaderComponent({ title: gameName });

        super.renderContainer({
            customClasses: 'container_align-y_center',
            container: `
                ${header.template}
                ${menu.template}
            `
        });
        menu.logOutListening();
    }
}
