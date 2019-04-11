import { CellComponent } from '../gameBoardCell/cell.js';

export class GameBoardComponent {
    constructor({cellCount = 8} = {}) {
        this.CELL_COUNT = cellCount;
        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        let cells = [];
        for (let i = 0; i < this.CELL_COUNT ** 2; i++) {
            const newCell = new CellComponent({
                bgColor: '#fff'
            });
            cells.push(newCell.template);
        }

        this._template = Handlebars.templates.gameBoard({cells});
    }
}
