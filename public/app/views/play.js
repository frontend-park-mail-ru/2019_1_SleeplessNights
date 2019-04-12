import { BaseView }        from './base.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { TimerComponent }  from '../components/timer/timer.js';
import { ListComponent } from '../components/list/list.js';
import { CellComponent } from '../components/gameBoardCell/cell.js';
import { CardComponent } from '../components/card/card.js';
import { ContainerComponent } from '../components/_new/container/container.js';
import { GameBoardComponent } from '../components/gameBoard/gameBoard.js';
import { ButtonHomeComponent} from '../components/buttonHome/buttonHome.js';
import { Game }  from '../game/game.js';
import { modes } from '../game/modes.js';

export class PlayView extends BaseView {
    constructor(el) {
        super(el);
        this.root = el;
        this._pageTitle = 'Играть';

        bus.on('fill-pack-list', (data) => this._updatePackList(data));

        this._packsSection = document.createElement('section');
        this._packsSection.className = 'packs-section';
        this._render();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    get packsSection() {
        return this._packsSection.outerHTML;
    }

    set packsSection(data) {
        const ps = document.getElementsByClassName('packs-section')[0];
        ps.innerHTML = data;
    }

    _render() {
        // const timer = new TimerComponent({ time: 8});
        // const listPacks = new ListComponent();
        // this.packsSection = listPacks.template;

        const avatar1 = new AvatarComponent({ customClasses: 'avatar_game-board' });
        const leftContainer = new ContainerComponent({
            customClasses: 'container__col-w25',
            content: `${avatar1.template} ${this.packsSection}`
        });

        const avatar2 = new AvatarComponent({ customClasses: 'avatar_game-board' });
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

        this.root.style.background = 'linear-gradient(180deg, #ffffff 50%, #f3f3f3 50%)';

        const game = new Game({
            root: this.root,
            mode: modes.SINGLE_PLAYER
        });
        game.start();
        // bus.emit('start-timer');
    }

    _updatePackList(packs) {
        const _list = [];
        packs.forEach(pack => {
            const cell = new CellComponent({
                customClasses: 'game-board__cell_pack d_inline-block',
                bgColor: pack.color,
                type: 'pack-description'
            });

            _list.push({
                customClasses: '',
                text: `${cell.template} <span class="pack-name d_inline-block">${pack.name}</span>`
            })
        });

        const list = new ListComponent({ list: _list });
        const card = new CardComponent({
            customClasses: 'card_pack shadow-l',
            body: list.template
        });

        this.packsSection = card.template;
    }
}
