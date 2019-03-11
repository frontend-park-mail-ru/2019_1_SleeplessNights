import { FormComponent }   from '../components/form/form.js';
import { LinkComponent }   from '../components/link/link.js';
import { CardComponent }   from '../components/card/card.js';
import { gameName }        from '../modules/constants.js';
import { RegisterService } from '../services/register-service.js';
import { BaseView }        from './base.js';
import { ProfileView }     from './profile.js';

export class SignUpView extends BaseView {
    _pageTitle = 'Регистрация';
    _formGroups = [
        {
            customClasses: '',
            content: {
                type: 'text',
                customClasses: '',
                placeholder: 'Почта',
                name: 'email',
                value: ''
            }
        },
        {
            customClasses: '',
            content: {
                type: 'text',
                customClasses: '',
                placeholder: 'Никнейм',
                name: 'nickname',
                value: ''
            }
        },
        {
            customClasses: '',
            content: {
                type: 'password',
                customClasses: '',
                placeholder: 'Пароль',
                name: 'password',
                value: ''
            }
        },
        {
            customClasses: '',
            content: {
                type: 'password',
                customClasses: '',
                placeholder: 'Повторите пароль',
                name: 'password2',
                value: ''
            }
        },
        {
            customClasses: 'form__group_center',
            content: {
                type: 'submit',
                customClasses: 'btn btn_primary',
                placeholder: '',
                name: '',
                value: 'Зарегистрироваться'
            }
        }
    ];

    constructor(el = document.body) {
        super(el);
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: 'login',
            dataHref: 'login',
            text: 'Войти'
        });

        const form = new FormComponent({
            formGroups: this._formGroups
        });

        const card = new CardComponent({
            customClasses: '',
            title: 'Регистрация',
            body: form.template
        });

        const card2 = new CardComponent({
            customClasses: 'card_centered_both',
            title: '',
            body: `Аккаунт уже есть? ${link.template}`
        });

        super.renderContainer({
            customClasses: '',
            header: {
                title:    gameName,
                subtitle: '',
                btnHome:  true
            },
            container: card.template + card2.template
        });

        form.on({event: 'submit', callback: (event) => {
            event.preventDefault();
            const formData = new FormData(event.path[0]);

            if (form.isValid) {
                RegisterService.register(formData)
                    .then(() => {
                        const profile = new ProfileView(super.el);
                        profile.render();
                    })
                    .catch(res => {
                        Object.entries(res.data).forEach((item) => {
                            form.addError(item[0], item[1]);
                        });
                    });
            }
        }});
    }
}
