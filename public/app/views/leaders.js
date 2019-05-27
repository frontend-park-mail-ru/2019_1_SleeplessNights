import { BoardComponent }  from '../components/scoreboard/board.js';
import { ContainerComponent } from '../components/container/container.js';
import { BaseView } from './base.js';
import { animationTime } from '../modules/constants.js';
import bus from '../modules/bus.js';

export class LeadersView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = 'Таблица лидеров';
        this._render();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    get _backBtn() {
        return {
            position: 'right',
            className: 'container_theme-primary2'
        };
    }
    
    get _header() {
        return {
            icon: {
                customClasses: 'md-inherit md-48',
                name: 'poll'
            },
            name: 'Leader Board'
        };
    }

    _render() {
        const board = new BoardComponent();
        this.container = new ContainerComponent({
           customClasses: 'container_column w97 container_theme-secondary1 align-items-center justify-content-center',
           content: `
              ${this.header.template}
              ${board.template}
           `
        });

        super.renderContainer({
            customClasses: 'container_skewed h100 container__absolute w100',
            container: `
                ${this.container.template}
                ${this.backBtn.template}
            `,
        });

        bus.emit('fetch-leaders');
    }

    hideAnimation() {
        this.backBtn.container.hideContent();
        this.container.hideContent();
        this.backBtn.container.addClass('anim-width-to-50');
        this.container.addClass('anim-width-to-50');

        setTimeout(() => {
            this.backBtn.container.removeClass('anim-width-to-50');
            this.container.removeClass('anim-width-to-50');
        }, animationTime * 1000 + 350);
    }

    showAnimation() {
        this.backBtn.container.showContent();
        this.container.showContent();
    }
}
