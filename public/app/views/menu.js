import { gameName } from '../modules/constants.js';
import { BaseView } from './base.js';
import { LinkComponent }      from '../components/link/link.js';
import { IconComponent }      from '../components/icon/icon.js';
import { ContainerComponent } from '../components/container/container.js';

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
                    text: 'Profile',
                    icon: {
                        customClasses: 'md-24 md-inherit',
                        name: 'account_circle'
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
                        name: 'arrow_forward'
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

    get pageTitle() {
        return this._pageTitle;
    }

    get _leftContainer() {
        const singlePlayerBtn = new LinkComponent(this._singleBtn);
        const singlePlayer = new ContainerComponent({
            customClasses: 'container__absolute-left w40-vw align-items-center justify-content-center h100',
            content:       singlePlayerBtn.template
        });

        const playBtn = new IconComponent({
            customClasses: 'centered-icon',
            name: 'play_circle_outline'
        });
        this.leftBtnCotainer = new ContainerComponent({
           customClasses: 'container__absolute w100-vw justify-content-center align-items-center',
           content:       playBtn.template
        });

        this.leftContainer = new ContainerComponent({
            customClasses: 'container__absolute container_theme-primary1 container_cursor-pointer overflow-hidden w50 width-animation',
            content: ` ${singlePlayer.template} ${this.leftBtnCotainer.template} `
        });

        return this.leftContainer;
    }

    get _rightContainer() {
        const multiPlayerBtn = new LinkComponent(this._multiBtn);
        const multiPlayer = new ContainerComponent({
            customClasses: 'container__absolute-right align-items-center justify-content-center h100 w40-vw',
            content: multiPlayerBtn.template
        });

        const playBtn = new IconComponent({
            customClasses: 'centered-icon',
            name: 'play_circle_outline'
        });
        this.rightBtnCotainer = new ContainerComponent({
            customClasses: 'container__absolute w100-vw justify-content-center align-items-center',
            content:       playBtn.template
        });

        this.rightContainer = new ContainerComponent({
            customClasses: 'container__absolute-right container_cursor-pointer container_theme-primary2 w100',
            content: ` ${multiPlayer.template} ${this.rightBtnCotainer.template} `
        });

        return this.rightContainer;
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
            customClasses: 'justify-content-left w100 pl-10px',
            content: ` ${items.get('leaders').template} ${items.get('about').template} `
        });

        const navbarContainer2 = new ContainerComponent({
            customClasses: 'justify-content-right w100 pr-10px',
            content: `
                ${items.has('login') ? items.get('login').template : items.get('profile').template}
                ${items.has('signup') ? items.get('signup').template : items.get('logout').template}
            `
        });

        return new ContainerComponent({
            customClasses: 'container__absolute-top container__absolute_skewed container_theme-secondary w100',
            content: ` ${navbarContainer1.template} ${navbarContainer2.template} `
        });
    }

    show() {
        this._render();
        super.show();
    }

    _render() {
        super.renderContainer({
            customClasses: 'container_skewed container__absolute-top h100',
            container: `
                ${this._leftContainer.template}
                ${this._rightContainer.template}
            `
        });

        this._el.insertAdjacentHTML('beforeend', this._navbar.template);
        this.startListening();
    }

    startListening() {
        this.rightBtnCotainer.href = '/play?mode=multi';
        this.leftBtnCotainer.href = '/play?mode=single';
        this.rightContainer.on('mouseover', () => {
            this.leftContainer.width = '43%';
        });

        this.leftContainer.on('mouseover', () => {
            this.leftContainer.width = '57%';
        });
    }
}
