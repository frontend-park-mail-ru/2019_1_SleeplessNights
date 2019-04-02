import { CardComponent }  from '../components/card/card.js';
import { BaseView }       from './base.js';
import { BoardComponent } from '../components/scoreboard/board.js';

export class LeadersView extends BaseView {
    _pageTitle;

    constructor(el) {
        super(el);
        this._pageTitle = 'Таблица лидеров';
        this._render();
    }

    get pageTitle(){
        return this._pageTitle;
    }

    _render() {
        const board = new BoardComponent();
        const card = new CardComponent({
            customClasses: 'card_centered_both card_empty shadow-l',
            body: board.template
        });

        super.renderContainer({
            customClasses: '',
            header: {
                title:    'Лучшие игрокы',
                subtitle: '',
                btnHome:  true
            },
            container: card.template
        });
    }
}
