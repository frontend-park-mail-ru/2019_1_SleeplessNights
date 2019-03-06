import { ContainerComponent } from '../components/container/container.js';

export class BaseView {

    _el;
    constructor(el = document.body) {
        this._el = el;
    }

    renderContainer({
        customClasses,
        header = '',
        container = '',
        sideBar
    } = {}) {
        const base = new ContainerComponent({
            customClasses,
            content: header + container,
            sideBar
        });

        this._el.innerHTML = base.template;
    }
}
