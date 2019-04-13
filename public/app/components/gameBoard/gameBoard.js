import { CellComponent } from '../gameBoardCell/cell.js';
import { uniqueId, noop } from '../../modules/utils.js';

export class GameBoardComponent {
    _cells;
    _template;

    constructor({cellCount = 8} = {}) {
        this.CELL_COUNT = cellCount;
        this._cells = [];
        this.selectedCell = null;
        this._id = `gameBoard_${uniqueId()}`;

        this._render();
        bus.on('fill-cells', (data) => {
            this._fillCells(data);
            this._startListening();
        });

        bus.on('answered-cell', (answer) => {
            const cell = this._cells[this.selectedCell];
            if (answer) {
                cell.setAnswered();
            } else {
                cell.setFailed();
            }
        });
    }

    get template() {
        return this._template;
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get cells() {
        return this._cells;
    }

    _render() {
        for (let i = 0; i < this.CELL_COUNT ** 2; i++) {
            const newCell = new CellComponent();
            this._cells.push(newCell);
        }

        this._template = Handlebars.templates.gameBoard({
            cells: this._cells.map(cell => cell.template),
            id: this._id
        });
    }

    _startListening() {
        this._innerElem.addEventListener('click', (event) => {
            const target = event.target;
            if ('packName' in target.dataset && target.dataset.type === 'question') {
                this.selectedCell = target.dataset.id;
                bus.emit('selected-cell', target.dataset.id);
            }
        });
    }

    _fillCells(data) {
        const count = data.length;
        let i = 0;

        const timer = setInterval(() => {
            const d = data[i];
            const cell = this._cells[i].innerElem;
            cell.dataset.type = d.type;
            cell.style.backgroundColor = d.color;

            if (d.type === 'question') {
                cell.dataset.packName = d.name;
                cell.dataset.id = i;
            }

            if (++i >= count) clearInterval(timer);
        }, 10);
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
