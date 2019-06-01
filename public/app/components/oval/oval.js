import { uniqueId } from '../../modules/utils.js';
import template from './oval.handlebars';
import './oval.scss';
import './__speech/oval-speech.scss';
import './__speech/__text/oval-speech__text.scss';
import './__text/oval__text.scss';
import './__thought/oval-thought.scss';

export class OvalComponent {
    constructor({
        customClasses = '',
        mode = 'speech',
    } = {}) {
        this._customClasses = customClasses;
        this._mode = mode;
        this._id = 'oval' + uniqueId();

        this._render();
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get _text() {
        return document.getElementById(this._id).children[0];
    }

    get template() {
        return this._template;
    }

    show() {
        this._innerElem.style.opacity = 1;
    }

    hide() {
        this._innerElem.style.opacity = 0;
    }

    startTyping(text, closeable, timeout) {
        if (this.interval){
            clearInterval(this.interval);
        } else {
            this.show();
            this._text.innerHTML = '';
        }

        let j = 0;
        const length = text.length;
        this.interval = setInterval(() => {
            this._text.innerHTML += text[j];
            if (++j >= length) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }, timeout);

        if (closeable) {
            setTimeout(() => this.hide(), timeout * length + 500);
        }
    }

    _render() {
        this._template = template({
            id: this._id,
            customClasses: this._customClasses,
            speech: this._mode === 'speech'
        });
    }
}
