import { uniqueId } from '../../modules/utils.js';

export class CellComponent {
    _bgColor;
    _customClasses;
    _id;
    _template;
    _type;

    constructor({
        customClasses = '',
        bgColor = '#fff',
        type = 'question'
    } = {}) {
        this._bgColor = bgColor;
        this._customClasses = customClasses;
        this._id = `ceil_${uniqueId()}`;
        this._type = type;
        this._render();
    }

    get template() {
        return this._template;
    }

    get innerElem() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = Handlebars.templates.cell({
            bgColor:       this._bgColor,
            customClasses: this._customClasses,
            id:   this._id,
            type: this._type
        });
    }

    addClass(className) {
        this.innerElem.style = '';
        this.innerElem.classList.add(className);
    }

    setAnswered() {
        this.addClass('game-board__cell_answered_1');
        this.innerElem.dataset.type += '_answered';

        setTimeout(() => {
            this.removeClass('game-board__cell_answered_1');
            this.addClass('game-board__cell_answered_2');
        }, 1000);
    }

    setFailed() {
        this.addClass('game-board__cell_failed_1');
        this.innerElem.dataset.type += '_failed';

        setTimeout(() => {
            this.removeClass('game-board__cell_failed_1');
            this.addClass('game-board__cell_failed_2');
        }, 1000);
    }

    removeClass(className) {
        this.innerElem.classList.remove(className);
    }
}
