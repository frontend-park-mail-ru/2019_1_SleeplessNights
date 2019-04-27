import { uniqueId } from '../../modules/utils.js';

export class MsgContainerComponent {
    _template;
    _type;

    constructor({
        type = 'sent',
        datetime = '',
        nickname = '',
        avatarUrl = '',
        msgText = '',
    } = {}){
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
        this._template = Handlebars.templates.msgContainer({
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
