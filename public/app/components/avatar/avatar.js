import { CustomFileInputComponent } from '../customFileInput/customFileInput.js';
import { uniqueId } from '../../modules/utils.js';

export class AvatarComponent {
    _template;
    _customClasses;
    _avatarUrl;
    _id;

    constructor({
        customClasses = '',
        avatarUrl = '/assets/img/default-avatar.png',
        form = ''
    } = {}){
        this._customClasses = customClasses;
        this._avatarUrl = avatarUrl;
        this._id = 'avatar' + uniqueId();

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
            customImgInput: customFileInput.template,
            id: this._id
        });
    }

    get template() {
        return this._template;
    }

    get innerElement() {
        return document.getElementById(this._id);
    }

    set src(path) {
        this.innerElement.src = path;
    }
}
