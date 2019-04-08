import { ContainerComponent } from '../components/container/container.js';
import { ContainerColumnComponent } from "../components/container/__column/container__column";
import { HeaderComponent }    from '../components/header/header.js';

export class BaseView {

    constructor(el = document.body) {
        this._el = el;
    }

    get el() {
        return this._el;
    }

    renderContainer({
        customClasses,
        containerColumn = {
            customClasses = "",

        },
        header = {
            title: '',
            subtitle: '',
            btnHome: false
        },
        container = ''
    } = {}) {

        const headerComponent = new HeaderComponent({
            title:    header.title,
            subtitle: header.subtitle,
            btnHome:  header.btnHome
        });
        headerComponent.render();

        const base = new ContainerComponent({
            customClasses,
            content: headerComponent.template + container
        });

        this._el.innerHTML = base.template;
    }
}
