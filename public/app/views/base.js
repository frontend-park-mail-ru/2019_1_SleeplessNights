import { ContainerComponent } from '../components/container/container.js';

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
        this.el.hidden = true;
    }

    show() {
        this.el.hidden = false;
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
