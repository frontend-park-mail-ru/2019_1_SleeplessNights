import { LinkComponent } from '../link/link.js';

export class PaginationComponent {
    _template;
    _baseUrl;
    _pagesNumber;
    _pages = [];

    constructor({
        baseUrl = '/',
        pagesNumber = 0
    } = {}) {
        this._baseUrl = baseUrl;
        this._pagesNumber = pagesNumber;
        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        [...Array(this._pagesNumber).keys()].forEach(i => {
            const link = new LinkComponent({
                className: 'pagination__item',
                href: `${this._baseUrl}?page=${i + 1}`,
                text: i + 1
            });

            this._pages.push(link.template);
        });

        this._template = Handlebars.templates.pagination({
            pages: this._pages
        });
    }
}
