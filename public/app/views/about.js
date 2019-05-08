import { HeaderComponent }  from '../components/header/header.js';
import { IconComponent }   from '../components/icon/icon.js';
import { LinkComponent }   from '../components/link/link.js';
import { ContainerComponent } from '../components/_new/container/container.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { BaseView } from './base.js';

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
            customClasses: 'container__col-w10 container_theme-primary2 container_align-items-start container_justify-content-center',
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
                customClasses: (i === 0 ? 'container__col-w50': 'container__col-w50'),
                content: `
                    ${avatar.template}
                    <h1>${author.name}</h1>
                    <h3 >${author.position}</h3>
                `
            });

            author.template = container.template;
        });

        return new ContainerComponent({
            customClasses: 'container-new',
            content: this._authors.map(a => a.template).join('')
        });
    }

    _render() {
        const innerContainer = new ContainerComponent({
            customClasses: 'container__col-w75',
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
                   ${this._authorList.template}
            `
        });

        const outerContainer = new ContainerComponent({
            customClasses: 'container__col-w90 container_theme-secondary1 container_align-items-flex-end container_overflow-y-scroll',
            content: innerContainer.template
        });

        super.renderContainer({
            customClasses: 'container_skewed container__row-h100 container__absolute',
            container: `
                ${outerContainer.template}
                ${this.backBtn.template}
            `,
        });

        this._backBtn.href = '/';
    }
}
