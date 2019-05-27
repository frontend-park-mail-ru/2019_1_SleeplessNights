import { ListComponent } from '../components/list/list.js';
import { FormComponent } from '../components/form/form.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { ContainerComponent }  from '../components/container/container.js';
import { BaseView } from './base.js';
import { animationTime } from '../modules/constants.js';
import bus from '../modules/bus.js';

export class ProfileView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = 'Профиль игрока'; 
        this._list = [
            {
                customClasses: '',
                text: 'Победы 0'
            },
            {
                customClasses: '',
                text: 'Поражения 0'
            },
            {
                customClasses: '',
                text: 'Время в игре 0'
            }
        ];
        this._formGroups = [
            {
                customClasses: '',
                content: {
                    type: 'text',
                    customClasses: '',
                    placeholder: 'Nickname',
                    name: 'nickname'
                }
            },
            {
                customClasses: '',
                content: {
                    attributes: 'disabled',
                    type: 'email',
                    customClasses: '',
                    placeholder: 'test@mail.ru',
                    name: 'email'
                }
            },
            {
                customClasses: 'form__group_center',
                content: {
                    type: 'submit',
                    customClasses: 'btn btn_primary',
                    placeholder: '',
                    name: '',
                    value: 'Сохранить'
                }
            }
        ];
        this._profile = {
            nickname: '',
            email: '',
            won: 0,
            lost: 0,
            play_time: 0,
            avatarPath: 'static/img/my_avatar.jpeg'
        };

        this._scoreSectionHTML = document.createElement('section');
        this._scoreSectionHTML.id = 'profile-score';
        this._render();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    get _scoreSection() {
        return this._scoreSectionHTML.outerHTML;
    }

    set _scoreSection(data) {
        const ss = document.getElementById(this._scoreSectionHTML.id);
        ss.innerHTML = data;
    }

    get _backBtn() {
        return {
            position: 'left',
            className: 'container_theme-primary1'
        };
    }

    get _header() {
        return {
            icon: {
                customClasses: 'md-48',
                name: 'account_circle'
            },
            name: 'Profile'
        };
    }

    show() {
        this._getProfile();
        super.show();
    }

    _render() {
        this._form = new FormComponent({
            customClasses: 'w70',
            formGroups:    this._formGroups
        });

        this._avatar = new AvatarComponent({
            customClasses: 'avatar_profile isEditable',
            form: this._form.id
        });

        const formContainer = new ContainerComponent({
            customClasses: 'w100 shadow-l profile',
            content: `
                ${this._form.template} 
                ${this._avatar.template} 
                ${this._scoreSection}
            `
        });

        const innerContainer = new ContainerComponent({
            customClasses: 'form_w50 justify-content-center container_column',
            content: ` ${this.header.template} ${formContainer.template}`
        });

        this.outerContainer = new ContainerComponent({
            customClasses: 'w97 container_theme-primary2 align-items-center justify-content-center',
            content: innerContainer.template
        });

        super.renderContainer({
            customClasses: 'container_skewed h100 container__absolute w100',
            container: `
                ${this.backBtn.template}
                ${this.outerContainer.template}
            `,
        });

        const list = new ListComponent({
            customClasses: 'w100',
            list: this._list
        });

        this._scoreSection = list.template;
        this._onSubmit();
    }

    _onSubmit() {
        bus.on('error:update-profile', (data) =>
            Object.entries(data).forEach((item) =>
                this._form.addError(item[0], item[1])
            )
        );

        bus.on('success:check-validity-profile', () => {
            bus.emit('update-profile', this._formData)
                .on('success:update-profile', (path) => this._avatar.src = path);
        });

        this._form.on('submit', (event) => {
            event.preventDefault();
            this._formData = new FormData(event.target);

            const inputs = this._form.formControls.filter(fc => fc.type === 'text');
            this._form.reset();
            bus.emit('check-validity-profile', inputs);
        });
    }

    _getProfile() {
        bus.emit('get-profile');
        bus.on('success:get-profile', (profile) => {
            this._profile = {
                nickname: profile.nickname,
                email: profile.email,
                won: profile.won,
                lost: profile.lost,
                play_time: profile.play_time,
                avatarPath: profile.avatarPath
            };

            if (this._form !== undefined) {
                this._form.setFormControlValue('nickname', this._profile.nickname);
                this._form.setFormControlValue('email', this._profile.email);
            }

            // this._list[0].text += ` ${profile.won ? profile.won : '0'}`;
            // this._list[1].text += ` ${profile.lost ? profile.lost : '0'}`;
            // this._list[2].text += ` ${profile.play_time ? profile.play_time : '0'}`;
            // const list = new ListComponent({ list: this._list });
            //
            // this._scoreSection = list.template;
            this._avatar.src = profile.avatarPath;
        });
    }

    hideAnimation() {
        this.backBtn.container.hideContent();
        this.outerContainer.hideContent();

        this.backBtn.container.addClass('anim-width-to-50');
        this.outerContainer.addClass('anim-width-to-50');
        setTimeout(() => {
            this.backBtn.container.removeClass('anim-width-to-50');
            this.outerContainer.removeClass('anim-width-to-50');
        }, animationTime * 1000 + 350);
    }

    showAnimation() {
        this.backBtn.container.showContent();
        this.outerContainer.showContent();
    }
}
