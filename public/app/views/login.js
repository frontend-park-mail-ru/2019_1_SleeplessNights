import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { CardComponent } from '../components/card/card.js';
import { gameName }      from '../modules/constants.js';
import { BaseView }      from './base.js';

export class LoginView extends BaseView {
    _pageTitle;
    _formGroups;
    _form;

    constructor(el) {
        super(el);
        this._pageTitle = 'Авторизация';
        this._formGroups = [
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
        this._render();
    }

    get pageTitle() {
        return this._pageTitle;
    }

    _render() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: 'signup',
            dataHref: 'signup',
            text: 'Зарегистрироваться'
        });

        this._form = new FormComponent({
            formGroups: this._formGroups
        });

        const card = new CardComponent({
            customClasses: '',
            title: 'Авторизация',
            body: this._form.template
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
        this._submit();
    }

    _submit() {
        this._form.on({event: 'submit', callback: (event) => {
            event.preventDefault();
            const formData = new FormData(event.path[0]);

            if (this._form.isValid) {
                bus.emit('login', formData);
                bus.on('error:login', (data) => {
                    Object.entries(data).forEach((item) => {
                        this._form.addError(item[0], item[1]);
                    });
                });
            }
        }});
    }
}
