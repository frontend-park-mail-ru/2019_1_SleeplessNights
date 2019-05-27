import { LinkComponent }      from '../components/link/link.js';
import { IconComponent }      from '../components/icon/icon.js';
import { ContainerComponent } from '../components/container/container.js';
import { BaseView } from './base.js';
import { gameName, animationTime } from '../modules/constants.js';
import bus from '../modules/bus.js';

export class MenuView extends BaseView {
    constructor(el) {
        super(el);
        this._side = '';
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
    
    show() {
        this._render();
        super.show();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    get animationClass() {
        return `anim-page-${this._side}`;
    }

    get _leftContainer() {
        const singlePlayerBtn = new LinkComponent(this._singleBtn);
        this.singlePlayer = new ContainerComponent({
            customClasses: 'container__absolute-left w40-vw align-items-center justify-content-center h100',
            content:       singlePlayerBtn.template
        });

        const playBtn = new IconComponent({
            customClasses: 'centered-icon',
            name: 'play_circle_outline'
        });
        this.leftBtnContainer = new ContainerComponent({
           customClasses: 'container__absolute w100-vw justify-content-center align-items-center',
           content:       playBtn.template
        });

        this.leftContainer = new ContainerComponent({
            customClasses: 'container__absolute container_theme-primary1 container_cursor-pointer overflow-hidden w50 width-animation',
            content: ` ${this.singlePlayer.template} ${this.leftBtnContainer.template} `
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
        this.rightBtnContainer = new ContainerComponent({
            customClasses: 'container__absolute w100-vw justify-content-center align-items-center',
            content:       playBtn.template
        });

        this.rightContainer = new ContainerComponent({
            customClasses: 'container__absolute-right container_cursor-pointer container_theme-primary2 w100',
            content: ` ${multiPlayer.template} ${this.rightBtnContainer.template} `
        });

        return this.rightContainer;
    }

    get _navbar() {
        this.items = new Map(this._items);
        if (user.isAuthorised) {
            this.items.delete('signup');
            this.items.delete('login');
        } else {
            this.items.delete('profile');
            this.items.delete('logout');
        }

        Array.from(this.items.values()).forEach(item => 
            item.link = new LinkComponent(item)
        );

        const navbarContainer1 = new ContainerComponent({
            customClasses: 'justify-content-left w100 pl-10px',
            content: ` ${this.items.get('leaders').link.template} ${this.items.get('about').link.template} `
        });

        const navbarContainer2 = new ContainerComponent({
            customClasses: 'justify-content-right w100 pr-10px',
            content: `
                ${this.items.has('login') ? this.items.get('login').link.template : this.items.get('profile').link.template}
                ${this.items.has('signup') ? this.items.get('signup').link.template : this.items.get('logout').link.template}
            `
        });

        this.navbar = new ContainerComponent({
            customClasses: 'container__absolute-top container__absolute_skewed container_theme-secondary w100',
            content: ` ${navbarContainer1.template} ${navbarContainer2.template} `
        });

        return this.navbar;
    }

    _render() {
        super.renderContainer({
            customClasses: 'container_skewed container__absolute-top h100 w100',
            container: ` ${this._leftContainer.template} ${this._rightContainer.template} `
        });

        this._el.insertAdjacentHTML('beforeend', this._navbar.template);
        this.startListening();
    }

    startListening() {
        if (this.items.has('logout')) {
            this.items.get('logout').link.on('click', () => bus.emit('logout'));
        }

        this.rightBtnContainer.href = '/multiplayer';
        this.leftBtnContainer.href = '/singleplayer';
        this.rightContainer.on('mouseover', () => {
            this.leftContainer.width = '43%';
            this._side = 'right-play';
        });

        this.leftContainer.on('mouseover', () => {
            this.leftContainer.width = '57%';
            this._side = 'left-play';
        });

        this.navbar.on('mouseover', (e) => {
            const percent = Math.floor(e.screenX / screen.width * 100);
            this._side = percent > 50 ? 'right' : 'left';
        });
    }

    hideAnimation() {
        if (this._side.includes('play')) {
            this.root.parent.classList.add(this.animationClass);
            this.rightContainer.addClass('anim-opacity');
            this.leftContainer.addClass(`${this.animationClass.replace('-play', '')}-container`);
        } else {
            this.leftContainer.addClass(this.animationClass);
        }

        this.rightContainer.hideContent();
        this.leftContainer.hideContent();
        this.navbar.hideContent();

        setTimeout(() => {
            if (this._side.includes('play')) {
                this.root.parent.classList.remove(this.animationClass);
                this.rightContainer.removeClass('anim-opacity');
                this.leftContainer.removeClass(`${this.animationClass.replace('-play', '')}-container`);
            } else {
                this.leftContainer.removeClass(this.animationClass);
            }
        }, animationTime * 1000 + 350);
    }

    showAnimation() {
        this.rightContainer.showContent();
        this.leftContainer.showContent();
        this.navbar.showContent();
    }
}
