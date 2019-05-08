import { CustomFileInputComponent } from '../customFileInput/customFileInput.js';
import { uniqueId } from '../../modules/utils.js';

export class AvatarComponent {
    _avatarPath;
    _customClasses;
    _id;
    _isEditable;
    _template;

    constructor({
        customClasses = '',
        avatarPath = '/assets/img/default-avatar.png',
        form = ''
    } = {}){
        this._customClasses = customClasses;
        this._isEditable = customClasses.includes('isEditable');
        this._avatarPath = avatarPath;
        this._id = 'avatar' + uniqueId();
        this._render(form);
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

    _render(form) {
        let customFileInput;
        if (this._isEditable) {
            customFileInput = new CustomFileInputComponent({
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
        }

        this._template = Handlebars.templates.avatar({
            avatarPath:      this._avatarPath,
            customClasses:  this._customClasses,
            customImgInput: customFileInput ? customFileInput.template: '',
            id:             this._id,
            isEditable:     this._isEditable
        });
    }
}
