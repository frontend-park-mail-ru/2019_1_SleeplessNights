import { ContainerComponent } from '../components/container/container.js';
import { ButtonHomeComponent} from '../components/buttonHome/buttonHome.js';

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
        header = {
            title: '',
            subtitle: '',
            btnHome: false
        },
        btnBack = false,
        container = '',
        sideBar
    } = {}) {
        const base = new ContainerComponent({
            customClasses,
            content: container,
            sideBar
        });

        this._el.innerHTML = base.template;

        if (btnBack) {
            const buttonHome = new ButtonHomeComponent();
            this._el.insertAdjacentHTML('beforeend', buttonHome.template);
        }
    }
}
