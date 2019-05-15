import { CustomFileInputComponent } from '../customFileInput/customFileInput.js';
import { uniqueId } from '../../modules/utils.js';
import template from './avatar.handlebars';
import './avatar.scss';
import './_profile/avatar_profile.scss';
import './_border-weighty/avatar_border-weighty.scss';
import './__choose-photo/avatar__choose-photo.scss';
import './__upload-icon/avatar__upload-icon.scss';

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
    } = {}) {
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

    addClass(data) {
        this.innerElement.classList.add(data);
    }

    removeClass(data) {
        this.innerElement.classList.remove(data);
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

        this._template = template({
            avatarPath:     this._avatarPath,
            customClasses:  this._customClasses,
            customImgInput: customFileInput ? customFileInput.template: '',
            id:             this._id,
            isEditable:     this._isEditable
        });
    }
}
