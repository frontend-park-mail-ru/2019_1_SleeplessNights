import { HeaderComponent } from '../components/header/header.js'
import { CardComponent }   from '../components/card/card.js';
import { ListComponent }   from '../components/list/list.js';
import { BaseView }        from './base.js';

export class ProfileView extends BaseView {
    _pageTitle = 'Профиль игрока';
    _list = [
        {
            customClasses: '',
            text: 'Победы'
        },
        {
            customClasses: '',
            text: 'Поражения'
        },
        {
            customClasses: '',
            text: 'Время в игре'
        }
    ];

    constructor(el) {
        super(el);
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const header = new HeaderComponent({
            title:    'Профиль игрока',
            subtitle: '',
            btnHome:  true
        });
        header.render();

        const list = new ListComponent({
            list: this._list
        });

        const card = new CardComponent({
            customClasses: 'card_empty shadow-l',
            body: `<h3>Никнейм</h3>${list.template}`
        });

        super.renderContainer({
            customClasses: '',
            header: header.template,
            container: card.template
        });
    }
}
