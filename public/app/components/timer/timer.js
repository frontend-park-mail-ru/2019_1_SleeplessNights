import { uniqueId } from '../../modules/utils.js';
import template from './timer.handlebars';
import './timer.css';

export class TimerComponent {
    _customClasses;
    _id;
    _template;

    constructor({
        customClasses = ''
    } = {}) {
        this._customClasses = customClasses;
        this._id = 'timer' + uniqueId();

        this._render();
    }

    get template() {
        return this._template;
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = template({
            customClasses: this._customClasses,
            id:            this._id
        });
    }

    start(time) {
        const timerTo = new Date( new Date().getTime() + time * 1000);

        this.timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = Math.ceil((timerTo - now) / 1000);

            // let minutes = Math.floor((distance % (60 * 60)) / 60);
            let seconds = Math.floor(distance % 60);

            // if (minutes < 10) minutes = '0' + minutes;
            if (seconds < 10) seconds = '0' + seconds;
            if (seconds <= 5) this._innerElem.classList.add('timer_red');
            if (distance <= 0) clearInterval(this.timer);

            // this._innerElem.innerHTML = `${minutes}:${seconds}`;
            this._innerElem.innerHTML = seconds;
        }, 1000);
    }

    stop() {
        clearInterval(this.timer);
    }
}
