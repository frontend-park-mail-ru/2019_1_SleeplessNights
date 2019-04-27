import {MsgContainerComponent} from "../../components/msgContainer/msgContainer.js";
import {makeAvatarPath} from "../../modules/utils.js";
import {ButtonComponent} from "../../components/button/button.js";
import {FormControlComponent} from "../../components/formControl/formControl.js";
import {PanelComponent} from "../../components/panel/panel.js";

export class BaseChatView {
    _root;

    constructor(root) {
        this._root = root;
        this._input = {
            type: 'text',
            customClasses: '',
            placeholder: 'Type something ...',
            name: 'message'
        };

        this.messagesSection = document.createElement('div');
        this._root.appendChild(this.messagesSection);

        bus.on('chat:get-message', this.onMessageCome);
    }

    onMessageCome = (message) => {
        if (message.nickname === 'Guest' || message.nickname !== user.nickname) {
            const msgContainer = new MsgContainerComponent({
                type: 'receive',
                datetime: '2009-11-13T20:00',
                nickname: message.nickname,
                avatarUrl: makeAvatarPath(message.avatar_path),
                msgText: message.text
            });

            bus.emit('chat:update-container', msgContainer.template);

            setTimeout(() => {
                msgContainer.show();
            }, 100);
        }
    };

    renderButton() {
        this.button = new ButtonComponent({
            text: `<i class='material-icons md-24'>send</i>`
        });

        this.input = new FormControlComponent(this._input);
    }

    renderPanel(classes, header) {
        this.panel = new PanelComponent({
            customPanelClass: `${classes}`,
            customClasses: `msg-container-base`,
            header: header,
            body: ``,
            footer: `
                <div class="form__group m-none">
                    ${this.input.template}
                </div>
                ${this.button.template}
            `
        });

        this._root.insertAdjacentHTML('beforeend', `${this.panel.template}`);
        this.button.on('click', this.sendMessage);
        this.input.on('keydown', (event) => {
            if(event.keyCode === 13) {
                this.sendMessage();
            }
        });
    };

    sendMessage = () => {
        if (this.input.value) {
            const msgContainer = new MsgContainerComponent({
                type: 'sent',
                datetime: '2009-11-13T20:00',
                nickname: user.nickname,
                avatarUrl: '/assets/img/default-avatar.png',
                msgText: this.input.value
            });

            bus.emit('chat:update-container', msgContainer.template);
            bus.emit('chat:send-message', this.input.value);

            setTimeout(() => {
                msgContainer.show();
            }, 100);

            this.input.value = '';
        }
    };
}
