import { ScoreboardService } from '../../services/scoreboard-service.js';
import { PaginationComponent } from '../pagination/pagination.js';

export class BoardComponent {
    _el;
    _template;
    _players = [];

    constructor(el) {
        this._el = el;
    }

    get template() {
        return this._el.outerHTML;
    }

    render() {
        this._el.innerHTML = Handlebars.templates.board({
            players: this._players
        });

        ScoreboardService.getLeaders()
            .then(res => res.data)
            .then(players => {
                const pager = new PaginationComponent({
                    baseUrl:    'leaders',
                    pagesNumber: 5
                });
                this._el.innerHTML = Handlebars.templates.board({
                    players
                }) + pager.template;
            })
            .catch(error => console.error('Error:', error));
    }
}
