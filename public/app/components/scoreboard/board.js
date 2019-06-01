import { PaginationComponent } from '../pagination/pagination.js';
import bus from '../../modules/bus.js';
import template from './board.handlebars';
import './table.scss';
import './_primary/table_primary.scss';
import './_primary2/table_primary2.scss';
import './__number/table__number.scss';
import './__avatar-block/table__avatar-block.scss';
import './__avatar-block/__img/table__avatar-block__img.scss';

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

    get _innerElem() {
        return document.getElementById('scoreboard');
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
                if (!res.data) return;

                res.data.forEach((item, i) => {
                    this._players.push({
                        number: i + 1,
                        nickname: item.nickname,
                        avatarPath: item.avatarPath,
                        rating: item.rating || 0,
                        winRate: item.winRate || 0,
                        matches: item.matches || 0
                    });
                });

                const pageCount = res.pagesCount || 10;
                if (pageCount && pageCount < 1) {
                    const pager = new PaginationComponent({
                        baseUrl:    'scoreboard',
                        pagesNumber: pageCount,
                        currentPage: res.page
                    });

                    this._template = template({
                        players: this._players
                    }) + pager.template;

                    this._pager = pager;
                } else {
                    this._template = template({
                        players: this._players
                    });
                }

                this.updateContent();
                this.runGetScoreboardByPage();
            })
            .on('error:get-leaders', (data) => console.log(data));
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

    updateContent() {
        this._innerElem.outerHTML = this.template;
    }
}
