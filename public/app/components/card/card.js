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
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = Handlebars.templates.card({
            customClasses: this._customClasses,
            title:         this._title,
            body:          this._body,
            id:            this._id
        });
    }
}
