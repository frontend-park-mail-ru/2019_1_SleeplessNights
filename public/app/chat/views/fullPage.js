import {BaseChatView} from "./base.js";

export class FullPageChat extends BaseChatView {
    constructor(root) {
        super(root);
        this._render();
    }

    _render() {
        super.renderButton();
        const header = `<i class='material-icons md-chat'>chat_bubble_outline</i> <span class="ml-10">Chat</span>`;
        super.renderPanel('panel_full-page', header);
    }
}
