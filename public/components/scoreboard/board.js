import { BoardService } from '../../services/board-service.js';

export class BoardComponent {
    _el;
    _template = Handlebars.templates.board;
    _players = [];

    constructor(el) {
        this._el = el;
    }

    get template() {
        return this._el.outerHTML;
    }

    render() {
        this._el.innerHTML = this._template({
            players: this._players
        });

        BoardService.getLeaders()
            .then(res => res.data)
            .then(players => {
                this._el.innerHTML = this._template({
                    players
                });
            })
            .catch(error => console.error('Error:', error));
    }
}
