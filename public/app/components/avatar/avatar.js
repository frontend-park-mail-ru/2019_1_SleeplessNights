import { CustomFileInputComponent } from '../customFileInput/customFileInput.js';

export class AvatarComponent {
    _template;
    _customClasses;
    _avatarUrl;

    constructor({
        customClasses = '',
        avatarUrl = '/assets/img/default-avatar.png',
        form = ''
    } = {}){
        this._customClasses = customClasses;
        this._avatarUrl = avatarUrl;

        const customFileInput = new CustomFileInputComponent({
            customClasses: '',
            input: {
                accept: 'image/jpeg,image/x-png',
                customClasses: '',
                name: 'avatar',
                form
            },
            label: {
                customClasses: '',
                icon: 'local_see'
            }
        });

        this._template = Handlebars.templates.avatar({
            customClasses:  this._customClasses,
            avatarUrl:      this._avatarUrl,
            customImgInput: customFileInput.template
        });
    }

    get template() {
        return this._template;
    }
}
