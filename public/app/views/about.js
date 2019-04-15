import { PlugComponent }    from '../components/plug/plug.js';
import { SidebarComponent } from '../components/sidebar/sidebar.js';
import { HeaderComponent }  from '../components/header/header.js';
import { CardComponent } from '../components/card/card.js';
import { ListComponent } from '../components/list/list.js';
import { BaseView } from './base.js';

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
            body: `<p>
                        Классический «Lorem ipsum dolor sit amet…» проход отнести к ремиксов римского философа Цицерона 45 г. до н.э. текст De Finibus Bonorum et Malorum («О крайностями добра и зла»). Более конкретно, проход, как полагают, происходит из секций 1.10.32 - 33 из его текста, с наиболее заметным часть извлечена ниже:
                        “Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.”
                   </p> 
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
    }
}
