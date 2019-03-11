import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { CardComponent } from '../components/card/card.js';
import { AuthService }   from '../services/auth-service.js';
import { gameName }      from '../modules/constants.js';
import { BaseView }      from './base.js';

export class LoginView extends BaseView {
    _pageTitle = 'Авторизация';
    _formGroups = [
        {
            customClasses: '',
            content: {
                type: 'email',
                customClasses: '',
                placeholder: 'Почта',
                name: 'email'
            }
        },
        {
            customClasses: '',
            content: {
                type: 'password',
                customClasses: '',
                placeholder: 'Пароль',
                name: 'password'
            }
        },
        {
            customClasses: 'form__group_center',
            content: {
                type: 'submit',
                customClasses: 'btn btn_primary',
                placeholder: '',
                name: '',
                value: 'Войти'
            }
        }
    ];

    constructor(el = document.body) {
        super(el);
    }

    get pageTitle() {
        return this._pageTitle;
    }

    render() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: 'signup',
            dataHref: 'signup',
            text: 'Зарегистрироваться'
        });

        const form = new FormComponent({
            formGroups: this._formGroups
        });
        form.render();

        const card = new CardComponent({
            customClasses: '',
            title: 'Авторизация',
            body: form.template
        });

        const card2 = new CardComponent({
            customClasses: 'card_centered_both',
            title: '',
            body: `У вас нет аккаунта? ${link.template}`
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
                AuthService.auth(formData)
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
