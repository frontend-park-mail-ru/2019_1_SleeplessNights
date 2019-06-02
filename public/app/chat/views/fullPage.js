import { BaseChatView } from './base.js';
import { IconComponent } from '../../components/icon/icon.js';
import { ButtonHomeComponent } from '../../components/buttonHome/buttonHome.js';
import { ContainerComponent }  from '../../components/container/container.js';
import { animationTime } from '../../modules/constants.js';

export class FullPageChat extends BaseChatView {
    constructor(root) {
        super(root);
        this.render();
    }

    render() {
        this.backButton = new ButtonHomeComponent({
            position: 'right',
            className: 'container_theme-primary2'
        });

        super.renderButton();
        const chatIcon = new IconComponent({ name: 'chat_bubble_outline' });
        const header = `${chatIcon.template} <span class="ml-10">Chat</span>`;

        const panel = super.renderPanel('panel_full-page', header);
        this.outerContainer = new ContainerComponent({
            customClasses: 'w97 container_theme-secondary1 justify-content-center',
            content: panel.template
        });

        this.root.insertAdjacentHTML('beforeend', `${this.outerContainer.template}`);
        this.root.insertAdjacentHTML('beforeend', `${this.backButton.template}`);
        this.startListening();

        this.backButton.container.showContent();
        this.outerContainer.showContent();
    }

    hide() {
        this.backButton.container.hideContent();
        this.outerContainer.hideContent();
        this.backButton.container.addClass('anim-width-to-50');
        this.outerContainer.addClass('anim-width-to-50');

        setTimeout(() => {
            this.backButton.container.removeClass('anim-width-to-50');
            this.outerContainer.removeClass('anim-width-to-50');
        }, animationTime * 1000 + 350);
    }
}
