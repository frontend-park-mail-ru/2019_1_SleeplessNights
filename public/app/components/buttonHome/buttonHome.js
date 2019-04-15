export class ButtonHomeComponent {
    _className;
    _dataHref;
    _href;
    _template;

    constructor({
        href = '/',
        dataHref = 'menu',
        className = ''
    } = {}){
        this._href = href;
        this._dataHref = dataHref;
        this._className = className;
        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = Handlebars.templates.buttonHome({
            href:      this._href,
            dataHref:  this._dataHref,
            className: this._className
        });
    }
}
