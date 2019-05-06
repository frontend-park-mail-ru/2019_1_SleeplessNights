import { gameName } from '../modules/constants.js';
import { BaseView } from './base.js';
import { LinkComponent }      from '../components/link/link.js';
import { IconComponent }      from '../components/icon/icon.js';
import { ContainerComponent } from '../components/_new/container/container.js';

export class MenuView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = gameName;
        this._items = new Map([
            [
                'profile', {
                    href: 'profile',
                    dataHref: 'profile',
                    customClasses: 'title title_subtitle',
                    text: 'My Profile',
                    icon: {
                        customClasses: 'md-24 md-inherit',
                        name: 'profile'
                    }
                },
            ],
            [
                'logout', {
                    href: 'logout',
                    dataHref: 'logout',
                    customClasses: 'title title_subtitle',
                    text: 'Log Out',
                    icon: {
                        customClasses: 'md-24 md-inherit',
                        name: 'exit_to_app'
                    }
                },
            ],
            [
                'login', {
                    href: 'login',
                    dataHref: 'login',
                    customClasses: 'title title_subtitle',
                    text: 'Log In',
                    icon: {
                        customClasses: 'md-24 md-inherit',
                        name: 'exit_to_app'
                    }
                },
            ],
            [
                'signup', {
                    href: 'signup',
                    dataHref: 'signup',
                    customClasses: 'title title_subtitle',
                    text: 'Sign Up',
                    icon: {
                        customClasses: 'md-24 md-inherit',
                        name: 'person_add'
                    }
                }
            ],
            [
                'leaders', {
                    href: 'leaders',
                    dataHref: 'leaders',
                    customClasses: 'title title_subtitle',
                    text: 'Leaderboard',
                    icon: {
                        customClasses: 'md-24 md-inherit',
                        name: 'poll'
                    }
                },
            ],
            [
                'about', {
                    href: 'about',
                    dataHref: 'about',
                    customClasses: 'title title_subtitle',
                    text: 'About',
                    icon: {
                        customClasses: 'md-24 md-inherit',
                        name: 'info'
                    }
                },
            ]
        ]);

        this._singleBtn = {
            href: 'play',
            dataHref: 'play',
            customClasses: 'title',
            text: 'Single Player',
            icon: {
                customClasses: 'md-inherit',
                name: 'person'
            }
        };

        this._multiBtn = {
            href: 'play',
            dataHref: 'play',
            customClasses: 'title',
            text: 'Multi Player',
            icon: {
                customClasses: 'md-inherit',
                name: 'group'
            }
        };
    }

    get pageTitle(){
        return this._pageTitle;
    }

    get _leftContainer() {
        const singlePlayerBtn = new LinkComponent(this._singleBtn);
        const singlePlayer = new ContainerComponent({
            customClasses: 'container__row-h10 container_justify-content-center',
            content: singlePlayerBtn.template
        });

        const playBtnLeft = new IconComponent({
            customClasses: 'centered-icon-left',
            name: 'play_circle_outline'
        });

        return new ContainerComponent({
            customClasses: 'container__row-h100 container_theme-primary1',
            content: `
                ${singlePlayer.template}
                ${playBtnLeft.template}
            `
        });
    }

    get _rightContainer() {
        const multiPlayerBtn = new LinkComponent(this._multiBtn);
        const multiPlayer = new ContainerComponent({
            customClasses: 'container__row-h10 container_justify-content-center',
            content: multiPlayerBtn.template
        });

        const playBtnRight = new IconComponent({
            customClasses: 'centered-icon-right',
            name: 'play_circle_outline'
        });

        return new ContainerComponent({
            customClasses: 'container__row-h100 container_theme-primary2 container_overflow-hidden',
            content: `
                ${playBtnRight.template}
                ${multiPlayer.template}               
            `
        });
    }

    get _navbar() {
        const items = new Map(this._items);
        if (user.isAuthorised) {
            items.delete('signup');
            items.delete('login');
        } else {
            items.delete('profile');
            items.delete('logout');
        }

        Array.from(items.values()).forEach(item => {
            const link = new LinkComponent(item);
            item.template = link.template;
        });

        const navbarContainer1 = new ContainerComponent({
            customClasses: 'container__row-h10 container_justify-content-left',
            content: `
                ${items.get('leaders').template}
                ${items.get('about').template}
            `
        });

        const navbarContainer2 = new ContainerComponent({
            customClasses: 'container__row-h10 container_justify-content-right',
            content: `
                ${items.get('login').template}
                ${items.get('signup').template}
            `
        });

        return new ContainerComponent({
            customClasses: 'container-new container__absolute-top container__absolute_skewed container_theme-secondary',
            content: `
                ${navbarContainer1.template}
                ${navbarContainer2.template}               
            `
        });
    }

    show() {
        this._render();
        super.show();
    }

    _render() {
        super.renderContainer({
            customClasses: 'container_skewed container__row-h100 container__absolute',
            container: `
                ${this._leftContainer.template}
                ${this._rightContainer.template}
            `
        });

        this._el.insertAdjacentHTML('beforeend', this._navbar.template);
    }
}
