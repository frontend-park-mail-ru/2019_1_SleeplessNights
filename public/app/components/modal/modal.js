import { uniqueId } from '../../modules/utils.js';

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
    } = {}){
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
        this._template = Handlebars.templates.modal({
            customClasses: this._customClasses,
            header:        this._header,
            body: this._body,
            id:   this._id
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
