import { uniqueId } from '../../../modules/utils.js';
import template from './cell.handlebars';
import './game-board__cell.scss';
import './_min-size/game-board__cell_min-size.scss';
import './_pack/pack__cell.scss';
import './_pack/__img/pack_cell__img.scss';
import './_pack/__text/pack_cell__text.scss';
import './_active/game-board__cell_active.scss';
import './_failed/game-board__cell_failed.scss';
import './_answered/game-board__cell_answered.scss';

export class CellComponent {
    _bgColor;
    _customClasses;
    _id;
    _iconPath;
    _template;
    _type;

    constructor({
        customClasses = '',
        bgColor = '#fff',
        iconPath = '#',
        type = 'question'
    } = {}) {
        this._bgColor = bgColor;
        this._customClasses = customClasses;
        this._iconPath = iconPath;
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

    get icon() {
        return document.getElementById(this._id).firstElementChild;
    }

    set icon(src) {
        this.icon.src = src;
    }

    set bgColor(data) {
        this.innerElem.style.backgroundColor = data;
    }

    set text(data) {
        this.innerElem.insertAdjacentHTML('beforeend', `<span class="pack__cell__text">${data}</span>`);
    }

    setDataset(name, value) {
        this.innerElem.dataset[name] = value;
    }

    _render() {
        this._template = template({
            bgColor: this._bgColor,
            customClasses: this._customClasses,
            id: this._id,
            iconPath: this._iconPath,
            type: this._type
        });
    }

    addClass(className) {
        this.innerElem.classList.add(className);
    }

    setAnswered() {
        this.innerElem.style = '';
        this.addClass('game-board__cell_answered_1');
        this.innerElem.dataset.type += '_answered';
        this.innerElem.dataset.state = 'answered';
        this.icon.style.opacity = 0;

        setTimeout(() => {
            this.removeClass('game-board__cell_answered_1');
            this.addClass('game-board__cell_answered_2');
        }, 1000);
    }

    setFailed() {
        this.innerElem.style = '';
        this.addClass('game-board__cell_failed_1');
        this.innerElem.dataset.type += '_failed';
        this.innerElem.dataset.state = 'failed';
        this.icon.style.opacity = 0;

        setTimeout(() => {
            this.innerElem.innerText = '';
            this.removeClass('game-board__cell_failed_1');
            this.addClass('game-board__cell_failed_2');
        }, 1000);
    }

    setActive() {
        this.addClass('game-board__cell_active');
        this.innerElem.dataset.state = 'active';
    }

    setDeActive() {
        this.removeClass('game-board__cell_active');
        this.innerElem.dataset.state = 'deactive';
    }

    removeClass(className) {
        this.innerElem.classList.remove(className);
    }
}
