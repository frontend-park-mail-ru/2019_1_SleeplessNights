import { ContainerComponent } from '../components/container/container.js';
import { HeaderComponent }    from '../components/header/header.js';
import { ButtonHomeComponent } from '../components/buttonHome/buttonHome.js';
import { IconComponent } from '../components/icon/icon.js';
import { animationTime } from '../modules/constants.js';

export class BaseView {
    constructor(el = document.body) {
        this._el = el;
        this._el.dataset.view = this.constructor.name;
        this._el.hidden = true;

        if (this._backBtn) {
            this.backBtn = new ButtonHomeComponent(this._backBtn);
        }

        if (this._header) {
            const icon = new IconComponent(this._header.icon);
            this.header = new HeaderComponent({
                title: `${icon.template} ${this._header.name}`
            });
        }
    }

    get el() {
        return this._el;
    }

    get active() {
        return !this.el.hidden;
    }

    get _backBtn() {
        return null;
    }

    get _header() {
        return null;
    }

    hide() {
        this.hideAnimation();
        setTimeout(() => this.el.hidden = true, animationTime * 1000);
    }

    show() {
        this.el.hidden = false;
        this.showAnimation();
    }

    hideAnimation() {}

    showAnimation() {}

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
