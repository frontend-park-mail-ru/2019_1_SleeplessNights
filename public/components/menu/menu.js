import { LinkComponent } from '../link/link.js';

export class MenuComponent {
    _template;
    _customClasses;
    _items = [];

    constructor({
        customClasses = '',
        items = [{
            className: '',
            content: {
                href: '/',
                dataHref: 'menu',
                className: '',
                text: ''
            }
        }]
    } = {}){
        this._customClasses = customClasses;

        items.forEach(item => {
            const content = item.content;
            const link = new LinkComponent({
                href:      content.href,
                dataHref:  content.dataHref,
                className: content.className,
                text:      content.text
            });

            this._items.push({
                className: item.className,
                content: link.template
            });
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
