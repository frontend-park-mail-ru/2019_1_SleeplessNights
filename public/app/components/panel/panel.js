import { uniqueId } from '../../modules/utils.js';

export class PanelComponent {
    _template;

    constructor({
        customPanelClass = '',
        customClasses = '',
        header = '',
        body = '',
        footer = ''
    } = {}){
        this._customPanelClass = customPanelClass;
        this._customClasses = customClasses;
        this._header = header;
        this._body = body;
        this._footer = footer;
        this._id = 'panel' + uniqueId();

        this._render();
        bus.on('chat:update-container', this.updateBody);
    }

    get template() {
        return this._template;
    }

    get _innerElement() {
        return document.getElementById(this._id);
    }

    shorten() {
        this._innerElement.classList.add('panel-shorted');
    }

    expand() {
        this._innerElement.classList.remove('panel-shorted');
    }

    _render() {
        this._template = Handlebars.templates.panel({
            customPanelClass: this._customPanelClass,
            customClass: this._customClasses,
            header:         this._header,
            body:          this._body,
            footer:          this._footer,
            id:            this._id
        });
    }

    updateBody = (data) => {
        this._innerElement.children[1].
            insertAdjacentHTML('beforeend', data);
    };
}
