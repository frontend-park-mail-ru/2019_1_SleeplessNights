import { CellComponent } from '../gameBoardCell/cell.js';
import { uniqueId } from '../../modules/utils.js';

export class GameBoardComponent {
    _cells;
    _template;

    constructor({cellCount = 8} = {}) {
        this.CELL_COUNT = cellCount;
        this._cells = [];
        this._id = `ceil_${uniqueId()}`;

        this._render();
        bus.on('fill-cells', (data) => {
            this._fillCells(data);
            this._startListening();
        });
    }

    get template() {
        return this._template;
    }

    get innerElem() {
        return document.getElementById(this._id);
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
        this.innerElem.addEventListener('click', (event) => {
            const target = event.target;
            if ('packName' in target.dataset) {
                bus.emit('selected-cell', target.dataset.packName);
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

            if (d.type === 'question') cell.dataset.packName = d.name;
            if (++i >= count) clearInterval(timer);
        }, 10);
    }
}
