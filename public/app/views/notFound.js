import { BaseView } from './base.js';

export class NotFoundView extends BaseView {
    _pageTitle;

    constructor(el) {
        super(el);
        this._pageTitle = '404 Not Found';
        this._render();
    }

    get pageTitle(){
        return this._pageTitle;
    }

    _render() {
        super.renderContainer({
            customClasses: 'not-found',
            btnBack: false,
            container: `<p>404 Not Found</p>`
        });
    }
}
