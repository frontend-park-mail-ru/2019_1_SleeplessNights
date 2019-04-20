import { LinkComponent } from '../link/link.js';

export class MenuComponent {
    _template;
    _customClasses;
    _items = [];

    constructor({
        customClasses = '',
        items = [{
            href: '/',
            dataHref: 'menu',
            className: '',
            text: ''
        }]
    } = {}) {
        this._customClasses = customClasses;

        items.forEach(item => {
            const link = new LinkComponent({
                href:      item.href,
                dataHref:  item.dataHref,
                className: item.className,
                text:      item.text
            });

            this._items.push({
                name: item.dataHref,
                link
            });
        });

        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = Handlebars.templates.menu({
            customClasses: this._customClasses,
            items:         this._items.map(it => it.link.template)
        });
    }

    logOutListening = () => {
        const logoutLink = this._items.find(it => it.name === 'logout').link;
        if (logoutLink) {
            logoutLink.on('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                bus.emit('logout');
            });
        }
    };
}
