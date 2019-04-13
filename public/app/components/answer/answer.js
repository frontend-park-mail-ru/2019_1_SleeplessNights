import { uniqueId } from '../../modules/utils.js';

export class AnswerComponent {
    _answerId;
    _customClasses;
    _id;
    _text;
    _template;

    constructor({
        customClasses = '',
        text = '',
        answerId = '',
    } = {}){
        this._answerId = answerId;
        this._customClasses = customClasses;
        this._text = text;
        this._id = `answer${uniqueId()}`;
        this._render();
    }

    get template() {
        return this._template;
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = Handlebars.templates.answer({
            answerId:      this._answerId,
            customClasses: this._customClasses,
            id:   this._id,
            text: this._text,
        });
    }

    setCorrect() {
        this._innerElem.classList.add('answer_success');
    }

    setFailed() {
        this._innerElem.classList.add('answer_failed');
    }
}
