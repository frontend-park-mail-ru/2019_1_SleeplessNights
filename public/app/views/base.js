import { ContainerComponent } from '../components/container/container.js';
import { animationTime } from '../modules/constants.js';

export class BaseView {
    constructor(el = document.body) {
        this._el = el;
        this._el.dataset.view = this.constructor.name;
        this._el.hidden = true;
    }

    get el() {
        return this._el;
    }

    get active() {
        return !this.el.hidden;
    }

    hide() {
        this.hideAnimation();
        setTimeout(() => this.el.hidden = true, animationTime * 1000);
    }

    show() {
        this.el.hidden = false;
        this.showAnimation();
    }

    hideAnimation() {
        throw new Error('This method must be overridden');
    }

    showAnimation() {
        throw new Error('This method must be overridden');
    }

    renderContainer({
        customClasses,
        container = ''
    } = {}) {
        this.root = new ContainerComponent({
            customClasses,
            content: container
        });

        this._el.innerHTML = this.root.template;
    }
}
