import template from './question.handlebars';
import './question.scss';
import './_big/question_big.scss';

export class QuestionComponent {
    _customClasses;
    _text;
    _template;

    constructor({
        customClasses = '',
        text = '',
    } = {}){
        this._customClasses = customClasses;
        this._text = text;
        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = template({
            text:      this._text,
            customClasses:  this._customClasses
        });
    }
}
