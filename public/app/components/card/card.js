import { uniqueId } from '../../modules/utils.js';
import bus from '../../modules/bus.js';
import template from './card.handlebars';
import  './card.css';
import  './__body/card__body.css';
import  './__header/card__header.css';
import  './__title/card__title.css';
import  './_centered/card_centered_both.css';
import  './_empty/card_empty.css';

export class CardComponent {
    _template;
    _customClasses;
    _title;
    _body;
    _id;

    constructor({
        customClasses = '',
        title = '',
        body = '',
    } = {}){
        this._customClasses = customClasses;
        this._title = title;
        this._body = body;
        this._id = 'card' + uniqueId();

        this._render();
        this._updateContent();
    }

    get template() {
        return this._template;
    }

    get _innerElement() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = template({
            customClasses: this._customClasses,
            title:         this._title,
            body:          this._body,
            id:            this._id
        });
    }

    _updateContent() {
        bus.on('update-card', (content) => this._innerElement.innerHTML = content);
    }
}
