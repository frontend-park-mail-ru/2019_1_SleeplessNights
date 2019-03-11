import { CardComponent }   from '../components/card/card.js';
import { ListComponent }   from '../components/list/list.js';
import { AvatarComponent } from '../components/avatar/avatar.js';
import { FormComponent }   from '../components/form/form.js';
import { BaseView }        from './base.js';
import { ProfileService }  from '../services/profile-service.js';

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

    constructor(el) {
        super(el);

        ProfileService.getProfile()
            .then(res => {
               console.log(res);
            });

        ProfileService.getAvatar()
            .then(res => {
               console.log(res);
            });
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const list = new ListComponent({
            list: this._list
        });

        const form = new FormComponent({
            customClasses: 'form_width_60',
            formGroups:    this._formGroups
        });
        form.render();
        const avatar = new AvatarComponent({ form: form.id });

        const card = new CardComponent({
            title: 'Профиль игрока',
            customClasses: 'card_profile shadow-l',
            body: `${form.template} ${avatar.template} ${list.template}`
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

        form.on({event: 'submit', callback: (event) => {
            event.preventDefault();
            const formData = new FormData(event.path[0]);

            if (form.isValid) {
                ProfileService.updateProfile(formData)
                    .then(res => console.log(res))
                    .catch(res => {
                        Object.entries(res.data).forEach((item) => {
                            form.addError(item[0], item[1]);
                        });
                    });
            }
        }});
    }
}
