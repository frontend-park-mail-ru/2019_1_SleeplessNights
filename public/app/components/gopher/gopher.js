import { uniqueId, noop } from '../../modules/utils.js';
import { OvalComponent }  from '../oval/oval.js';
import template from './gopher.handlebars';
import './gopher.scss';
import './__img/gopher__img.scss';
import './__eyes/gopher__eyes.scss';

export class GopherComponent {
    _template;
    _mode;
    _id;

    constructor({
        customClasses = '',
        mode = '',
        button = null
    } = {}) {
        this._customClasses = customClasses;
        this._mode = mode;
        this._button = button;
        this._id = 'gopher' + uniqueId();
        this._render();
    }

    get _innerElem() {
        return document.getElementById(this._id);
    }

    get _canvas() {
        return this._innerElem.children[1];
    }

    get template() {
        return this._template;
    }

    _render() {
        this.thinkComponent = new OvalComponent({ mode: 'thought' });
        this.sayComponent = new OvalComponent({ mode: 'speech' });

        this._template = template({
            customClasses: this._customClasses,
            id:     this._id,
            modal:  this._mode === 'modal',
            button: this._button ? this._button : null
        });
    }

    eye(ctx, positionX, positionY, radius) {
        const a = 8.5;
        const pupilX = a * Math.cos(radius) + positionX,
            pupilY = a * Math.sin(radius) + positionY;
        ctx.beginPath();

        ctx.arc(positionX, positionY, 14, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.beginPath();
        // pupil
        ctx.arc(pupilX, pupilY, 5.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    drawEyes = () => {
        const canvasRect = this._canvas.getBoundingClientRect(),
            d = canvasRect.left + this.eyeLeftX,
            p = canvasRect.left + this.eyeRightX,
            h = canvasRect.top + this.eyesY,
            ctx = this._canvas.getContext('2d');

        const radius1 = Math.atan2(this.height - h, this.width - d);
        this.eye(ctx, this.eyeLeftX, this.eyesY, radius1);

        const radius2 = Math.atan2(this.height - h, this.width - p);
        this.eye(ctx, this.eyeRightX, this.eyesY, radius2);

        this.requestId = requestAnimationFrame(this.drawEyes);
    };
    
    startActing() {
        this._innerElem.insertAdjacentHTML('beforeend', this.thinkComponent.template);
        this._innerElem.insertAdjacentHTML('beforeend', this.sayComponent.template);

        this.eyeLeftX = 23;
        this.eyeRightX = 67;
        this.eyesY = 35;
        this.width = document.body.clientWidth / 2;
        this.height = document.body.clientHeight / 2;

        document.addEventListener('mousemove', (event) => {
            this.width = event.clientX;
            this.height = event.clientY;
        });

        this.requestId = requestAnimationFrame(this.drawEyes);
    }
    
    say(text, closeable=true, timeout=100) {
        this.sayComponent.startTyping(text, closeable, timeout);
    }
    
    think(text, closeable=true, timeout=100) {
        this.thinkComponent.startTyping(text, closeable, timeout);
    }

    showModal() {
        this._innerElem.parentElement.style.opacity = 1;
        this._innerElem.parentElement.style.zIndex = 5;
    }

    hideModal() {
        this._innerElem.parentElement.style.opacity = 0;
        this._innerElem.parentElement.style.zIndex = -1;
    }

    on(event, callback = noop) {
        this._innerElem.addEventListener(event, callback);
    }

    off(event, callback = noop) {
        this._innerElem.removeEventListener(event, callback);
    }

    destroy() {
        cancelAnimationFrame(this.requestId);
    }
}
