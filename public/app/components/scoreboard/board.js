import { ScoreboardService } from '../../services/scoreboard-service.js';

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

        ScoreboardService.getLeaders()
            .then(res => res.data)
            .then(players => {
                this._el.innerHTML = this._template({
                    players
                });
            })
            .catch(error => console.error('Error:', error));
    }
}
