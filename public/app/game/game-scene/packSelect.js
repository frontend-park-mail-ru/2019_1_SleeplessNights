import { CellComponent }      from '../../components/gameBoard/cell/cell.js';
import { GameBoardComponent } from '../../components/gameBoard/gameBoard';
import { events } from '../core/events.js';
import bus from '../../modules/bus.js';

export class PackSelectScene  {
    constructor(root, container) {
        this.container = container;
        this.cells = [];

        bus.on(events.SELECTED_PACK, this.onSelectedPack);
        bus.on(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
        bus.on(events.SET_CURRENT_PLAYER, this.onChangePlayer);
        bus.on(events.FILL_PACK_BOARD, this.fillPackBoard);

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
        this.container.content = this.packBoard.template;
    }

    fillPackBoard = (data) => {
        const count = data.length;
        if (!count) return;
        let i = 0;

        const timer = setInterval(() => {
            const d = data[i];
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
        this.cells[id].setFailed();
    };

    onEndPackSelection = () => {
        let i = this.cells.length - 1;
        const timer = setInterval(() => {
            this.cells[i].bgColor = '#fff';
            if (--i < 0) {
                this.destroy();
                clearInterval(timer);
            }
        }, 20);
    };

    destroy() {
        this.cells = null;
        this.packBoard = null;
        bus.off(events.SELECTED_PACK, this.onSelectedPack);
        bus.off(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
        bus.off(events.SET_CURRENT_PLAYER, this.onChangePlayer);
        bus.off(events.FILL_PACK_BOARD, this.fillPackBoard);
    }
}
