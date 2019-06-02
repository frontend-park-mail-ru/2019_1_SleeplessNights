import { CellComponent }      from '../../components/gameBoard/cell/cell.js';
import { GameBoardComponent } from '../../components/gameBoard/gameBoard.js';
import { PackSectionComponent } from '../../components/pack/pack.js';
import { SelectAnswerScene }    from './selectAnswer.js';
import { EndGameScene } from './endGame.js';
import { events }       from '../core/events.js';
import { gameConsts }   from '../../modules/constants.js';
import bus from '../../modules/bus.js';

export class PlayingScene {
    constructor(root, container) {
        this.root = root;
        this.container = container;
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
        bus.on(events.START_TIMEOUT_QUESTION, this.startTimeout);
        bus.on(events.STOP_TIMEOUT_QUESTION,  this.stopTimeout);
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
        for (let i = 0; i < gameConsts.CELL_COUNT ** 2; i++) {
            const newCell = new CellComponent();
            this.cells.push(newCell);
        }

        this.gameBoard = new GameBoardComponent(this.cells.map(cell => cell.template));
        this.container.content = `
            <h3 class="container_theme-secondary3 title_subtitle title_subtitle2">Ваша цель дойти до центра!</h3>
            ${this.gameBoard.template}
            `;
        this.root.insertAdjacentHTML('beforeend', this.packsSection);
    }

    updatePackList = (packs) => {
        const packSection = new PackSectionComponent({
            customClasses: 'container_theme-secondary3',
            packs
        });
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
            const cell = this.cells[i];
            if (!cell) return;
            cell.setDataset('type', d.type);
            cell.bgColor = d.color;
            cell.icon = d.iconPath;
            cell.setDataset('id', i);

            if (++i >= count) clearInterval(timer);
        }, 10);
    };

    onChangePlayer = (pl) => {
        const cond = pl === 'me';
        this.gameBoard[cond ? 'on': 'off']('click', this.chooseQuestion);
        bus.emit(events.START_TIMEOUT_QUESTION, gameConsts.TIMER_QUESTION);
    };

    startTimeout = () => {
        this.timer = setTimeout(() => {
            bus.emit(events.SELECTED_CELL, -1);
            bus.emit(events.ENDED_TIME_TO_QUESTION);
        }, gameConsts.TIMER_QUESTION * 1000);
    };

    stopTimeout = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };

    chooseQuestion = (event) => {
        let target = event.target;
        if (target instanceof HTMLImageElement) {
            target = target.parentNode;
        }

        if ('type' in target.dataset && target.dataset.state === 'active') {
            bus.emit(events.SELECTED_CELL, +target.dataset.id);
        }
    };

    onAnsweredCell = (answer) => {
        const cell = this.cells[this.selectedCell];
        answer ? cell.setAnswered() : cell.setFailed();
    };

    onGetAvailableCells = (availableCells) => {
        this.availableCells = availableCells.map(el => el.id);
        this.availableCells.forEach(i => this.cells[i].setActive());
    };

    onSelectedCell = (id) => {
        this.selectedCell = id;
        this.availableCells.forEach(i => this.cells[i].setDeActive());
        this.availableCells = [];
    };

    destroy() {
        this.selectAnswerScene.destroy();
        this.endGameScene.destroy();
        this.stopTimeout();

        bus.off(events.FILL_PACK_LIST,     this.updatePackList);
        bus.off(events.FILL_CELLS,         this.fillCells);
        bus.off(events.SELECTED_CELL,      this.onSelectedCell);
        bus.off(events.ANSWERED_CELL,      this.onAnsweredCell);
        bus.off(events.SET_CURRENT_PLAYER, this.onChangePlayer);
        bus.off(events.START_TIMEOUT_QUESTION, this.startTimeout);
        bus.off(events.STOP_TIMEOUT_QUESTION,  this.stopTimeout);
        bus.off(`success:${events.GET_AVAILABLE_CELLS}`, this.onGetAvailableCells);
    }
}
