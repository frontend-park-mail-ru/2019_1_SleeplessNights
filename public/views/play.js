import { MenuComponent } from '../components/menu/menu.js';
import { BaseView }      from './base.js';

export class PlayView extends BaseView{
    _template = Handlebars.templates.game_modes;
    _pageTitle = 'Играть';
    _items = [
        {
            className: 'menu__btn_huge',
            content: {
                href: 'play?mode=single',
                dataHref: 'play',
                className: '',
                text: 'Single player'
            }
        },
        {
            className: 'menu__btn_huge',
            content: {
                href: 'play?mode=single',
                dataHref: 'play',
                className: '',
                text: 'Multi player'
            }
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
        menu.render();

        super.renderContainer({
            customClasses: 'container_align-y_center',
            header: {
                btnHome:  true
            },
            container: menu.template
        });
    }
}
