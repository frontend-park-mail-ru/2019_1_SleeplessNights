import { modes }  from '../modes.js';
import { events } from '../core/events.js';
import bus from '../../modules/bus.js';
import {GopherComponent} from "../../components/gopher/gopher.js";

export class OpponentSearch {
    constructor(root, mode) {
        this.root = root;
        this.mode = mode;

        // this.render();
    }

    render() {
        const gopher = new GopherComponent({
            customClasses: 'gopher-modal',
            mode: 'modal'
        });
        this.root.insertAdjacentHTML('beforeend', gopher.template);
        gopher.startActing();
        gopher.think('Привет дружок. Как ты там ?', 100);
    }
}
