import { ContainerComponent } from '../components/container/container.js';
import { HeaderComponent }    from '../components/header/header.js';

export class BaseView {

    constructor(el = document.body) {
        this._el = el;
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

        const headerComponent = new HeaderComponent({
            title:    header.title,
            subtitle: header.subtitle,
            btnHome:  header.btnHome
        });
        headerComponent.render();

        const base = new ContainerComponent({
            customClasses,
            content: headerComponent.template + container,
            sideBar
        });

        this._el.innerHTML = base.template;
    }
}
