import { LinkComponent }  from '../link/link.js';
import { noop, uniqueId } from '../../modules/utils.js';

export class PaginationComponent {
    _baseUrl;
    _currentPage;
    _id;
    _pagesNumber;
    _pages = [];
    _template;

    constructor({
        baseUrl = '/',
        pagesNumber = 0,
        currentPage = 0
    } = {}) {
        this._baseUrl = baseUrl;
        this._currentPage = currentPage;
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
        const firstPage = `<i class="material-icons md-inherit">first_page</i>`;
        const lastPage = `<i class="material-icons md-inherit">last_page</i>`;

        let _pages = [1, this._currentPage - 1, this._currentPage, this._currentPage + 1, this._pagesNumber];
        const firstPages = [1, 2, 3];
        const lastPages = [this._pagesNumber - 2, this._pagesNumber - 1, this._pagesNumber];

        if (firstPages.includes(this._currentPage)){
            _pages = [...firstPages, 4, this._pagesNumber];
        } else if (lastPages.includes(this._currentPage)) {
            _pages = [1, this._pagesNumber - 3, ...lastPages];
        }

        _pages = _pages.filter(p => p >= 0 && p <= this._pagesNumber);

        [...(new Set(_pages).values())].forEach(i => {
            let text = i;
            let className = 'pagination__item';
            if (i === 1) {
                text = firstPage;
            } else if (i === this._pagesNumber) {
                text = lastPage;
            }

            if (i === this._currentPage) {
                className += ' pagination__item_active';
            }

            const link = new LinkComponent({
                className,
                href: `${this._baseUrl}?page=${i}`,
                text,
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
