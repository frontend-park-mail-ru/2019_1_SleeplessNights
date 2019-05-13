import { AvatarComponent } from '../../components/avatar/avatar.js';
import { CellComponent }   from '../../components/gameBoard/cell/cell.js';
import { ContainerComponent } from '../../components/container/container.js';
import { GameBoardComponent } from '../../components/gameBoard/gameBoard.js';
import { PackSectionComponent } from '../../components/pack/pack.js';
import { SelectAnswerScene }    from './selectAnswer.js';
import { EndGameScene } from './endGame.js';
import { GameScene }    from './index.js';
import { events }       from '../core/events.js';
import { gameConsts }   from '../../modules/constants.js';
import bus from '../../modules/bus.js';

export class PlayingScene extends GameScene {
    constructor(root) {
        super(root);
        this.cells = [];
        this.availableCells = [];
        this.gameBoard = null;

        this.selectAnswerScene = new SelectAnswerScene(root);
        this.endGameScene = new EndGameScene(root);
        this._packsSection = document.createElement('section');
        this._packsSection.id = 'pack-section';

        bus.on(events.FILL_PACK_LIST,     this.updatePackList);
        bus.on(events.FILL_CELLS,         this.fillCells);
        bus.on(events.SELECTED_CELL,      this.onSelectedCell);
        bus.on(events.ANSWERED_CELL,      this.onAnsweredCell);
        bus.on(events.SET_CURRENT_PLAYER, this.onChangePlayer);
        bus.on(`success:${events.GET_AVAILABLE_CELLS}`, this.onGetAvailableCells);

        this.render();
    }

    get packsSection() {
        return this._packsSection.outerHTML;
    }

    set packsSection(data) {
        const ps = document.getElementById('pack-section');
        ps.outerHTML = data;
    }

    render() {
        this.avatarMe = new AvatarComponent({ customClasses: 'avatar_game-board' });
        const leftContainer = new ContainerComponent({
            customClasses: 'w25 align-items-center justify-content-center',
            content:        this.avatarMe.template
        });

        this.avatarOpponent = new AvatarComponent({ customClasses: 'avatar_game-board' });
        const rightContainer = new ContainerComponent({
            customClasses: 'w25 align-items-center justify-content-center',
            content:       this.avatarOpponent.template
        });

        for (let i = 0; i < gameConsts.CELL_COUNT ** 2; i++) {
            const newCell = new CellComponent();
            this.cells.push(newCell);
        }
        this.gameBoard = new GameBoardComponent(this.cells.map(cell => cell.template));

        const centreContainer = new ContainerComponent({
            customClasses: 'w50 align-items-center justify-content-center',
            content:        this.gameBoard.template
        });

        this.root.insertAdjacentHTML('beforeend', `
                ${leftContainer.template}
                ${centreContainer.template}
                ${rightContainer.template}
                ${this.packsSection}
            `);

        this.root.style.background = 'linear-gradient(180deg, #ffffff 50%, #f3f3f3 50%)';
    }

    updatePackList = (packs) => {
        const packSection = new PackSectionComponent(packs);
        this.packsSection = packSection.template;

        const icon = document.getElementsByClassName('packs-section__icon')[0];
        packSection.on('mouseover',  () => icon.style.opacity = 0);
        packSection.on('mouseleave', () => icon.style.opacity = 1);
    };

    fillCells = (data) => {
        const count = data.length;
        if (!count) return;
        let i = 0;

        const timer = setInterval(() => {
            const d = data[i];
            if (!this.cells[i]) return;
            const cell = this.cells[i].innerElem;

            cell.dataset.type = d.type;
            cell.style.backgroundColor = d.color;
            cell.dataset.id = i;

            if (++i >= count) clearInterval(timer);
        }, 10);
    };

    onChangePlayer = (pl) => {
        this.gameBoard[pl === 'me' ? 'on': 'off']('click', this.chooseQuestion);
    };

    chooseQuestion = (event) => {
        const target = event.target;
        if ('type' in target.dataset && target.dataset.state === 'active') {
            bus.emit(events.SELECTED_CELL, +target.dataset.id);
        }
    };

    onAnsweredCell = (answer) => {
        const cell = this.cells[this.selectedCell];
        if (answer) {
            cell.setAnswered();
        } else {
            cell.setFailed();
        }
    };

    onGetAvailableCells = (availableCells) => {
        this.availableCells = availableCells;
        availableCells.forEach(i => this.cells[i].setActive());
    };

    onSelectedCell = (id) => {
        this.selectedCell = id;
        this.availableCells.forEach(i => this.cells[i].setDeActive());
        this.availableCells = [];
    };

    destroy() {
        super.destroy();
        this.selectAnswerScene.destroy();
        this.endGameScene.destroy();

        bus.off(events.FILL_PACK_LIST,     this.updatePackList);
        bus.off(events.FILL_CELLS,         this.fillCells);
        bus.off(events.SELECTED_CELL,      this.onSelectedCell);
        bus.off(events.ANSWERED_CELL,      this.onAnsweredCell);
        bus.off(events.SET_CURRENT_PLAYER, this.onChangePlayer);
        bus.off(`success:${events.GET_AVAILABLE_CELLS}`, this.onGetAvailableCells);
    }
}
