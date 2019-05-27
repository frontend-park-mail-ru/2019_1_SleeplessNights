import { BaseView } from './base.js';
import { Game }  from '../game/game.js';

export class PlayView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = 'Играть';
    }

    get pageTitle() {
        return this._pageTitle;
    }

    show() {
        this._render();
        super.show();
    }

    _render() {
        super.renderContainer({
            customClasses: 'game h100'
        });

        new Game({
            root: this.root,
            mode: window.location.pathname.replace(/\//g, '')
        });
    }
}
