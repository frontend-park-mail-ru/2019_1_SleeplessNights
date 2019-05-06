import { BoardComponent }  from '../components/scoreboard/board.js';
import { HeaderComponent } from '../components/header/header.js';
import {IconComponent} from "../components/icon/icon.js";
import {ContainerComponent} from "../components/_new/container/container.js";
import { BaseView } from './base.js';
import bus from '../modules/bus.js';

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
        const leaderIcon = new IconComponent({
            customClasses: ' md-inherit md-48',
            name: 'poll'
        });
        const header = new HeaderComponent({
            title: `${leaderIcon.template} Leader Board`
        });

        const backIcon = new IconComponent({
            customClasses: 'md-48',
            name: 'arrow_forward_ios'
        });
        const backComp = new ContainerComponent({
            customClasses: 'container__col-w10 container_theme-secondary2 container_align-items-start container_justify-content-center',
            content: backIcon.template
        });

        const container = new ContainerComponent({
           customClasses: 'container__col-w90 container_theme-secondary1 container_align-items-center container_justify-content-center',
           content: `
              ${header.template}
              ${board.template}
           `
        });

        super.renderContainer({
            customClasses: 'container_skewed container__row-h100 container__absolute',
            container: `
                ${container.template}
                ${backComp.template}
            `,
        });

        // bus.emit('fetch-leaders');
    }
}
