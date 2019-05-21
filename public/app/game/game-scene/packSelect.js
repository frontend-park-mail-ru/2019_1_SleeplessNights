import { CellComponent }      from '../../components/gameBoard/cell/cell.js';
import { GameBoardComponent } from '../../components/gameBoard/gameBoard';
import { events } from '../core/events.js';
import { gameConsts } from '../../modules/constants.js';
import bus from '../../modules/bus.js';

export class PackSelectScene  {
    constructor(root, container) {
        this.container = container;
        this.cells = [];

        bus.on(events.SELECTED_PACK,   this.onSelectedPack);
        bus.on(events.FILL_PACK_BOARD, this.fillPackBoard);
        bus.on(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
        bus.on(events.SET_CURRENT_PLAYER,   this.onChangePlayer);
        bus.on(events.START_TIMEOUT_PACK, this.startTimeout);
        bus.on(events.STOP_TIMEOUT_PACK,  this.stopTimeout);

        this.render();
    }

    render() {
        for (let i = 0; i < 12; i++) {
            const newCell = new CellComponent({
                customClasses: 'pack__cell justify-content-center align-items-center container_column'
            });
            this.cells.push(newCell);
        }

        this.packBoard = new GameBoardComponent(this.cells.map(cell => cell.template));
        this.container.content = `
            <h3 class="container_theme-secondary3 title_subtitle2">Вибырите тему которая больше всего вам не нравиться</h3>
            ${this.packBoard.template}
        `;
    }

    fillPackBoard = (data) => {
        const count = data.length;
        if (!count) return;
        let i = 0;

        const timer = setInterval(() => {
            const d = data[i];
            d.index = i;
            const cell = this.cells[i];
            if (!cell) return;

            cell.setDataset('type', d.type);
            cell.bgColor = d.color;
            cell.text = d.name;
            cell.icon = d.iconPath;
            cell.setDataset('id', i);

            if (d.type === 'pack') {
                cell.setDataset('state', 'active');
            }
            if (++i >= count) clearInterval(timer);
        }, 10);
    };

    onChangePlayer = (pl) => {
        const cond = pl === 'me';
        this.packBoard[cond ? 'on': 'off']('click', this.choosePack);
        bus.emit(events.START_TIMEOUT_PACK, gameConsts.TIMER_PACK);
    };

    choosePack = (event) => {
        let target = event.target;
        if (target instanceof HTMLImageElement) {
            target = target.parentNode;
        }

        if ('type' in target.dataset && target.dataset.state === 'active') {
            bus.emit(events.SELECTED_PACK, +target.dataset.id);
        }
    };

    onSelectedPack = (id) => {
        if (id !== -1) {
            this.cells[id].setFailed();
        }
    };

    onEndPackSelection = () => {
        this.destroy();
        let i = this.cells.length - 1;
        const timer = setInterval(() => {
            this.cells[i].bgColor = '#fff';
            if (--i < 0) {
                clearInterval(timer);
            }
        }, 20);
    };

    startTimeout = () => {
        this.timer = setTimeout(() => {
            bus.emit(events.SELECTED_PACK, -1);
            bus.emit(events.ENDED_TIME_TO_PACK);
        }, gameConsts.TIMER_PACK * 1000);
    };

    stopTimeout = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };

    destroy() {
        this.stopTimeout();
        bus.off(events.SELECTED_PACK,   this.onSelectedPack);
        bus.off(events.FILL_PACK_BOARD, this.fillPackBoard);
        bus.off(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
        bus.off(events.SET_CURRENT_PLAYER,   this.onChangePlayer);
        bus.off(events.START_TIMEOUT_PACK, this.startTimeout);
        bus.off(events.STOP_TIMEOUT_PACK,  this.stopTimeout);
    }
}
