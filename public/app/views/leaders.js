import { CardComponent }   from '../components/card/card.js';
import { BoardComponent }  from '../components/scoreboard/board.js';
import { HeaderComponent } from '../components/header/header.js';
import { BaseView } from './base.js';

export class LeadersView extends BaseView {
    _pageTitle;

    constructor(el) {
        super(el);
        this._pageTitle = 'Таблица лидеров';
        this._render();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    _render() {
        const board = new BoardComponent();
        const card = new CardComponent({
            customClasses: 'card_centered_both card_profile shadow-l',
            body: board.template
        });

        const header = new HeaderComponent({ title: 'Лучшие игроки' });

        super.renderContainer({
            customClasses: '',
            btnBack: true,
            container: `
                ${header.template}
                ${card.template}
            `,
        });

        bus.emit('fetch-leaders');
    }
}
