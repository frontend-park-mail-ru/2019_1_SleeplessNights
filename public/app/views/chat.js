import { BaseView } from '../views/base.js';
import { modes } from '../chat/modes.js';
import { Chat } from '../chat/index.js';

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

    get pageTitle(){
        return this._pageTitle;
    }

    _render() {
        super.renderContainer({
            customClasses: 'container-new chat',
            btnBack: true
        });

        const container = document.getElementsByClassName('chat')[0];
        new Chat({
            root: container,
            mode: this.mode
        });

        bus.emit('created-chat');
    }
}
