import { ScoreboardService } from '../../services/scoreboard-service.js';
import { PaginationComponent } from '../pagination/pagination.js';

export class BoardComponent {
    _el;
    _template;
    _players = [];
    _pager;

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

        this._getLeaders();
    }

    _getLeaders() {
        ScoreboardService.getLeaders()
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

                this._pager = pager.innerElement;
                // console.log();
            })
            .catch(error => console.error('Error:', error));
    }

    runGetScoreboardByPage() {
        this._pager.addEventListener('click', (event) => {
            let target = event.target;
            if (!(target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            this._getLeaders();
        });
    }
}
