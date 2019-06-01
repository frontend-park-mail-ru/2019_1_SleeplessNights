import { BaseView } from '../views/base.js';
import { modes } from '../chat/modes.js';
import { Chat } from '../chat/index.js';
import bus from '../modules/bus.js';

export class ChatView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = 'Чат';
        this.mode = modes.FULL_PAGE;
    }

    show() {
        this._render();
        super.show();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    _render() {
        super.renderContainer({
            customClasses: 'container_skewed h100 w100 container__absolute'
        });

        this.chat = new Chat({
            root: this.root,
            mode: this.mode
        });

        bus.emit('created-chat');
    }

    hideAnimation() {
        this.chat.hide();
    }
}
