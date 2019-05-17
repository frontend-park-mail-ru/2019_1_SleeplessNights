import { ContainerComponent } from '../container/container.js';
import { LinkComponent } from '../link/link.js';
import template from './buttonHome.handlebars';
import './button-home.scss';

export class ButtonHomeComponent {
    _className;
    _dataHref;
    _href;
    _icon;
    _template;
    _position;
    _mode;

    constructor({
        href = '/',
        dataHref = 'menu',
        mode = '',
        position = 'left',
        className = ''
    } = {}) {
        this._href = href;
        this._dataHref = dataHref;
        this._className = className;
        this._position = position;
        this._mode = mode;
        this._icon = position === 'right' ? 'arrow_forward_ios' : 'arrow_back_ios';
        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: '',
            dataHref: '/',
            text: '',
            icon: {
                customClasses: this._mode === 'minified' ? 'md-36' : 'md-48',
                name: this._icon
            }
        });

        if (this._mode === 'minified') {
            this._template = template({
                dataHref:  this._dataHref,
                className: `${this._className} container container_skewed align-items-center justify-content-right`,
                icon: link.template
            });
        } else {
            this._template = new ContainerComponent({
                customClasses: `w3 align-items-center justify-content-center ${this._className}`,
                content: link.template
            });
        }
    }
}
