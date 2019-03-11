import { CardComponent }   from '../components/card/card.js';
import { ListComponent }   from '../components/list/list.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { FormComponent }   from '../components/form/form.js';

import { BaseView }        from './base.js';
import { LoginView }       from './login.js';

import { ProfileService }  from '../services/profile-service.js';
import { backendUrl }      from '../modules/constants.js';

export class ProfileView extends BaseView {
    _pageTitle = 'Профиль игрока';
    _list = [
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
    _formGroups = [
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
    _profile = {
        nickname: '',
        email: '',
        won: 0,
        lost: 0,
        play_time: 0,
        avatar_path: 'static/img/my_avatar.jpeg'
    };
    _form;
    _avatar;

    constructor(el) {
        super(el);
        this.render();

        ProfileService.getProfile()
            .then(res => {
                this._profile = {
                    nickname: res.nickname,
                    email: res.email,
                    won: res.won,
                    lost: res.lost,
                    play_time: res.play_time,
                    avatar_path: res.avatar_path
                };

                if (this._form !== undefined) {
                    this._form.setFormControlValue('nickname', this._profile.nickname);
                    this._form.setFormControlValue('email', this._profile.email);
                }
            })
            .then(() => {
                this._avatar.innerElement.src = backendUrl + '/img/' + this._profile.avatar_path;
            })
            .catch(res => {
                if (res.status === 401) {
                    const login = new LoginView(el);
                    login.render();
                }
            });
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
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

        this._form.on({event: 'submit', callback: (event) => {
            event.preventDefault();
            const formData = new FormData(event.path[0]);

            if (this._form.isValid) {
                ProfileService.updateProfile(formData)
                    .then(res => console.log(res))
                    .catch(res => {
                        Object.entries(res.data).forEach((item) => {
                            this._form.addError(item[0], item[1]);
                        });
                    });
            }
        }});
    }
}
