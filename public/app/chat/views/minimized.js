import {BaseChatView} from "./base.js";

export class MinimizedChat extends BaseChatView {
    constructor(root) {
        super(root);
        this.expanded = true;
        this._render();
    }

    _render() {
        super.renderButton();
        const header = `
            <div>
                <i class='material-icons md-chat'>chat_bubble_outline</i>
                <span class="ml-10">Chat</span> 
            </div>
            <div>
                <i class='material-icons md-chat' id="expand-chat">expand_more</i>
            </div>
        `;
        super.renderPanel('panel_minimized-right panel_minimized', header);

        this.closeBtn = document.getElementById('expand-chat');
        this.closeBtn.addEventListener('click', this.close);
    }

    close = (event) => {
        if (this.expanded) {
            this.expanded = false;
            this.panel.shorten();
        } else  {
            this.expanded = true;
            this.panel.expand();
        }
    }
}
