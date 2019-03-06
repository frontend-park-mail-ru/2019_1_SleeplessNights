import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { CardComponent } from '../components/card/card.js';
import { BaseView }      from './base.js';

export class SignUpView extends BaseView {
    _pageTitle = 'Регистрация';
    _formControls = [
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
            customClasses: '',
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
            formControls: this._formControls
        });
        form.render();

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
                title:    'Название игры',
                subtitle: '',
                btnHome:  true
            },
            container: card.template + card2.template
        });
    }
}
