import { CardComponent }  from '../components/card/card.js';
import { BaseView }       from './base.js';

export class LeadersView extends BaseView {
    _pageTitle = 'Таблица лидеров';

    constructor(el) {
        super(el);
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const card = new CardComponent({
            customClasses: 'card_centered_both card_empty shadow-l',
            body: ''
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
