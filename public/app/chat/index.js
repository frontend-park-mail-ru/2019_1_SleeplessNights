import { FullPageChat } from './views/fullPage.js';
import { MinimizedChat } from './views/minimized.js';
import { modes } from './modes.js';

export class Chat {
    constructor({
        root,
        mode = ''
    } = {}) {
        this.root = root;
        this.mode = mode;
        this.chatView = null;
        this.core = null;

        switch(this.mode) {
            case modes.FULL_PAGE:
                this.chatView = FullPageChat;
                break;
            case modes.MINIMIZED:
                this.chatView = MinimizedChat;
                break;
            default:
                throw new Error(`Invalid game mode ${this.mode}`);
        }

        this.core = new this.chatView(this.root);
    }

    hide() {
        if (this.mode === modes.FULL_PAGE) {
            this.core.hide();
        }
    }
}
