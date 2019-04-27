import { PlugComponent }    from '../components/plug/plug.js';
import { SidebarComponent } from '../components/sidebar/sidebar.js';
import { HeaderComponent }  from '../components/header/header.js';
import { CardComponent } from '../components/card/card.js';
import { ListComponent } from '../components/list/list.js';
import { BaseView } from './base.js';
import { Chat } from '../chat/index.js';
import { modes } from '../chat/modes.js';

export class AboutView extends BaseView {
    _pageTitle;
    _authors;
    _screens;

    constructor(el) {
        super(el);
        this._pageTitle = 'Описание игры';
        this._authors = ['Максим Уймин', 'Максим Пирмамедов', 'Алексей Ларютин', 'Джахонгир Тулфоров'];
        this._screens = [];
        this._render();
    }

    get pageTitle(){
        return this._pageTitle;
    }

    addChat() {
        new Chat({
            root: this._el,
            mode: modes.MINIMIZED
        });

        bus.emit('created-chat');
    }

    _makeAuthorList() {
        return this._authors.map(author => {
            return {
                customClasses: '',
                text: author
            };
        });
    }

    _render() {
        [...Array(3).keys()].forEach(i => {
            const plug = new PlugComponent({
                text: `Скрин ${i + 1}`
            });

            this._screens.push(plug.template);
        });

        const sidebar = new SidebarComponent({
            customClasses: 'shadow-l',
            title: 'Скрины',
            body: this._screens.join('')
        });

        const authorsList = new ListComponent({
            list: this._makeAuthorList()
        });

        const description = new CardComponent({
            customClasses: 'shadow-l card_width-100',
            body: `<p>Quiz planet – это классическая игра-викторина элементами стратегии. Вам предстоит сразиться в умственном поединке с лучшими из лучших. Более 5000 текстовых и визуальных вопросов из различных областей.</p>
                   <p>Боритесь за право быть на вершине рейтинга!</p>
                   <ul>
                       <li>Состязайтесь с друзьями из социальных сетей!</li>
                       <li>Присылайте свои вопросы!</li>
                       <li>Добавьте себе индивидуальности редактируя свой профилю</li>
                       <li>Новые вопросы появляются каждую минуту!</li>
                   </ul>
                   <p>Окажитесь на вершине триумфа играя с друзьями и прокладывая свой путь к победе!</p>
                   <h3>Авторы:</h3>
                   ${authorsList.template}
            `
        });

        const header = new HeaderComponent({
            title:    'Описание игры'
        });

        super.renderContainer({
            customClasses: 'container-row',
            btnBack: true,
            container: `
                ${header.template}
                ${sidebar.template}
                ${description.template}
            `,
            sideBar: true
        });

        this.addChat();
    }
}
