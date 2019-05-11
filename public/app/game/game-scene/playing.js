import { AvatarComponent } from '../../components/avatar/avatar.js';
import { CellComponent }   from '../../components/gameBoardCell/cell.js';
import { ContainerComponent } from '../../components/_new/container/container.js';
import { GameBoardComponent } from '../../components/gameBoard/gameBoard.js';
import { PackSectionComponent } from '../../components/pack/pack.js';
import { SelectAnswerScene }    from './selectAnswer.js';
import { EndGameScene } from './endGame.js';
import { GameScene } from './index.js';
import { events }    from '../core/events.js';
import bus from '../../modules/bus.js';

export class PlayingScene extends GameScene {
    constructor(root) {
        super(root);
        this.CELL_COUNT = 8;
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
        bus.on(events.SET_ANSWERED_CELL,  this.onAnsweredCell);
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
            customClasses: 'container__col-w25 container_align-items-center',
            content: `${this.avatarMe.template}`
        });

        this.avatarOponent = new AvatarComponent({ customClasses: 'avatar_game-board' });
        const rightContainer = new ContainerComponent({
            customClasses: 'container__col-w25 container_align-items-center',
            content: this.avatarOponent.template
        });

        for (let i = 0; i < this.CELL_COUNT ** 2; i++) {
            const newCell = new CellComponent();
            this.cells.push(newCell);
        }
        this.gameBoard = new GameBoardComponent(this.cells.map(cell => cell.template));

        const centreContainer = new ContainerComponent({
            customClasses: 'container__col-w50 container_align-items-center',
            content: this.gameBoard.template
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
        packSection.on('mouseover', () => icon.style.opacity = 0);
        packSection.on('mouseleave', () => icon.style.opacity = 1);
    };

    fillCells = (data) => {
        const count = data.length;
        let i = 0;

        const timer = setInterval(() => {
            const d = data[i];
            const cell = this.cells[i].innerElem;
            cell.dataset.type = d.type;
            cell.style.backgroundColor = d.color;

            if (d.type === 'question') {
                cell.dataset.id = i;
            }

            if (++i >= count) clearInterval(timer);
        }, 10);
    };

    onChangePlayer = (pl) => {
        if (pl === 'me') {
            this.gameBoard.on('click', this.chooseQuestion);
        } else {
            this.gameBoard.off('click', this.chooseQuestion);
        }
    };

    chooseQuestion = (event) => {
        const target = event.target;
        if ('type' in target.dataset && target.dataset.state === 'active') {
            const type = target.dataset.type;
            if (type === 'question') {
                bus.emit(events.SELECTED_CELL, +target.dataset.id);
            } else if (type === 'prize') {
                bus.emit(events.SELECTED_PRIZE);
            }
        }
    };

    onAnsweredCell = (answer) => {
        const cell = this.cells[this.selectedCell];
        if (answer) {
            cell.setAnswered();
        } else {
            cell.setFailed();
        }
        bus.emit(events.SET_ANSWERED_CELL, { id: this.selectedCell, answer });
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
        bus.off(events.SET_ANSWERED_CELL,  this.onAnsweredCell);
        bus.off(events.SET_CURRENT_PLAYER, this.onChangePlayer);
        bus.off(`success:${events.GET_AVAILABLE_CELLS}`, this.onGetAvailableCells);
    }
}
