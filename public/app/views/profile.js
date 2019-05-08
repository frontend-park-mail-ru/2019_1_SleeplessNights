import { CardComponent } from '../components/card/card.js';
import { ListComponent } from '../components/list/list.js';
import { FormComponent } from '../components/form/form.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { HeaderComponent } from '../components/header/header.js';
import { BaseView } from './base.js';
import bus from '../modules/bus.js';

export class ProfileView extends BaseView {
    _pageTitle;
    _list;
    _formGroups;
    _profile;
    _form;
    _avatar;
    _formData;

    constructor(el) {
        super(el);
        this._pageTitle = 'Профиль игрока'; 
        this._list = [
            {
                customClasses: '',
                text: 'Победы'
            },
            {
                customClasses: '',
                text: 'Поражения'
            },
            {
                customClasses: '',
                text: 'Время в игре'
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

    get pageTitle(){
        return this._pageTitle;
    }

    get _scoreSection() {
        return this._scoreSectionHTML.outerHTML;
    }

    set _scoreSection(data) {
        const ss = document.getElementById(this._scoreSectionHTML.id);
        ss.innerHTML = data;
    }

    show() {
        this._getProfile();
        super.show();
    }

    _render() {
        this._form = new FormComponent({
            customClasses: 'form_width_60',
            formGroups:    this._formGroups
        });
        this._avatar = new AvatarComponent({
            customClasses: 'avatar_profile',
            form: this._form.id
        });

        const card = new CardComponent({
            title: 'Мой профиль',
            customClasses: 'card_profile shadow-l',
            body: `${this._form.template} ${this._avatar.template} ${this._scoreSection}`
        });
        // const header = new HeaderComponent({ title: 'Профиль игрока' }); ${header.template}
        super.renderContainer({
            customClasses: '',
            btnBack: true,
            container: ` ${card.template} `
        });

        const list = new ListComponent({ list: this._list });
        this._scoreSection = list.template;
        this._submit();
    }

    _submit() {
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

            this._list[0].text += ` ${profile.won}`;
            this._list[1].text += ` ${profile.lost}`;
            this._list[2].text += ` ${profile.play_time}`;
            const list = new ListComponent({ list: this._list });

            this._scoreSection = list.template;
            this._avatar.src = profile.avatarPath;
        });
    }
}
