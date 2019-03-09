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
    } = {}){
        this._customClasses = customClasses;

        items.forEach(item => {
            const link = new LinkComponent({
                href:      item.href,
                dataHref:  item.dataHref,
                className: item.className,
                text:      item.text
            });

            this._items.push(link.template);
        });
    }

    get template() {
        return this._template;
    }

    render() {
        this._template = Handlebars.templates.menu({
            customClasses: this._customClasses,
            items:         this._items
        });
    }
}
