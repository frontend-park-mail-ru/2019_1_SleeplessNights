import { ScoreboardService } from '../../services/scoreboard-service.js';
import { PaginationComponent } from '../pagination/pagination.js';

export class BoardComponent {
    _el;
    _template;
    _players = [];
    _pager;

    constructor(el) {
        this._el = el;
        this._render();
    }

    get template() {
        return this._el.outerHTML;
    }

    _render() {
        this._el.innerHTML = Handlebars.templates.board({
            players: this._players
        });

        this._getLeaders(1);
    }

    _getLeaders(page) {
        ScoreboardService.getLeaders(page)
            .then(res => {
                const players = res.data;
                const pageCount = res.pages_total;
                const currentPage = res.page;

                const pager = new PaginationComponent({
                    baseUrl:    'scoreboard',
                    pagesNumber: pageCount
                });

                this._el.innerHTML = Handlebars.templates.board({
                    players
                }) + pager.template;

                this._pager = pager;
            })
            .then(() => this.runGetScoreboardByPage())
            .catch(error => console.error('Error:', error));
    }

    runGetScoreboardByPage() {
        this._pager.on({event: 'click', callback: (event) => {
            let target = event.target;
            if (!(target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            this._getLeaders(target.innerText);
        }});
    }
}
