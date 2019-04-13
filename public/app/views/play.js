import { BaseView } from './base.js';
import { Game }  from '../game/game.js';
import { modes } from '../game/modes.js';

export class PlayView extends BaseView {
    constructor(el) {
        super(el);
        this.root = el;
        this._pageTitle = 'Играть';

        this._render();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    _render() {
        super.renderContainer({
            customClasses: 'container-new game',
            btnBack: true
        });

        const container = document.getElementsByClassName('game')[0];
        const game = new Game({
            root: container,
            mode: modes.SINGLE_PLAYER
        });

        game.start();
    }
}
