import { HeaderComponent }  from '../components/header/header.js';
import { IconComponent }   from '../components/icon/icon.js';
import { LinkComponent }   from '../components/link/link.js';
import { ContainerComponent } from '../components/container/container.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { BaseView } from './base.js';
import { animationTime } from '../modules/constants.js';

export class AboutView extends BaseView {
    _pageTitle;
    _authors;
    _screens;

    constructor(el) {
        super(el);
        this._pageTitle = 'Описание игры';
        this._authors = [
            {
                name: 'Ксения Казанцева',
                position: 'Dear Mentor',
                avatarPath: '/assets/img/mentor.jpg'
            },
            {
                name: 'Максим Пирмамедов',
                position: 'Backend',
                avatarPath: '/assets/img/default-avatar.png'
            },
            {
                name: 'Алексей Ларютин',
                position: 'Backend',
                avatarPath: '/assets/img/default-avatar.png'
            },
            {
                name: 'Максим Уймин',
                position: 'Full-stack',
                avatarPath: '/assets/img/default-avatar.png'
            },
            {
                name: 'Джахонгир Тулфоров',
                position: 'Frontend',
                avatarPath: '/assets/img/jahongir.jpg'
            }
        ];
        this._screens = [];
        this._render();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    get backBtn() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: '',
            dataHref: '/',
            text: '',
            icon: {
                customClasses: 'md-48',
                name: 'arrow_forward_ios'
            }
        });

        this._backBtn = new ContainerComponent({
            customClasses: 'w3 container_theme-primary2 align-items-center',
            content: link.template
        });

        return this._backBtn;
    }

    get _header() {
        const leaderIcon = new IconComponent({
            customClasses: 'md-inherit md-48',
            name: 'info'
        });

        return new HeaderComponent({
            title: `${leaderIcon.template} About`
        });
    }

    get _authorList() {
        this._authors.forEach((author, i) => {
            const avatar = new AvatarComponent({
                customClasses: '',
                avatarPath: author.avatarPath
            });

            const container = new ContainerComponent({
                customClasses: (i === 0 ? 'w100 justify-content-center': 'w49 container__inline-flex'),
                content: `
                    ${avatar.template}
                    <div class="container container_column justify-content-center pl-10px">
                        <h1>${author.name}</h1>
                        <h3 >${author.position}</h3>
                    </div>
                `
            });

            author.template = container.template;
        });

        return this._authors.map(a => a.template).join('');
    }

    get _copyright() {
        const copyrightIcon = new IconComponent({
            customClasses: 'md-inherit',
            name: 'copyright'
        });

        return new ContainerComponent({
            customClasses: 'copyright justify-content-center',
            content: `${copyrightIcon.template} All rights reserved 2019`
        });
    }

    _render() {
        const innerContainer = new ContainerComponent({
            customClasses: 'w75 container_column',
            content: `
                   ${this._header.template}
                   <p>Quiz planet – это классическая игра-викторина элементами стратегии. Вам предстоит сразиться в умственном поединке с лучшими из лучших. Более 5000 текстовых и визуальных вопросов из различных областей.</p>
                   <p>Боритесь за право быть на вершине рейтинга!</p>
                   <ul>
                       <li>Состязайтесь с друзьями из социальных сетей!</li>
                       <li>Присылайте свои вопросы!</li>
                       <li>Добавьте себе индивидуальности редактируя свой профилю</li>
                       <li>Новые вопросы появляются каждую минуту!</li>
                   </ul>
                   <p>Окажитесь на вершине триумфа играя с друзьями и прокладывая свой путь к победе!</p>
                   <h1>Наша команда:</h1>
                   <div>
                        ${this._authorList}
                   </div>
                   ${this._copyright.template}
            `
        });

        this.outerContainer = new ContainerComponent({
            customClasses: 'w97 container_theme-secondary1 justify-content-center overflow-y-scroll',
            content: innerContainer.template
        });

        super.renderContainer({
            customClasses: 'container_skewed h100 container__absolute',
            container: `
                ${this.outerContainer.template}
                ${this.backBtn.template}
            `,
        });

        this._backBtn.href = '/';
    }

    hideAnimation() {
        this._backBtn.hideContent();
        this.outerContainer.hideContent();
        this._backBtn.addClass('anim-page-left');
        this.outerContainer.addClass('anim-page-left');

        setTimeout(() => {
            this._backBtn.removeClass('anim-page-left');
            this.outerContainer.removeClass('anim-page-left');
        }, animationTime * 1000 + 350);
    }

    showAnimation() {
        this._backBtn.showContent();
        this.outerContainer.showContent();
    }
}
