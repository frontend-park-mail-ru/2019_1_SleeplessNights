import { uniqueId } from '../../modules/utils.js';

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
        this._template = Handlebars.templates.card({
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
