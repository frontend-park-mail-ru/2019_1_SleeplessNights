import { CustomFileInputComponent } from '../customFileInput/customFileInput.js';
import { IconComponent } from '../icon/icon.js';
import { uniqueId } from '../../modules/utils.js';
import template from './avatar.handlebars';
import bus from '../../modules/bus.js';
import './avatar.scss';
import './_profile/avatar_profile.scss';
import './_border-weighty/avatar_border-weighty.scss';
import './__choose-photo/avatar__choose-photo.scss';
import './__edit-photo/avatar__edit-photo.scss';
import './__upload-icon/avatar__upload-icon.scss';

export class AvatarComponent {
    _avatarPath;
    _customClasses;
    _customFileInput;
    _canvas;
    _id;
    _img;
    _isEditable;
    _template;
    _rotateLeft;
    _rotateRight;

    constructor({
        customClasses = '',
        avatarPath = '/assets/this._img/default-avatar.png',
        form = ''
    } = {}) {
        this._customClasses = customClasses;
        this._isEditable = customClasses.includes('isEditable');
        this._avatarPath = avatarPath;
        this._id = 'avatar' + uniqueId();

        this._render(form);
        bus.on('avatar-loading', this.startListening);
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

    startListening = () => {
        this._canvas = document.getElementById('avatarCanvas');
        const ctx = this._canvas.getContext('2d');
        this._img = null;
        
        this._customFileInput.on('change', (e) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                this._img = new Image();
                this._img.onload = () => {
                    this._canvas.width = this._img.width;
                    this._canvas.height = this._img.height;
                    ctx.drawImage(this._img,0,0);
                };

                this._img.src = event.target.result;
                this.innerElement.parentElement.classList.add('hidden');

                this._rotateRight.parent.classList.remove('hidden');
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        let degree = 0;
        this._rotateLeft.on('click', () => {
            if (degree === 360 || degree === -360) {
                degree = 0;
            }

            degree -= 90;
            this.rotateImage(degree);
        });

        this._rotateRight.on('click', () => {
            if (degree === 360 || degree === -360) {
                degree = 0;
            }

            degree += 90;
            this.rotateImage(degree);
        });
    };

    rotateImage = (degree) => {

        let cContext = this._canvas.getContext('2d');
        let cw = this._img.width, ch = this._img.height, cx = 0, cy = 0;

        switch (degree) {
            case 90:
                cw = this._img.height;
                ch = this._img.width;
                cy = this._img.height * (-1);
                break;
            case -270:
                cw = this._img.height;
                ch = this._img.width;
                cy = this._img.height * (-1);
                break;
            case 180:
                cx = this._img.width * (-1);
                cy = this._img.height * (-1);
                break;
            case -180:
                cx = this._img.width * (-1);
                cy = this._img.height * (-1);
                break;
            case -90:
                cw = this._img.height;
                ch = this._img.width;
                cx = this._img.width * (-1);
                break;
            case 270:
                cw = this._img.height;
                ch = this._img.width;
                cx = this._img.width * (-1);
                break;
        }

        this._canvas.setAttribute('width', cw);
        this._canvas.setAttribute('height', ch);
        cContext.rotate(degree * Math.PI / 180);
        cContext.drawImage(this._img, cx, cy);
    };

    _render(form) {
        if (this._isEditable) {
            this._customFileInput = new CustomFileInputComponent({
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

            this._rotateLeft = new IconComponent({
                customClasses: 'md-24',
                name: 'rotate_left'
            });

            this._rotateRight = new IconComponent({
                customClasses: 'md-24',
                name: 'rotate_right'
            });
        }

        this._template = template({
            avatarPath:     this._avatarPath,
            customClasses:  this._customClasses,
            customImgInput: this._customFileInput ? this._customFileInput.template: '',
            id:             this._id,
            isEditable:     this._isEditable,
            buttons:        this._isEditable ? this._rotateLeft.template + this._rotateRight.template : ''
        });
    }
}
