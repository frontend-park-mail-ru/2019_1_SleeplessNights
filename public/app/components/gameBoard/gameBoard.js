import { uniqueId, noop } from '../../modules/utils.js';
import template from './gameBoard.handlebars';
import './game-board.scss';

export class GameBoardComponent {
    _cells;
    _id;
    _template;

    constructor(cells = []) {
        this._cells = cells;
        this._id = `gameBoard_${uniqueId()}`;

        this._render();
    }

    get template() {
        return this._template;
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = template({
            cells: this._cells,
            id:    this._id
        });
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }
}
