import { uniqueId } from '../../modules/utils.js';
import bus from '../../modules/bus.js';
import template from './panel.handlebars';
import './panel.scss';
import './__body/panel__body.scss';
import './__footer/panel__footer.scss';
import './__header/panel__header.scss';
import './_full-page/panel_full-page.scss';
import './_minimized/panel_minimized.scss';
import './_primary/panel_primary.scss';
import './_shorted/panel_shorted.scss';

export class PanelComponent {
    constructor({
        customPanelClass = '',
        customClasses = '',
        header = '',
        body = '',
        footer = ''
    } = {}) {
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
        this._innerElement.classList.add('panel_shorted');
    }

    expand() {
        this._innerElement.classList.remove('panel_shorted');
    }

    _render() {
        this._template = template({
            customPanelClass: this._customPanelClass,
            customClass: this._customClasses,
            header:      this._header,
            body:        this._body,
            footer:      this._footer,
            id:          this._id
        });
    }

    updateBody = (data) => {
        if (this._innerElement) {
            this._innerElement.children[1].insertAdjacentHTML('beforeend', data);
        }
    };
}
