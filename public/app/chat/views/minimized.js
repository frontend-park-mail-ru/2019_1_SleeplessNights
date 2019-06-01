import { BaseChatView } from './base.js';
import { IconComponent } from '../../components/icon/icon.js';

export class MinimizedChat extends BaseChatView {
    constructor(root) {
        super(root);
        this.expanded = true;
        this.render();
    }

    render() {
        super.renderButton();
        const chatIcon = new IconComponent({ name: 'chat_bubble_outline' });
        this.expandIcon = new IconComponent({ name: 'expand_more' });
        
        const header = `
            <div>
                ${chatIcon.template}
                <span class='ml-10'>Chat</span> 
            </div>
            <div>
                ${this.expandIcon.template}
            </div>
        `;

        const panel = super.renderPanel('panel_minimized-right panel_minimized', header);
        this.root.insertAdjacentHTML('beforeend', panel.template);
        this.startListening();
        this.expandIcon.on('click', this.close);
    }

    close = () => {
        if (this.expanded) {
            this.expanded = false;
            this.expandIcon.name = 'expand_less';
            this.panel.shorten();
        } else  {
            this.expanded = true;
            this.expandIcon.name  = 'expand_more';
            this.panel.expand();
        }
    }
}
