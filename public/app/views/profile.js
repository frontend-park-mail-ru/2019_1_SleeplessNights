import { CardComponent }   from '../components/card/card.js';
import { ListComponent }   from '../components/list/list.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { FormComponent }   from '../components/form/form.js';
import { BaseView }        from './base.js';

export class ProfileView extends BaseView {
    _pageTitle;
    _list;
    _formGroups;
    _profile;
    _form;
    _avatar;

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
            avatar_path: 'static/img/my_avatar.jpeg'
        };
        
        this._render();
        bus.emit('get-profile');
        bus.on('success:get-profile', (profile) => {
            this._profile = {
                nickname: profile.nickname,
                email: profile.email,
                won: profile.won,
                lost: profile.lost,
                play_time: profile.play_time,
                avatar_path: profile.avatar_path
            };

            if (this._form !== undefined) {
                this._form.setFormControlValue('nickname', this._profile.nickname);
                this._form.setFormControlValue('email', this._profile.email);
            }

            this._avatar.src = profile.avatar_path;
        });
    }

    get pageTitle(){
        return this._pageTitle;
    }

    _render() {
        const list = new ListComponent({
            list: this._list
        });

        this._form = new FormComponent({
            customClasses: 'form_width_60',
            formGroups:    this._formGroups
        });

        this._avatar = new AvatarComponent({ form: this._form.id });

        const card = new CardComponent({
            title: 'Профиль игрока',
            customClasses: 'card_profile shadow-l',
            body: `${this._form.template} ${this._avatar.template} ${list.template}`
        });

        super.renderContainer({
            customClasses: '',
            header: {
                title:    '',
                subtitle: '',
                btnHome:  true
            },
            container: card.template
        });
        this._submit();
    }

    _submit() {
        this._form.on('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.path[0]);

            if (this._form.isValid) {
                bus.emit('update-profile', formData);
                bus.on('success:update-profile', (path) => this._avatar.src = path);
                bus.on('error:update-profile', (data) => {
                    Object.entries(data).forEach((item) => {
                        this._form.addError(item[0], item[1]);
                    });
                });
            }
        });
    }
}
