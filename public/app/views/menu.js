import { MenuComponent } from '../components/menu/menu.js';
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
        const menu = new MenuComponent({
            items: Array.from(this._items.values())
        });

        super.renderContainer({
            customClasses: 'container_align-y_center',
            header: {
                title:    gameName,
                subtitle: ``,
                btnHome:  false
            },
            container: menu.template
        });
    }
}
