import { BaseView }        from './base.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { TimerComponent }  from '../components/timer/timer.js';
import { ContainerComponent } from '../components/_new/container/container.js';
import { GameBoardComponent } from '../components/gameBoard/gameBoard.js';
import { ButtonHomeComponent} from '../components/buttonHome/buttonHome.js';

export class PlayView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = 'Играть';
        this._render();
        this.CELL_COLORS = [
            '#B3B156',
            '#ADE0FF',
            '#FFFD94',
            '#CC6264',
            '#00FFC5',
            '#FFB454'
        ];
    }

    get pageTitle(){
        return this._pageTitle;
    }

    _render() {
        const timer = new TimerComponent({ time: 8});
        const avatar1 = new AvatarComponent();
        const leftContainer = new ContainerComponent({
            customClasses: 'container__col-w25',
            content: avatar1.template
        });

        const avatar2 = new AvatarComponent();
        const rightContainer = new ContainerComponent({
            customClasses: 'container__col-w25',
            content: avatar2.template
        });

        const gameBoard = new GameBoardComponent();
        const centreContainer = new ContainerComponent({
            customClasses: 'container__col-w50',
            content: gameBoard.template
        });

        const buttonHome = new ButtonHomeComponent();

        super.renderContainer({
            customClasses: 'container-new',
            container: `
                ${buttonHome.template}
                ${leftContainer.template}
                ${centreContainer.template}
                ${rightContainer.template}
            `
        });

        // bus.emit('start-timer');
    }
}
