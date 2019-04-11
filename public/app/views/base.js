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
        header = {
            title: '',
            subtitle: '',
            btnHome: false
        },
        container = '',
        sideBar
    } = {}) {
        // const headerComponent = new HeaderComponent({
        //     title:    header.title,
        //     subtitle: header.subtitle,
        //     btnHome:  header.btnHome
        // content: `${headerComponent.template} ${container}`,
        // });

        const base = new ContainerComponent({
            customClasses,
            content: container,
            sideBar
        });

        this._el.innerHTML = base.template;
    }
}
