import { LinkComponent }  from '../link/link.js';
import { noop, uniqueId } from '../../modules/utils.js';

export class PaginationComponent {
    _template;
    _baseUrl;
    _id;
    _pagesNumber;
    _pages = [];

    constructor({
        baseUrl = '/',
        pagesNumber = 0
    } = {}) {
        this._baseUrl = baseUrl;
        this._pagesNumber = pagesNumber;
        this._id = 'pagination' + uniqueId();
        this._render();
    }

    get template() {
        return this._template;
    }

    get innerElement() {
        return document.getElementById(this._id);
    }

    _render() {
        [...Array(this._pagesNumber).keys()].forEach(i => {
            const link = new LinkComponent({
                className: 'pagination__item',
                href: `${this._baseUrl}?page=${i + 1}`,
                text: i + 1,
                dataHref: 'scoreboard'
            });

            this._pages.push(link.template);
        });

        this._template = Handlebars.templates.pagination({
            pages: this._pages,
            id:    this._id
        });
    }

    on(event, callback = noop) {
        this.innerElement.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this.innerElement.removeEventListener(event, callback);
    }
}
