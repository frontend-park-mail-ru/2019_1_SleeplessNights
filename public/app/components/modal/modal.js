import { uniqueId } from '../../modules/utils.js';
import template from './modal.handlebars';
import './modal.scss';
import './__content/modal__content.scss';
import './__close/modal__close.scss';
import './__body/modal__body.scss';

export class ModalComponent {
    _body;
    _customClasses;
    _id;
    _isCloseable;
    _header;
    _template;

    constructor({
        customClasses = '',
        header = '',
        isCloseable = true,
        body = ''
    } = {}) {
        this._body = body;
        this._customClasses = customClasses;
        this._id = `modal_${uniqueId()}`;
        this._isCloseable = isCloseable;
        this._header = header;

        this._render();
    }

    get template() {
        return this._template;
    }

    get innerElement() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = template({
            body: this._body,
            customClasses: this._customClasses,
            id: this._id,
            isCloseable: this._isCloseable,
            header: this._header
        });
    }

    show() {
        this.innerElement.style.opacity = 1;
        if (this._isCloseable) {
            this.listenClosing();
        }
    }

    hide() {
        this.innerElement.style.opacity = 0;
        setTimeout(() => {
            const parent = this.innerElement.parentNode;
            parent.removeChild(this.innerElement);
        }, 100);
    }

    listenClosing() {
        const closeBtn = document.getElementById(`close_${this._id}`);
        closeBtn.addEventListener('click', () => this.hide());
    }
}
