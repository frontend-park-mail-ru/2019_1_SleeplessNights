import { MenuComponent } from '../components/menu/menu.js';
import { BaseView }      from './base.js';

export class PlayView extends BaseView {
    _pageTitle = 'Играть';
    _items = [
        {
            href: 'play?mode=single',
            dataHref: 'play',
            className: 'menu__btn menu__btn_huge',
            text: 'Single player'
        },
        {
            href: 'play?mode=multi',
            dataHref: 'play',
            className: 'menu__btn menu__btn_huge',
            text: 'Multi player'
        }
    ];

    constructor(el) {
        super(el);
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const menu = new MenuComponent({
            customClasses: 'menu_horizontal',
            items:         this._items
        });

        super.renderContainer({
            customClasses: 'container_align-y_center',
            header: {
                btnHome:  true
            },
            container: menu.template
        });
    }
}
