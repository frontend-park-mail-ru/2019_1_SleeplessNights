import { FullPageChat } from './views/fullPage.js';
import { MinimizedChat } from './views/minimized.js';
import { modes } from './modes.js';

export class Chat {
    constructor({
        root,
        mode = ''
    } = {}) {
        this.root = root;
        this.chatView = null;

        switch(mode) {
            case modes.FULL_PAGE:
                this.chatView = FullPageChat;
                break;
            case modes.MINIMIZED:
                this.chatView = MinimizedChat;
                break;
            default:
                throw new Error(`Invalid game mode ${mode}`);
        }

        new this.chatView(this.root);
    }
}
