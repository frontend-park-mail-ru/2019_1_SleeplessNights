import { HeaderComponent } from '../components/header/header.js'
import { CardComponent }   from '../components/card/card.js';
import { BoardComponent }  from '../components/scoreboard/board.js';
import { BaseView }        from './base.js';

export class LeadersView extends BaseView {
    _pageTitle = 'Таблица лидеров';

    constructor(el) {
        super(el);
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const header = new HeaderComponent({
            title:    'Лучшие игрокы',
            subtitle: '',
            btnHome:  true
        });
        header.render();

        const card = new CardComponent({
            customClasses: 'card_centered_both card_empty shadow-l',
            body: ''
        });

        super.renderContainer({
            customClasses: '',
            header: header.template,
            container: card.template
        });

        const board = new BoardComponent(card.body);
        board.render();
    }
}
