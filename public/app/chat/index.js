import { modes } from './modes.js';
import {FullPageChat} from "./views/fullPage.js";
import {MinimizedChat} from "./views/minimized.js";

export class Chat {
    constructor({
        root,
        mode = ''
    } = {}) {
        this.root = root;
        this.chatView = null;
        this.chatCore = null;

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

        this.chatCore = new this.chatView(this.root);
    }

    start() {

    }
}
