import { uniqueId } from '../../modules/utils.js';

export class LoaderComponent {
    _id;
    _template;

    constructor() {
        this._id = `loader_${uniqueId()}`;
        this._render();
    }

    get template() {
        return this._template;
    }

    get innerElement() {
        return document.getElementById(this._id);
    }

    _render() {
        this._template = Handlebars.templates.loader({
            id: this._id
        });
    }

    show() {
        this.innerElement.hidden = false;
        this.innerElement.style.opacity = 1;
        this.innerElement.style.zIndex = 3;
    }

    hide() {
        this.innerElement.style.opacity = 0;
        this.innerElement.style.zIndex = -1;
        setTimeout(() => {
            this.innerElement.hidden = true;
        }, 100);
    }
}
