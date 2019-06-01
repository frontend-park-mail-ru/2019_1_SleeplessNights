import { uniqueId } from '../../modules/utils.js';
import template from './msgContainer.handlebars';
import './msgContainer.scss'
import './__avatar/msgContainer__avatar.scss';
import './__messages/msgContainer__messages.scss';
import './__messages/__text/msgContainer__text.scss';
import './__messages/__time/msgContainer__time.scss';
import './_base/msgContainer_base.scss';
import './_receive/msgContainer_receive.scss';
import './_sent/msgContainer_sent.scss';

export class MsgContainerComponent {
    constructor({
        type = 'sent',
        datetime = '',
        nickname = '',
        avatarUrl = '',
        msgText = '',
    } = {}) {
        this._type = type;
        this._avatarUrl = avatarUrl;
        this._containerClass = 'msg-container_' + this._type;
        this._msgClass = 'msg_' + this._type;
        this._datetime = datetime;
        this._nickname = nickname;
        this._time = datetime;
        this._msgText = msgText;
        this._id = 'msg' + uniqueId();

        this._render();
    }

    get template() {
        return this._template;
    }

    get _innerElement() {
        return document.getElementById(this._id);
    }

    show() {
        this._innerElement.style.opacity = 1;
    }

    _render() {
        this._template = template({
            avatarUrl: this._avatarUrl,
            datetime: this._datetime,
            containerClass: this._containerClass,
            msgText: this._msgText,
            msgClass: this._msgClass,
            time: this._time,
            nickname: this._nickname,
            id: this._id
        });
    }
}
