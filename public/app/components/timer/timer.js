export class TimerComponent {
    _customClasses;
    _id;
    _template;
    _time;

    constructor({
        customClasses = '',
        time = 0
    } = {}) {
        this._customClasses = customClasses;
        this._time = time;
        this._render();
        bus.on('start-timer', () => this._startTimer());
    }

    get template() {
        return this._template;
    }

    get _innerElem() {
        return document.getElementsByClassName('timer')[0];
    }

    _render() {
        this._template = Handlebars.templates.timer({
            customClasses: this._customClasses,
            id:            this._id
        });
    }

    _startTimer() {
        const timerTo = new Date( new Date().getTime() + ++this._time * 1000);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = Math.ceil((timerTo - now) / 1000);

            let minutes = Math.floor((distance % (60 * 60)) / 60);
            let seconds = Math.floor(distance % 60);

            if (minutes < 10) minutes = '0' + minutes;
            if (seconds < 10) seconds = '0' + seconds;
            if (seconds <= 5) this._innerElem.classList.add('timer_red');
            if (distance <= 0) clearInterval(timer);

            this._innerElem.innerHTML = `${minutes}:${seconds}`;
        }, 1000);
    }
}
