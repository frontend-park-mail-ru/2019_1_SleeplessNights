import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { CardComponent } from '../components/card/card.js';
import { BaseView }      from './base.js';

export class LoginView extends BaseView {
    _pageTitle = 'Авторизация';
    _formControls = [
        {
            customClasses: '',
            content: {
                type: 'text',
                customClasses: '',
                placeholder: 'Почта или никнейм"',
                name: 'login',
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

    get pageTitle(){
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
           formControls: this._formControls
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
                title:    'Название игры',
                subtitle: '',
                btnHome:  true
            },
            container: card.template + card2.template
        });
    }
}
