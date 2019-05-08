import { BaseView } from './base.js';
import { Game }  from '../game/game.js';
import { modes } from '../game/modes.js';

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
            customClasses: 'container-new game',
            btnBack: true
        });

        const container = document.getElementsByClassName('game')[0];
        new Game({
            root: container,
            mode: modes.MULTI_PLAYER
        });
    }
}
