import { uniqueId } from '../../modules/utils.js';
import template from './timer.handlebars';
import './timer.scss';

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
        if (time < 10) time = '0' + time;
        this._innerElem.innerHTML = time;

        this.timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = Math.ceil((timerTo - now) / 1000);
            let seconds = Math.floor(distance % 60);

            if (seconds < 10) seconds = '0' + seconds;
            if (seconds <= 5) this._innerElem.classList.add('timer_red');
            if (distance <= 0) this.stop();

            this._innerElem.innerHTML = seconds;
        }, 1000);
    }

    stop() {
        clearInterval(this.timer);
        this._innerElem.classList.remove('timer_red');
        this._innerElem.innerHTML = '00';
    }
}
