import { PaginationComponent } from '../pagination/pagination.js';
import bus from '../../modules/bus.js';
import template from './board.handlebars';
import './table.scss';
import './_primary/table_primary.scss';
import './_primary2/table_primary2.scss';
import './__number/table__number.scss';
import './__avatar-block/table__avatar-block.scss';

export class BoardComponent {
    _template;
    _players = [];
    _pager;

    constructor() {
        this._render();
        bus.on('fetch-leaders', () => this._getLeaders(1));
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = template({
            players: this._players
        });
    }

    _getLeaders(page) {
        bus
            .emit('get-leaders', page)
            .on('success:get-leaders', (res) => {
                this._players = [];
                res.data.forEach((item, i) => {
                    this._players.push({
                        number: i + 1,
                        name: item.nickname,
                        avatarPath: item.avatarPath,
                        win: item.won,
                        lost: item.lost,
                        playingTime: item.play_time
                    });
                });

                const pageCount = res.pages_total;
                if (pageCount && pageCount < 1) {
                    const pager = new PaginationComponent({
                        baseUrl:    'scoreboard',
                        pagesNumber: pageCount,
                        currentPage: res.page
                    });

                    this._template = Handlebars.templates.board({
                        players: this._players
                    }) + pager.template;

                    this._pager = pager;
                } else {
                    this._template = Handlebars.templates.board({
                        players: this._players
                    }) + '<p>База Данных сервера пока что пусто...</p>';
                }

                bus.emit('update-card', this.template);
                this.runGetScoreboardByPage();
            })
            .on('error:get-leaders', (data) => {
                bus.emit('update-card', data);
            });
    }

    runGetScoreboardByPage() {
        this._pager.on('click', (event) => {
            let target = event.target;
            if (!(target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            this._getLeaders(target.innerText);
        });
    }
}
