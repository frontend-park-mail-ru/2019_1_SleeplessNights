export class ListComponent {
    _template;
    _customClasses;
    _list = [{
        customClasses: '',
        text: ''
    }];

    constructor({
        customClasses = '',
        list
    } = {}){
        this._customClasses = customClasses;
        this._list = list;

        this._template = Handlebars.templates.list({
            customClasses: this._customClasses,
            lists:         this._list
        });
    }

    get template() {
        return this._template;
    }
}
