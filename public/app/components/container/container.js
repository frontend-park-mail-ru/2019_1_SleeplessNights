export class ContainerComponent {
    _template;
    _customClasses;
    _content;
    _sideBar;

    constructor({
        customClasses = '',
        content = '',
        sideBar = false
    } = {}){
        this._customClasses = customClasses;
        this._content = content;
        this._sideBar = sideBar;

        this._render();
    }

    get template() {
        return this._template;
    }

    _render() {
        this._template = Handlebars.templates.container({
            customClasses: this._customClasses,
            content:       this._content,
            sideBar:       this._sideBar
        });
    }
}
